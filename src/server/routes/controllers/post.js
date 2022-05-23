const postdb = require('../../db/postdb.js');

const addPost = ((req, res) => {
    postdb.AddPost(req.body.email, req.body.imageURI, req.body.text).then(data => res.status(200).json(data));
});

const getPostsForUser = ((req, res) => {
    if (req.query.email === null) {
        return [];
    }

    postdb.GetPostsForUser(req.query.email, req.query.userProfile).then(data => res.status(200).json(data));
});

module.exports = {
    addPost,
    getPostsForUser
};