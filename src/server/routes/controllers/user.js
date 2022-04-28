const getUser = ((req, res) => {
    res.status(200);
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
}