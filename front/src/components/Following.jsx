import React, { useState, useEffect } from "react";
import axios from "../axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import config from "../config";


const Following = () => {
  const {userId} = useParams();
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await axios.get(`users/following/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFollowing(response.data);
      } catch (error) {
        toast.error(`Error fetching following: ${error.message}`);
      }
    };

    fetchFollowing();
  }, [userId]);

  const toggleFollow = async (followedUserId) => {
    try {
      const response = await axios.post(
        `users/${followedUserId}/toggleFollow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        // Optionally update state or show a success message
        toast.success("Follow status updated successfully");
      }
    } catch (error) {
      toast.error(`Error toggling follow: ${error.message}`);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Following</h2>
      {following.map((following) => (
        <Link to={`/profile/${following._id}`}>
          <div
            key={following._id}
            className="following-item flex items-center justify-between py-2 px-4 border-b hover:bg-zinc-200"
          >
            <div className="flex items-center ">
              {following.photo && (
                <img
                  src={config.API_URL + `${following.photo}`}
                  alt="Following"
                  className="w-10 h-10 rounded-full mr-3"
                />
              )}
              <span>
                <p>{following.name}</p>
              </span>
            </div>

            {/* <button
            onClick={() => toggleFollow(user._id)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md"
          >
            {user.isFollowing ? "Following" : "Follow"}
          </button> */}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Following;
