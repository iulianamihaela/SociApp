const userdb = require('../../db/userdb.js');

const getUser = ((req, res) => {
    res.status(200);

    userdb.GetUserProfile(req.query.id);

    res.send('Get user route');
});

const createUser = ((req, res) => {
    res.status(200);
    res.send('Create user route');
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