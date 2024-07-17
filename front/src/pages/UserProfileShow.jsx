import React, { useState, useEffect } from "react";
import axios from "../axios";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { getPosts } from "../services/PostService";
import config from "../config";
import Modal from "react-modal";


Modal.setAppElement("#root");

const UserProfileShow = () => {
  const { userId } = useParams();
  const { user } = useAuthStore();
  // State variables
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`admin/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
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
        setIsFollowing(userData.followers.includes(user._id)); // Check if the logged-in user is following this profile user
        setFollowersCount(userData.followers.length);
        setFollowingCount(userData.following.length);
      } catch (error) {
        toast.error(`Error fetching user profile: ${error.message}`);
      }
    };

    fetchUserData();
  }, [userId, user._id]);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteProfilePhoto = async () => {
    try {
      const response = await axios.delete("users/profilephoto/delete", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        console.log("Profile photo deleted successfully");
        toast.success("profile photo deleted");
      }
    } catch (error) {
      console.error("Error deleting profile photo", error);
      toast.error("error deleting profile photo");
    }
  };

  const followUser = async (userId) => {
    try {
      const response = await axios.post(
        `users/follow/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("followed successfully");
        console.log("User followed successfully");
        setIsFollowing(true); // Update the following status
        setFollowersCount((prevCount) => prevCount + 1); // Increment followers count
      }
    } catch (error) {
      toast.error("Error following user");
      console.error("Error following user", error);
    }
  };

  const unfollowUser = async (userId) => {
    try {
      const response = await axios.post(
        `users/unfollow/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Unfollowed");
        console.log("User unfollowed successfully");
        setIsFollowing(false); // Update the following status
        setFollowersCount((prevCount) => prevCount - 1); // Decrement followers count
      }
    } catch (error) {
      console.error("Error unfollowing user", error);
      toast.error("Error Unfollowing");
    }
  };

  

 

  return (
    <div className="flex justify-center items-center">
      <div className="md:w-3/4 lg:w-3/4 xl:w-3/4 mx-auto p-6 bg-white rounded-lg ">
        <div className="text-center">
          {photo && (
            <>
              <img
                src={config.API_URL + `${photo}`}
                alt="Profile"
                className="mx-auto w-24 h-24 rounded-full object-cover mb-4 cursor-pointer"
                onClick={openModal}
              />
              <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                contentLabel="Enlarged Photo"
                className="flex justify-center items-center bg-white rounded-full md:w-1/2 lg:w-1/2 xl:w-1/2 md:h-1/2 lg:h-1/2 xl:h-1/2"
                overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
              >
                <div className="relative flex justify-center">
                  <img
                    src={config.API_URL + `${photo}`}
                    alt="Enlarged Profile"
                    className="rounded-full w-full h-full"
                  />
                </div>
              </Modal>
            </>
          )}
          <h2 className="text-3xl font-semibold mb-2 ">{name}</h2>
          <div className="flex justify-center p-3">
          <Link to={`/following/${userId}`}  className="cursor-pointer text-blue-500">
            {followingCount} Following
          </Link>
          <Link to={`/followers/${userId}`} className="ml-5 cursor-pointer text-blue-500">
            {followersCount} Followers
          </Link>
          </div>
          {user &&
            user.email !== email &&
            (!isFollowing ? (
              <button
                onClick={() => followUser(userId)}
                className="bg-blue-600 hover:bg-blue-700 p-1 rounded-md text-white m-2"
              >
                Follow
              </button>
            ) : (
              <button
                onClick={() => unfollowUser(userId)}
                className="bg-blue-600 hover:bg-blue-700 p-1 rounded-md text-white m-2"
              >
                Following
              </button>
            ))}
          <p className="text-gray-600 mb-4">{job}</p>
        </div>
        {/* grid grid-cols-1 md:grid-cols-2 gap-4 */}
        <div className=" md:flex lg:flex xl:flex  justify-center ">
          <div className="m-2">
            <h3 className="text-lg font-semibold text-gray-700">Contact</h3>
            <p className="text-gray-600 mt-5">
              <strong>Email:</strong> {email}
            </p>
            {mobile && (
              <p className="text-gray-600 mt-2">
                <strong>Mobile:</strong> {mobile}
              </p>
            )}
          </div>
          <div className="m-2">
            <h3 className="text-lg font-semibold text-gray-700">Location</h3>
            <p className="text-gray-600 mt-5">
              <strong>State:</strong> {state}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>District:</strong> {district}
            </p>
          </div>
          <div className="m-2">
            <h3 className="text-lg font-semibold text-gray-700">Office</h3>
            <p className="text-gray-600 mt-5">
              <strong>Office Name:</strong> {office}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Office Place:</strong> {officePlace}
            </p>
          </div>
        </div>
   <div className="flex justify-center flex-wrap">
   {user && user.email === email && (
          <>
            <button className="hover:shadow-xl bg-blue-700 hover:bg-blue-800 text-white py-1 px-2 rounded-md hover:rounded-xl mt-5">
              <Link to="/profile">Update profile</Link>
            </button>
            <button
              className="hover:shadow-xl ml-3 bg-blue-700 hover:bg-blue-800 text-white py-1 px-2 rounded-md hover:rounded-xl mt-5"
              onClick={deleteProfilePhoto}
            >
              Remove Profile Picture
            </button>
          </>
        )}
        <button
          onClick={fetchUserPosts}
          className="hover:shadow-xl py-1 px-6 rounded-md hover:rounded-xl mt-5 ml-3 bg-blue-700 hover:bg-blue-800 text-white"
        >
          Posts
        </button>
   </div>
        {loadingPosts ? (
          <p className="text-center mt-4">Loading posts...</p>
        ) : showPosts && posts.length === 0 ? (
          <p className="text-center mt-4">No posts found.</p>
        ) : showPosts ? (
          <div className="container mx-auto p-4">
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post._id} className="md:p-4 lg:p-4 xl:p-4 rounded-md">
                  <h4 className="text-xl font-semibold ml-16 p-5">{post.postName}</h4>
                  <div className="md:flex lg:flex xl:flex">
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
