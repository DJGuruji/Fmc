const VideoPost = require("../models/VideoPost");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'videos',
    resource_type: 'video',
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50000000 }, // Limit file size to 50MB
  fileFilter: (req, file, cb) => {
    const filetypes = /mp4|mov|avi|wmv/;
    const extname = filetypes.test(file.originalname.toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Videos Only!');
    }
  },
}).single('video');


exports.createVideoPost = [
  upload,
  async (req, res) => {
    try {
      const { postName, description } = req.body;

      // Ensure that the file was uploaded to Cloudinary
      if (!req.file) {
        return res.status(400).json({ message: 'Video upload failed' });
      }

      const newVideoPost = new VideoPost({
        user: req.user._id,
        postName,
        description,
        video: req.file.path, // Cloudinary URL
      });

      const savedVideoPost = await newVideoPost.save();

      res.status(201).json(savedVideoPost);
    } catch (err) {
      console.error(err); // Log the error to the server console
      res.status(500).json({ message: err.message });
    }
  },
];




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
