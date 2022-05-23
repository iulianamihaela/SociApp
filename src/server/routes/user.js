const router = require('express').Router();

const {
    getUser,
    createUser,
    updateUser,
    authenticateUser
} = require('./controllers/user.js');

router.get('/', getUser);
router.post('/', createUser);
router.put('/', updateUser);

router.post('/login', authenticateUser);

module.exports = router;