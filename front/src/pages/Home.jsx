import React, { useEffect, useState } from "react";
import { getPosts } from "../services/PostService";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Latest Posts</h1>
      
      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : (
        posts.map((post) => {
          const { _id, user, postName, postImage, postDescription } = post;
          const postLink = `/profile/${user._id}`;
          const showMoreText = showMore[_id] ? "Read Less" : "Read More";
          const description = showMore[_id] ? postDescription : `${postDescription.substring(0, 100)}...`;

          return (
            <div
              className="bg-white rounded-lg shadow-md overflow-hidden md:flex md:flex-row mb-6"
              key={_id}
            >
              <div className="w-full md:w-1/2 h-1/3 md:flex-shrink-0">
                <p className="text-gray-600 p-2 ml-5">
                  <Link to={postLink} className="text-blue-600 hover:underline text-lg">{user.name}</Link>
                </p>
                <h2 className="text-xl font-bold mb-2 text-center">{postName}</h2>
                <img
                  className="w-full h-full object-contain md:object-cover md:px-16 lg:px-16 xl:px-16"
                  src={`http://localhost:5000/${postImage}`}
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
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;
