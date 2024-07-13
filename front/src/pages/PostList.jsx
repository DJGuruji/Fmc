import React, { useEffect, useState } from 'react';
import { getPosts, deletePost } from '../services/PostService';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-toastify';


const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuthStore();
  const [showMore, setShowMore] = useState({});
  const [loading, setLoading] = useState(true); // Step 1: Loading state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(user._id); 
        setPosts(data);
        setLoading(false); // Step 2: Update loading state when data fetching completes
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false); // Ensure loading state is set to false in case of error
      }
    };

    fetchPosts();
  }, [user]);

  const handleToggle = (id) => {
    setShowMore((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const deletePostHandler = async (postId) => {
    if (window.confirm("Are you sure you want to delete this Post?")) {
      try {
        const token = localStorage.getItem('token');
        const response = await deletePost(postId, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Response from backend:', response.data);
        setPosts(posts.filter(post => post._id !== postId)); // Update posts state after deletion
        toast.success("Post Deleted");
      } catch (error) {
        toast.error("Post Deletion Failed");
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      
      
      {loading ? ( // Step 3: Conditional rendering based on loading state
        <p className="text-center">Loading posts...</p>
      ) : (
        posts.map(post => (
          <div className="bg-white rounded-lg shadow-md overflow-hidden md:flex md:flex-row mb-6" key={post._id}>
            <div className="w-full md:w-1/2 h-1/3 md:flex-shrink-0">
             
              <h2 className="text-xl font-bold mb-2 text-center">{post.postName}</h2>
              <img
                className="w-full h-full object-contain md:object-cover md:px-16 lg:px-16 xl:px-16 "
                src={`http://localhost:5000/${post.postImage}`}
                alt={post.postName}
              />
            </div>
            <div className="p-4 md:w-1/2">
              <p className="text-gray-700 mb-2 md:mt-24 lg:mt-24 xl:mt-24 text-justify">
                {showMore[post._id] ? post.postDescription : `${post.postDescription.substring(0, 100)}...`}
              </p>
              <button
                className="text-blue-600 underline p-3"
                onClick={() => handleToggle(post._id)}
              >
                {showMore[post._id] ? 'Read Less' : 'Read More'}
              </button>
              <button
                onClick={() => deletePostHandler(post._id)} // Pass post._id to deletePostHandler
                className="bg-red-300 hover:bg-red-400 text-red-700  px-3 py-1 rounded-md hover:rounded-xl border-2 border-red-700"
              >
                Delete Post
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
