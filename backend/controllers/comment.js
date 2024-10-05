const Comment = require('../models/comment');

// Post a comment
const addComment = async (req, res) => {
  const { videoId, username, text } = req.body;

  const comment = new Comment({ videoId, username, text });
  await comment.save();
  res.json(comment);
};

// Get comments by videoId
const getCommentsByVideoId = async (req, res) => {
  const comments = await Comment.find({ videoId: req.params.videoId });
  res.json(comments);
};


module.exports = {addComment, getCommentsByVideoId}




