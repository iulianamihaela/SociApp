const userdb = require('../../db/userdb.js');

const getUser = ((req, res) => {
    res.status(200);

    userdb.GetUserProfile(req.query.id);

    res.send('Get user route');
});

const createUser = (async (req, res) => {
    const rowsAffected = await userdb.CreateUser(
        req.body.email, 
        req.body.password, 
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

const updateUser = ((req, res) => {
    res.status(200);
    res.send('Update user route');
});

module.exports = {
    getUser,
    createUser,
    updateUser
};