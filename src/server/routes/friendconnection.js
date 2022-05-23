const router = require('express').Router();

const {
    createFriendship,
    getIncomingFriendRequests,
    acceptFriendRequest,
    declineFriendRequest
} = require('./controllers/friendconnection.js');

router.get('/', getIncomingFriendRequests);
router.post('/', createFriendship);
router.post('/accept', acceptFriendRequest);
router.post('/decline', declineFriendRequest);

module.exports = router;