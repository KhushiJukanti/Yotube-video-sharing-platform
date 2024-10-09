const Comment = require('../models/comment');

// Post a comment
const postComment = async (req, res) => {
  try {
    const { id: videoId } = req.params;
    const { text } = req.body;

    // Check if text is provided
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    // Create and save the comment
    const comment = new Comment({ videoId, text });
    await comment.save();

    // Emit the new comment via Socket.IO
    const io = req.app.get('socketio'); // Retrieve the Socket.IO instance
    if (io) {
      io.emit('new_comment', comment); // Emit the event
    } else {
      console.error('Socket.IO instance not found');
    }

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error in postComment:', error.message); // Log error
    res.status(500).json({ message: 'Failed to post comment', error: error.message });
  }
};


// Get comments by videoId
const getCommentsByVideoId = async (req, res) => {
  const comments = await Comment.find({ videoId: req.params.videoId });
  res.json(comments);
};


module.exports = {postComment, getCommentsByVideoId}




