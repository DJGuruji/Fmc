// services/VideoPostService.js
import axios from '../axios';

// Create a new video post
export const createVideoPost = async (videoPostData) => {
  const response = await axios.post('/videoposts', videoPostData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Get all video posts or video posts by a specific user
export const getVideoPosts = async (userId) => {
  const response = await axios.get(`/videoposts`, {
    params: { userId },
  });
  return response.data;
};

// Get a single video post by ID
export const getVideoPostById = async (videoPostId) => {
  const response = await axios.get(`/videoposts/${videoPostId}`);
  return response.data;
};

// Update a video post
export const updateVideoPost = async (videoPostId, videoPostData) => {
  const response = await axios.put(`/videoposts/${videoPostId}`, videoPostData);
  return response.data;
};

// Delete a video post
export const deleteVideoPost = async (videoPostId) => {
  const response = await axios.delete(`/videoposts/${videoPostId}`);
  return response.data;
};
