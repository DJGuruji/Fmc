import React, { useState, useEffect } from "react";
import axios from "../axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import config from "../config";

const Followers = () => {
  const { userId } = useParams();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(`users/followers/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFollowers(response.data);
      } catch (error) {
        toast.error(`Error fetching followers: ${error.message}`);
      }
    };

    fetchFollowers();
  }, [userId]);

  const toggleFollow = async (followerId) => {
    try {
      const response = await axios.post(
        `users/${followerId}/toggleFollow`,
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
      <h2 className="text-xl font-semibold mb-2">Followers</h2>
      {followers.map((follower) => (
        <div key={follower._id} className="follower-item flex items-center justify-between py-2 px-4 border-b">
          <div className="flex items-center">
            {follower.photo && (
              <img
                src={config.API_URL + `${follower.photo}`}
                alt="Follower"
                className="w-10 h-10 rounded-full mr-3"
              />
            )}
            <span>{follower.name}</span>
          </div>
          <button
            onClick={() => toggleFollow(follower._id)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md"
          >
            {follower.isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Followers;
