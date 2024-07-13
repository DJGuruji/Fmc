// components/VideoPostList.jsx
import React, { useEffect, useState } from 'react';
import { getVideoPosts } from '../services/VideoPostService';

const VideoPostList = () => {
  const [videoPosts, setVideoPosts] = useState([]);

  useEffect(() => {
    const fetchVideoPosts = async () => {
      const data = await getVideoPosts();
      setVideoPosts(data);
    };
    fetchVideoPosts();
  }, []);

  return (
    <div>
      <h1>All Video Posts</h1>
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

export default VideoPostList;
