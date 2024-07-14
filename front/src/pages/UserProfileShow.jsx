import React, { useState, useEffect } from "react";
import axios from "../axios";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { getPosts } from "../services/PostService";
import config from "../config";

const UserProfileShow = () => {
  const { userId } = useParams();
  const { user } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState("");
  const [job, setJob] = useState("");
  const [district, setDistrict] = useState("");
  const [office, setOffice] = useState("");
  const [officePlace, setOfficePlace] = useState("");
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(false);
  const [showMore, setShowMore] = useState({});
  const [loadingPosts, setLoadingPosts] = useState(false); 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`admin/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data)
        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
        setMobile(userData.mobile || "");
        setState(userData.state || "");
        setJob(userData.job || "");
        setDistrict(userData.district || "");
        setOffice(userData.office || "");
        setOfficePlace(userData.officePlace || "");
        setPhoto(userData.photo || null);
      } catch (error) {
        toast.error(`Error fetching user profile: ${error.message}`);
      }
    };

    fetchUserData();
  }, [userId]);

  const fetchUserPosts = async () => {
    setLoadingPosts(true); 
    try {
      const postsData = await getPosts(userId);
      setPosts(postsData);
      setShowPosts(true);
    } catch (error) {
      toast.error(`Error fetching user posts: ${error.message}`);
    } finally {
      setLoadingPosts(false); 
    }
  };

  const handleToggle = (id) => {
    setShowMore((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="md:w-3/4 lg:w-3/4 xl:w-3/4 mx-auto p-6 bg-white rounded-lg">
        <div className="text-center">
          {photo && (
            <img
              src={config.API_URL+`${photo}`}
              alt="Profile"
              className="mx-auto w-24 h-24 rounded-full object-cover mb-4"
            />
          )}
          <h2 className="text-3xl font-semibold mb-2">{name}</h2>
          <p className="text-gray-600 mb-4">{job}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Contact Information
            </h3>
            <p className="text-gray-600 mt-5 ">
              <strong>Email:</strong> {email}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Mobile:</strong> {mobile}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Location</h3>
            <p className="text-gray-600 mt-5">
              <strong>State:</strong> {state}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>District:</strong> {district}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Office</h3>
            <p className="text-gray-600 mt-5">
              <strong>Office Name:</strong> {office}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Office Place:</strong> {officePlace}
            </p>
          </div>
        </div>
        {user && user.email === email && (
          <button className="border-2 border-blue-700 hover:bg-blue-300 bg-blue-200 text-blue-700 p-2 rounded-md hover:rounded-xl mt-5 ">
            <Link to="/profile">Update profile</Link>
          </button>
        )}
        <button
          onClick={fetchUserPosts}
          className="p-2 rounded-md hover:rounded-xl mt-5 ml-3 bg-blue-200 border-2 border-blue-700 hover:bg-blue-300 text-blue-700"
        >
          Posts
        </button>
        {loadingPosts ? (
          <p className="text-center mt-4">Loading posts...</p>
        ) : showPosts && posts.length === 0 ? (
          <p className="text-center mt-4">No posts found.</p>
        ) : showPosts ? (
          <div className="container mx-auto p-4">
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post._id} className="md:p-4 lg:p-4 xl:p-4  rounded-md ">
                  <h4 className="text-xl font-semibold ml-16 p-5">{post.postName}</h4>
                  <div className="md:flex lg:flex xl:flex ">
                    <img
                      className="w-full h-full object-contain md:object-cover md:px-16 lg:px-16 xl:px-16"
                      src={`http://localhost:5000/${post.postImage}`}
                      alt={post.postName}
                    />
                    <div className="p-4">
                      <p className="text-gray-700 mb-2 text-justify">
                        {showMore[post._id]
                          ? post.postDescription
                          : `${post.postDescription.substring(0, 100)}...`}
                      </p>
                      <button
                        className="text-blue-600 underline p-3"
                        onClick={() => handleToggle(post._id)}
                      >
                        {showMore[post._id] ? "Read Less" : "Read More"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserProfileShow;
