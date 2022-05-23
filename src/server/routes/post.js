const router = require('express').Router();

const {
    addPost,
    getPostsForUser
} = require('./controllers/post.js');

router.get('/', getPostsForUser);
router.get('/user', getPostsForUser);
router.post('/', addPost);

module.exports = router;