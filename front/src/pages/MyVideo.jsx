// components/MyVideo.jsx
import React, { useEffect, useState } from 'react';
import { getVideoPosts } from '../services/VideoPostService';
import { useAuthStore } from '../store/authStore';

const MyVideo = () => {
  const [videoPosts, setVideoPosts] = useState([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchVideoPosts = async () => {
      const data = await getVideoPosts(user._id); // Fetch video posts of the logged-in user
      setVideoPosts(data);
    };
    fetchVideoPosts();
  }, [user]);

  return (
    <div>
      <h1>My Video Posts</h1>
      {videoPosts.map(videoPost => (
        <div key={videoPost._id}>
          <h2>{videoPost.postName}</h2>
          <video controls src={videoPost.video} />
          <p>{videoPost.description}</p>
          <p>Posted by: {videoPost.user.name}</p>
        </div>
      ))}
    </div>
  );
};

export default MyVideo;
