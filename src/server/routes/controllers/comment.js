const commentdb = require('../../db/commentdb.js');

const addComment = ((req, res) => {
    commentdb.AddComment(req.body.postId, req.body.email, req.body.text).then(data => res.status(200).json(data));
});

const getComments = ((req, res) => {
    commentdb.GetComments(req.query.postId, req.query.email).then(data => res.status(200).json(data));
});

module.exports = {
    addComment,
    getComments
};