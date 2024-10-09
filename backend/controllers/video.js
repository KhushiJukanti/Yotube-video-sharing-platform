const Video = require('../models/video');
const path = require('path');
const fs = require('fs');

// Upload a video
const uploadVideo = async (req, res) => {
  try {
    const { title, description, thumbnail } = req.body;
    const filePath = req.file ? req.file.path : null;

    if (!filePath) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }

    const video = new Video({
      title,
      description,
      thumbnail, // Assume thumbnail is sent from the form
      filePath,
      views: 0,    // Initialize views
      likes: 0,    // Initialize likes
      dislikes: 0  // Initialize dislikes
    });

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

// Like a video
const likeVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },  // Increment the likes by 1
      { new: true, select: 'likes' } // Return only the likes field
    );
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json({ likes: video.likes }); // Return updated likes count
  } catch (error) {
    res.status(500).json({ message: 'Failed to like video', error: error.message });
  }
};

// Dislike a video
const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { dislikes: 1 } },  // Increment the dislikes by 1
      { new: true, select: 'dislikes' } // Return only the dislikes field
    );
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json({ dislikes: video.dislikes }); // Return updated dislikes count
  } catch (error) {
    res.status(500).json({ message: 'Failed to dislike video', error: error.message });
  }
};


// Get a video by ID and serve the video file
const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Assuming videoUrl contains the direct URL to the video (e.g., a Cloudinary or S3 URL)
    res.json({ 
      title: video.title,
      videoUrl: video.videoUrl,  // Return video URL
      description: video.description,
      views: video.views,
      likes: video.likes,
      dislikes: video.dislikes,
      uploadDate: video.uploadDate,
      channelName: video.channelName,
      thumbnail: video.thumbnail
    });
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ message: 'Failed to retrieve video', error: error.message });
  }
};

module.exports = { uploadVideo, getVideos, getVideoById, likeVideo, dislikeVideo };
