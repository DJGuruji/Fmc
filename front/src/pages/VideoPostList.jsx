import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getVideoPosts, deleteVideoPost } from '../services/VideoPostService';
import { useAuthStore } from '../store/authStore';

const VideoPostList = () => {
  const { user } = useAuthStore();
  const [videoPosts, setVideoPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState({});

  useEffect(() => {
    const fetchVideoPosts = async () => {
      try {
        const data = await getVideoPosts();
        setVideoPosts(data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching videos:", error);
        setLoading(false);
      }
    };

    fetchVideoPosts();
  }, []);

  const handleToggle = (id) => {
    setShowMore((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const deletePostHandler = async (videoPostId) => {
    if (window.confirm("Are you sure you want to delete this Post?")) {
      try {
        const token = localStorage.getItem("token");
        await deleteVideoPost(videoPostId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVideoPosts(videoPosts.filter((post) => post._id !== videoPostId));
        toast.success("Post Deleted");
      } catch (error) {
        toast.error("Post Deletion Failed");
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Latest Videos</h1>

      {loading ? (
        <p className="text-center">Loading Videos...</p>
      ) : (
        videoPosts.map((post) => {
          const { _id, user: videoPostUser, postName, video, description } = post;
          const postLink = videoPostUser ? `/profile/${videoPostUser._id}` : "#";
          const showMoreText = showMore[_id] ? "Read Less" : "Read More";
          const shortDescription = description.length > 100 ? `${description.substring(0, 100)}...` : description;

          return (
            <div key={_id} className=" bg-white rounded-lg shadow-md  md:flex md:flex-row mb-6">
              <div className="w-full md:w-1/2 md:h-1/2 md:flex-shrink-0 ">
                {videoPostUser ? (
                  <p className="text-gray-600 p-2 ml-5">
                    <Link to={postLink} className="text-blue-600 hover:underline text-lg">
                      {videoPostUser.name}
                    </Link>
                  </p>
                ) : (
                  <p className="text-gray-600 p-2 ml-5">Unknown User</p>
                )}
                <h2 className="text-xl font-bold mb-2 text-center">{postName}</h2>
                <video className="w-full h-3/4 md:w-96  md:h-96 object-cover" controls src={video} />
              </div>
              <div className=" md:w-1/2">
                <p className="text-gray-700 mb-2 md:mt-24 lg:mt-24 xl:mt-24 text-justify">
                  {showMore[_id] ? description : shortDescription}
                </p>
                <button className="text-blue-600 underline p-3" onClick={() => handleToggle(_id)}>
                  {showMoreText}
                </button>
                {user && (user.role === 'admin' || (videoPostUser && user._id === videoPostUser._id)) && (
                  <button
                    onClick={() => deletePostHandler(_id)}
                    className="bg-red-300 hover:bg-red-400 text-red-700 px-3 py-1 rounded-md hover:rounded-xl border-2 border-red-700"
                  >
                    Delete Post
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default VideoPostList;
