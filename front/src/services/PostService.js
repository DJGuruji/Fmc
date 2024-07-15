
import axios from '../axios';


export const createPost = async (postData) => {
  const response = await axios.post('/posts', postData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


export const getPosts = async (userId) => {
  const response = await axios.get(`/posts`, {
    params: { userId }
  });
  return response.data;
};

// Get a single post by ID
export const getPostById = async (postId) => {
  const response = await axios.get(`/posts/${postId}`);
  return response.data;
};

// Update a post
export const updatePost = async (postId, postData) => {
  const response = await axios.put(`/posts/${postId}`, postData);
  return response.data;
};

// Delete a post
export const deletePost = async (postId) => {
  const response = await axios.delete(`/posts/${postId}`);
  return response.data;
};
