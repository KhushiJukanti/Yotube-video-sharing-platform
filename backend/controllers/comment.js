const Comment = require('../models/comment');

// Post a comment
const postComment = async (req, res) => {
  try {
    const comment = new Comment({ videoId: req.params.id, text: req.body.text });
    await comment.save();

    // Emit the new comment via Socket.IO
    const io = req.app.get('socketio');
    io.emit('new_comment', comment);

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to post comment', error: error.message });
  }
};

// Get comments by videoId
const getCommentsByVideoId = async (req, res) => {
  const comments = await Comment.find({ videoId: req.params.videoId });
  res.json(comments);
};


module.exports = {postComment, getCommentsByVideoId}




