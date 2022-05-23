const router = require('express').Router();

const {
    addPost,
    getPostsForUser,
    getPost
} = require('./controllers/post.js');

router.get('/', getPostsForUser);
router.get('/single', getPost);
router.get('/user', getPostsForUser);
router.post('/', addPost);

module.exports = router;