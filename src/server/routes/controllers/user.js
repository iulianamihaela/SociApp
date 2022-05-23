const userdb = require('../../db/userdb.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUser = ((req, res) => {
    res.status(200);

    userdb.GetUserProfile(req.query.email, req.query.visitoremail).then(data => res.status(200).json(data));
});

const createUser = (async (req, res) => {
    if (req.body.password != null && req.body.password.length < 8) {
        return;
    }

    const password = await bcrypt.hash(req.body.password, parseInt(process.env));

    const rowsAffected = await userdb.CreateUser(
        req.body.email, 
        password, 
        req.body.firstName, 
        req.body.lastName, 
        req.body.birthDate
    );

    if (rowsAffected === 1) {
        res.status(200);
        res.json({
            'status': 'success'
        });
    } else {
        res.status(500);
        res.json({
            'status': 'error'
        });
    }
});

const authenticateUser = (async (req, res) => {
    if (req.body.password != null && req.body.password.length < 8) {
        return;
    }

    const email = req.body.email;
    
    const user = await userdb.GetHashedPasswordForUser(
        email
    );

    const validAuth = bcrypt.compareSync(req.body.password, user.Password);

    const token = jwt.sign({ email: email, role: user.Role }, process.env.TOKEN_SECRET, { expiresIn: "1800s" });

    if (validAuth) {
        res.status(200);
        res.json({
            "status": "success",
            "jwt": token,
            "role": user.Role,
            "email": email,
            "fullName": user.FullName
        });
    } else {
        res.status(404);
        res.json({
            'status': 'error'
        });
    }
});

const updateUser = (async (req, res) => {
    if (req.body.id === null) {
        return;
    }
    
    const user = await userdb.UpdateUserProfile(
        req.body.id,
        req.body.description,
        req.body.location
    );
    
    try {
        res.status(200);
        res.json({
            "status": "success",
            "location": user.Location,
            "description": user.Description
        });
    } catch {
        res.status(404);
        res.json({
            'status': 'error'
        });
    }
});

const searchUsers = ((req, res) => {
    if (req.query.filter === null) {
        return [];
    }

    userdb.SearchUsers(req.query.filter).then(data => res.status(200).json(data));
});

module.exports = {
    getUser,
    createUser,
    updateUser,
    authenticateUser,
    searchUsers
};