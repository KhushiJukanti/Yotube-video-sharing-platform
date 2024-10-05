// videoController.js
const Video = require('../models/video');
const path = require('path');
const fs = require('fs');

// Upload a video
const uploadVideo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const filePath = req.file ? req.file.path : null;

    if (!filePath) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }

    // Save video data to MongoDB
    const video = new Video({ title, description, filePath });
    await video.save();

    res.status(201).json({ message: 'Video uploaded successfully', video });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload video', error: error.message });
  }
};

// Get all videos
const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch videos', error: error.message });
  }
};

// Get a video by ID and serve the video file
const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const videoPath = path.join(__dirname, '..', video.filePath);
    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({ message: 'Video file not found' });
    }

    res.setHeader('Content-Type', 'video/mp4');
    res.sendFile(videoPath);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve video', error: error.message });
  }
};

module.exports = { uploadVideo, getVideos, getVideoById };
