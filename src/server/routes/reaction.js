const router = require('express').Router();

const {
    addReaction
} = require('./controllers/reaction.js');

router.post('/', addReaction);

module.exports = router;