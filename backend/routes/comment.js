const express = require('express');
const router = express.Router();


const {addComment, getCommentsByVideoId} = require('../controllers/comment');


router.post('/add', addComment);
router.get('/:videoId', getCommentsByVideoId);

module.exports = router;
