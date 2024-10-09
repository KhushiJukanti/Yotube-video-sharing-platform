const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,  // Added dislikes field
    default: 0,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  channelName: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Video', videoSchema);
