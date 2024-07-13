// routes/videoPostRoutes.js
const express = require('express');
const router = express.Router();
const videoPostController = require('../controllers/videoPostController');

// Create a new video post
router.post('/', videoPostController.createVideoPost);

// Get all video posts or video posts by a specific user
router.get('/', videoPostController.getVideoPosts);

// Get a single video post by ID
router.get('/:id', videoPostController.getVideoPostById);

// Update a video post
router.put('/:id', videoPostController.updateVideoPost);

// Delete a video post
router.delete('/:id', videoPostController.deleteVideoPost);

module.exports = router;
