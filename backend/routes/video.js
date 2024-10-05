// videoRoutes.js
const express = require('express');
const {uploadVideo, getVideos, getVideoById} = require('../controllers/video');
const multer = require('multer');

// Setup multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

// API routes
router.post('/upload', upload.single('video'), uploadVideo); // Upload a video
router.get('/', getVideos); // Get all videos
router.get('/:id', getVideoById); // Get a single video by ID

module.exports = router;
