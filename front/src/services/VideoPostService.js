import axios from '../axios';

export const createVideoPost = async (videoPostData) => {
  const response = await axios.post('/videoposts', videoPostData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getVideoPosts = async (userId) => {
  const response = await axios.get('/videoposts', {
    params: { userId },
  });
  return response.data;
};

export const getVideoPostById = async (videoPostId) => {
  const response = await axios.get(`/videoposts/${videoPostId}`);
  return response.data;
};

export const updateVideoPost = async (videoPostId, videoPostData) => {
  const response = await axios.put(`/videoposts/${videoPostId}`, videoPostData);
  return response.data;
};

export const deleteVideoPost = async (videoPostId) => {
  const response = await axios.delete(`/videoposts/${videoPostId}`);
  return response.data;
};
