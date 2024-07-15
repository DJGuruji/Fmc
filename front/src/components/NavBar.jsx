import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import config from "../config";
import {
  AiOutlineUser,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineHome,
  AiOutlineFileText,
  AiFillWechatWork,
  AiOutlineSearch,
} from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { PiNetwork } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { LiaUserLockSolid } from "react-icons/lia";
import { BsChatSquareDots } from "react-icons/bs";
import {
  MdOutlineCleaningServices,
  MdOutlineOndemandVideo,
  MdOutlineVideoLibrary,
  MdWorkspacePremium,
} from "react-icons/md";
import UserSearch from "./UserSearch";



const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [photo, setPhoto] = useState(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);
  const toggleSubmenu = () => setSubmenuOpen(!submenuOpen);

  const handleLogoutAndToggle = () => {
    logout();
    toggleSubmenu();
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPhoto(response.data.photo || "");
      } catch (error) {
        toast.error("Error fetching user profile:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <nav className="bg-zinc-700 p-1  sticky top-0">
        <div className="flex justify-between items-center">
          {user && (
            <div className="relative">
              <div className="flex ">
                <span   className="rounded-full ">
                {photo ? (
                  <img
                    src={config.API_URL + photo}
                    alt="User profile"
                    className="mx-auto md:w-16 lg:w-16 xl:w-16 md:h-16 lg:h-16 xl:h-16 w-11 h-11 rounded-full object-cover "
                    onClick={toggleSubmenu}
                  />
                ) : (
                  <CgProfile
                    className="bg-zinc-300 text-zinc-600  w-11 h-11 rounded-full cursor-pointer"
                    onClick={toggleSubmenu}
                  />
                )}
                </span>
                <span className="flex  items-center ml-6" >
                  <UserSearch className="" />
                </span>
              </div>
              {submenuOpen && (
                <ul className="sub-menu absolute mt-2 rounded-md shadow-lg bg-white border-2 border-blue-500 left-0">
                  <li className="p-2">
                    <Link
                      to={`/profile/${user._id}`}
                      onClick={toggleSubmenu}
                      className="text-center flex items-center hover:bg-zinc-200 p-2 rounded-xl"
                    >
                      <CgProfile className="mr-1" />
                      View Profile
                    </Link>
                  </li>
                  <li className="p-2">
                    <Link
                      to="/connections"
                      onClick={toggleSubmenu}
                      className="text-center flex items-center hover:bg-zinc-200 p-2 rounded-xl"
                    >
                      <PiNetwork className="mr-1" />
                      Connections
                    </Link>
                  </li>
                  <li className="p-2">
                    <Link
                      to="/likes"
                      onClick={toggleSubmenu}
                      className="text-center flex items-center hover:bg-zinc-200 p-2 rounded-xl"
                    >
                      <FcLike className="mr-1" />
                      Wish List
                    </Link>
                  </li>
                  <li className="p-2">
                    <Link
                      to="/settings"
                      className="text-center flex items-center hover:bg-zinc-200 p-2 rounded-xl"
                      onClick={toggleSubmenu}
                    >
                      <IoSettingsOutline className="mr-1" />
                      Settings
                    </Link>
                  </li>
                  <li className="text-white self-center p-4">
                    <button
                      onClick={handleLogoutAndToggle}
                      className="border-red-700 text-white flex items-center bg-red-500 hover:bg-red-600 rounded-md p-1"
                    >
                      <AiOutlineLogout className="mr-2" /> Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
          <button className="md:hidden text-white mr-2" onClick={toggleDropdown}>
            <div className="w-8 h-1 bg-white m-1 rounded-lg"></div>
            <div className="ml-3 w-6 h-1 bg-white m-1 rounded-lg"></div>
          </button>
          <ul className="hidden md:flex space-x-4">
            {!user ? (
              <>
                <li className="text-white text-lg">
                  <Link to="/signup" className="flex items-center">
                    <AiOutlineUser className="mr-2" /> Signup
                  </Link>
                </li>
                <li className="text-white text-lg">
                  <Link to="/login" className="flex items-center">
                    <AiOutlineLogin className="mr-2" /> Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                {(user.role === "user" ||
                  user.role === "admin" ||
                  user.role === "staff") && (
                  <>
                    <li className="text-white self-center">
                      <Link
                        to="/"
                        className="flex items-center hover:bg-zinc-600 rounded-xl"
                      >
                        <AiOutlineHome className="mr-1" /> Home
                      </Link>
                    </li>
                    <li className="text-white self-center">
                      <Link
                        to="/posts"
                        className="flex items-center hover:bg-zinc-600 rounded-xl"
                      >
                        <AiOutlineFileText className="mr-1" /> My Posts
                      </Link>
                    </li>
                    <li className="text-white self-center">
                      <Link
                        to="/myvideo"
                        className="flex items-center hover:bg-zinc-600 rounded-xl"
                      >
                        <MdOutlineOndemandVideo className="mr-1" /> My Videos
                      </Link>
                    </li>
                    <li className="text-white self-center">
                      <Link
                        to="/videoposts"
                        className="flex items-center hover:bg-zinc-600 rounded-xl"
                      >
                        <MdOutlineVideoLibrary className="mr-1" /> Videos
                      </Link>
                    </li>
                    <li className="text-white self-center">
                      <Link
                        to="/addwork"
                        className="flex items-center hover:bg-zinc-600 rounded-xl"
                      >
                        <MdWorkspacePremium className="mr-1" /> Add Work
                      </Link>
                    </li>
                  </>
                )}
                {(user.role === "admin" || user.role === "staff") && (
                  <>
                    <li className="text-white self-center">
                      <Link
                        to="/users"
                        className="flex items-center hover:bg-zinc-600 rounded-xl"
                      >
                        <HiOutlineUsers className="mr-1" />
                        Users
                      </Link>
                    </li>
                    {/* <li className="text-white self-center">
                      <Link
                        to="/services"
                        className="flex items-center hover:bg-zinc-600 rounded-xl"
                      >
                        <MdOutlineCleaningServices className="mr-1" />
                        Services
                      </Link>
                    </li> */}
                  </>
                )}
                <li className="text-white self-center">
                  <Link
                    to="/addwork"
                    className="flex items-center hover:bg-zinc-600 rounded-xl mr-2"
                  >
                    <BsChatSquareDots className="mr-1" /> Chat
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {dropdownOpen && (
          <div className="md:hidden">
            <div className="w-28 absolute mt-2 rounded-md shadow-lg bg-white right-0 border-2 border-blue-500">
              <ul className="flex flex-col space-y-2 mt-2 flex-wrap">
                {!user ? (
                  <>
                    <li className="text-lg">
                      <Link
                        to="/signup"
                        className="flex items-center"
                        onClick={closeDropdown}
                      >
                        <AiOutlineUser /> Signup
                      </Link>
                    </li>
                    <li className="text-lg">
                      <Link
                        to="/login"
                        className="flex items-center"
                        onClick={closeDropdown}
                      >
                        <AiOutlineLogin /> Login
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    {(user.role === "user" ||
                      user.role === "admin" ||
                      user.role === "staff") && (
                      <>
                        <li className="text-lg">
                          <Link
                            to="/"
                            className="flex items-center"
                            onClick={closeDropdown}
                          >
                            <AiOutlineHome /> Home
                          </Link>
                        </li>
                        <li className="text-lg">
                          <Link
                            to="/posts"
                            className="flex items-center"
                            onClick={closeDropdown}
                          >
                            <AiOutlineFileText /> My Posts
                          </Link>
                        </li>
                        <li className="text-lg">
                          <Link
                            to="/myvideo"
                            className="flex items-center"
                            onClick={closeDropdown}
                          >
                            <MdOutlineOndemandVideo /> My Videos
                          </Link>
                        </li>
                        <li className="text-lg">
                          <Link
                            to="/videoposts"
                            className="flex items-center"
                            onClick={closeDropdown}
                          >
                            <MdOutlineVideoLibrary /> Videos
                          </Link>
                        </li>
                        <li className="text-lg">
                          <Link
                            to="/addwork"
                            className="flex items-center"
                            onClick={closeDropdown}
                          >
                            <MdWorkspacePremium /> Add Work
                          </Link>
                        </li>
                      </>
                    )}
                    {(user.role === "admin" || user.role === "staff") && (
                      <>
                        <li className="text-lg">
                          <Link
                            to="/users"
                            className="flex items-center"
                            onClick={closeDropdown}
                          >
                            <HiOutlineUsers /> Users
                          </Link>
                        </li>
                        {/* <li className="text-lg">
                          <Link
                            to="/services"
                            className="flex items-center"
                            onClick={closeDropdown}
                          >
                            <MdOutlineCleaningServices /> Services
                          </Link>
                        </li> */}
                      </>
                    )}
                    <li className="text-lg">
                      <Link
                        to="/addwork"
                        className="flex items-center"
                        onClick={closeDropdown}
                      >
                        <BsChatSquareDots /> Chat
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
