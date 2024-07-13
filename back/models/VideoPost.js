// models/VideoPost.js
const mongoose = require('mongoose');

const VideoPostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postName: { type: String, required: true },
  video: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('VideoPost', VideoPostSchema);
