const reactiondb = require('../../db/reactiondb.js');

const addReaction = ((req, res) => {
    reactiondb.AddReaction(req.body.email, req.body.postId, req.body.reaction).then(data => res.status(200).json(data));
});

module.exports = {
    addReaction
};