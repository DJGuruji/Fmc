// models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postName: { type: String, required: true },
  postImage: { type: String, required: true },
  postDescription: { type: String, required: true },
}, { timestamps: true });




module.exports = mongoose.model('Post', PostSchema);
