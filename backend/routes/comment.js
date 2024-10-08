const express = require('express');
const router = express.Router();


const {postComment, getCommentsByVideoId} = require('../controllers/comment');


router.post('/:id', postComment);
router.get('/:videoId', getCommentsByVideoId);

module.exports = router;
