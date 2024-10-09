// videoRoutes.js
const express = require('express');
const videoControllers = require('../controllers/video');
const multer = require('multer');
const router = express.Router();

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



// API routes
router.post('/upload', upload.single('video'), videoControllers.uploadVideo); // Upload a video
router.get('/', videoControllers.getVideos); 
router.get('/:id', videoControllers.getVideoById);
router.post('/:id/like', videoControllers.likeVideo);
router.post('/:id/dislike', videoControllers.dislikeVideo);

module.exports = router;
