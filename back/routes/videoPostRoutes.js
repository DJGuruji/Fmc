// routes/videoPostRoutes.js
const express = require('express');
const router = express.Router();
const {protect} = require("../middleware/authMiddleware")
const videoPostController = require('../controllers/videoPostController');

router.post('/',protect,videoPostController.createVideoPost);


router.get('/',protect, videoPostController.getVideoPosts);


router.get('/:id',protect, videoPostController.getVideoPostById);

router.put('/:id',protect, videoPostController.updateVideoPost);


router.delete('/:id',protect, videoPostController.deleteVideoPost);

module.exports = router;
