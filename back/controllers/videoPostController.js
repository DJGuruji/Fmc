// controllers/videoPostController.js
const VideoPost = require("../models/VideoPost");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/videos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename uploaded video file if needed
  },
});

const upload = multer({ storage: storage });

// Create a new video post
(exports.createVideoPost = upload.single("video")),
  async (req, res) => {
    try {
      const { postName, description } = req.body;
      const newVideoPost = new VideoPost({
        user: req.user._id, // Assuming you have user information in req.user
        postName,
        description,
        video: req.file.path, // Save video path after multer has saved it
      });

      const savedVideoPost = await newVideoPost.save();
      res.status(201).json(savedVideoPost);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Get all video posts
exports.getVideoPosts = async (req, res) => {
  try {
    const userId = req.query.userId;
    let videoPosts;

    if (userId) {
      videoPosts = await VideoPost.find({ user: userId }).populate("user");
    } else {
      videoPosts = await VideoPost.find().populate("user");
    }

    res.status(200).json(videoPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single video post by ID
exports.getVideoPostById = async (req, res) => {
  try {
    const videoPost = await VideoPost.findById(req.params.id).populate("user");
    if (!videoPost) {
      return res.status(404).json({ message: "Video post not found" });
    }
    res.status(200).json(videoPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a video post
exports.updateVideoPost = async (req, res) => {
  try {
    const updatedVideoPost = await VideoPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("user");
    if (!updatedVideoPost) {
      return res.status(404).json({ message: "Video post not found" });
    }
    res.status(200).json(updatedVideoPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a video post
exports.deleteVideoPost = async (req, res) => {
  try {
    const deletedVideoPost = await VideoPost.findByIdAndDelete(req.params.id);
    if (!deletedVideoPost) {
      return res.status(404).json({ message: "Video post not found" });
    }
    res.status(200).json({ message: "Video post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
