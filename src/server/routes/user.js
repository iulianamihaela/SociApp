const router = require('express').Router();

const {
    getUser,
    createUser,
    updateUser,
    authenticateUser,
    searchUsers
} = require('./controllers/user.js');

router.get('/', getUser);
router.get('/search', searchUsers);
router.post('/', createUser);
router.put('/', updateUser);

router.post('/login', authenticateUser);

module.exports = router;