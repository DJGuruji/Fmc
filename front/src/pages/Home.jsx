import React, { useEffect, useState } from "react";
import { getPosts, deletePost } from "../services/PostService";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { toast } from 'react-toastify';
import config from "../config";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuthStore();
  const [showMore, setShowMore] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleToggle = (id) => {
    setShowMore((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const deletePostHandler = async (postId) => {
    if (window.confirm("Are you sure you want to delete this Post?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await deletePost(postId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response from backend:", response.data);
        setPosts(posts.filter((post) => post._id !== postId)); // Update posts state after deletion
        toast.success("Post Deleted");
      } catch (error) {
        toast.error("Post Deletion Failed");
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Latest Posts</h1>

      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : (
        posts.map((post) => {
          const { _id, user: postUser, postName, postImage, postDescription } = post;
          const postLink = postUser ? `/profile/${postUser._id}` : "#";
          const showMoreText = showMore[_id] ? "Read Less" : "Read More";
          const description = showMore[_id]
            ? postDescription
            : `${postDescription.substring(0, 100)}...`;

          // Check if the current logged-in user is the admin who created the post
          const isAdmin = user && user.role === 'admin';
         // const isOwner = user && postUser && user._id === postUser._id;

          return (
            <div
              className="bg-white rounded-lg shadow-md overflow-hidden md:flex md:flex-row mb-6"
              key={_id}
            >
              <div className="w-full md:w-1/2 h-1/3 md:flex-shrink-0">
                {postUser ? (
                  <p className="text-gray-600 p-2 ml-5">
                    <Link
                      to={postLink}
                      className="text-blue-600 hover:underline text-lg"
                    >
                      {postUser.name}
                    </Link>
                  </p>
                ) : (
                  <p className="text-gray-600 p-2 ml-5">Unknown User</p>
                )}
                <h2 className="text-xl font-bold mb-2 text-center">
                  {postName}
                </h2>
                <img
                  className="w-full h-full object-contain md:object-cover md:px-16 lg:px-16 xl:px-16"
                  src={config.API_URL+`${postImage}`}
                  alt={postName}
                />
              </div>
              <div className="p-4 md:w-1/2">
                <p className="text-gray-700 mb-2 md:mt-24 lg:mt-24 xl:mt-24 text-justify">
                  {description}
                </p>
                <button
                  className="text-blue-600 underline p-3"
                  onClick={() => handleToggle(_id)}
                >
                  {showMoreText}
                </button>
                {isAdmin  ? (
                  <button
                    onClick={() => deletePostHandler(_id)}
                    className="hover:bg-red-600 text-white bg-red-500  t px-3 py-1 rounded-md hover:rounded-xl border-2 border-red-700"
                  >
                    Delete Post
                  </button>
                ) : null}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;
