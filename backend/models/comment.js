const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  videoId: mongoose.Schema.Types.ObjectId,
  username: String,
  text: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);
