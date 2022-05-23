const friendconnectiondb = require('../../db/friendconnectiondb.js');

const createFriendship = ((req, res) => {
    friendconnectiondb.CreateFriendship(req.body.firstEmail, req.body.secondEmail).then(data => res.status(200).json(data));
});

const getIncomingFriendRequests = ((req, res) => {
    friendconnectiondb.GetIncomingFriendRequests(req.query.email).then(data => res.status(200).json(data));
});

const acceptFriendRequest = ((req, res) => {
    friendconnectiondb.AcceptFriendRequest(req.body.sender, req.body.receiver).then(data => res.status(200).json(data));
});

const declineFriendRequest = ((req, res) => {
    friendconnectiondb.DeclineFriendRequest(req.body.sender, req.body.receiver).then(data => res.status(200).json(data));
});

module.exports = {
    createFriendship,
    getIncomingFriendRequests,
    acceptFriendRequest,
    declineFriendRequest
};