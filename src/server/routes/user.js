const router = require('express').Router();

const {
    getUser,
    createUser,
    updateUser
} = require('./controllers/user.js');

router.get('/:userId', getUser);

router.post('/', createUser);

router.put('/', updateUser);

module.exports = router;