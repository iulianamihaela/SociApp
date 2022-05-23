const router = require('express').Router();

const {
    addComment,
    getComments
} = require('./controllers/comment.js');

router.get('/', getComments);
router.post('/', addComment);

module.exports = router;