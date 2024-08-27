import React, { useState, useEffect } from "react";
import axios from "../axios";
import { toast } from "react-toastify";
import config from "../config";

const Profile = () => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState("");
  const [job, setJob] = useState("");
  const [district, setDistrict] = useState("");
  const [office, setOffice] = useState("");
  const [officePlace, setOfficePlace] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const userData = response.data;
        setUserId(userData._id);
        setName(userData.name);
        setEmail(userData.email);
        setMobile(userData.mobile || "");
        setPhoto(userData.photo || "");
        setState(userData.state || "");
        setJob(userData.job || "");
        setDistrict(userData.district || "");
        setOffice(userData.office || "");
        setOfficePlace(userData.officePlace || "");
      } catch (error) {
        toast.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("mobile", mobile);
      if (photo) {
        formData.append("postImage", photo);
      }
      formData.append("state", state);
      formData.append("job", job);
      formData.append("district", district);
      formData.append("office", office);
      formData.append("officePlace", officePlace);

      const response = await axios.put(`/users/profile/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Profile updated successfully:");
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const handleFileClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Update Profile</h2>
      <div className="relative inline-block w-24 h-24">
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="hidden"
        />
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full overflow-hidden cursor-pointer"
          onClick={handleFileClick}
        >
          {photo ? (
            <img
              src={config.API_URL + `${photo}`}
              alt="Profile"
              className="object-cover w-full h-full rounded-full"
            />
          ) : (
            <div className=" w-5 h-2 px-5 text-4xl text-gray-500">+</div>
          )}
        </div>
        <div
          className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 cursor-pointer"
          onClick={handleFileClick}
        >
          +
        </div>
      </div>

      <form onSubmit={handleUpdateProfile} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile:</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">State:</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Enter your State"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Profession:</label>
          <input
            type="text"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            placeholder="Add your profession"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">District:</label>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="Enter your District"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Office:</label>
          <input
            type="text"
            value={office}
            onChange={(e) => setOffice(e.target.value)}
            placeholder="Enter office name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Office Place:</label>
          <input
            type="text"
            value={officePlace}
            onChange={(e) => setOfficePlace(e.target.value)}
            placeholder="Enter office place"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
