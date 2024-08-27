import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
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
  AiFillHome,
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
        console.log("Error fetching user profile:", error);
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
                <span className="rounded-full ">
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
                <span className="flex  items-center ml-6">
                  <UserSearch className="" />
                </span>
              </div>
              {submenuOpen && (
                <ul className="sub-menu absolute mt-2 rounded-md shadow-lg bg-white border-2 border-blue-500 left-0">
                  <li className="p-2">
                    <NavLink
                      to={`/profile/${user._id}`}
                      onClick={toggleSubmenu}
                      className="text-center flex items-center hover:bg-zinc-200 p-2 rounded-xl"
                    >
                      <CgProfile className="mr-1" />
                      View Profile
                    </NavLink>
                  </li>
                  {/* <li className="p-2">
                    <NavLink
                      to="/connections"
                      onClick={toggleSubmenu}
                      className="text-center flex items-center hover:bg-zinc-200 p-2 rounded-xl"
                    >
                      <PiNetwork className="mr-1" />
                      Connections
                    </NavLink>
                  </li>
                  <li className="p-2">
                    <NavLink
                      to="/likes"
                      onClick={toggleSubmenu}
                      className="text-center flex items-center hover:bg-zinc-200 p-2 rounded-xl"
                    >
                      <FcLike className="mr-1" />
                      Wish List
                    </NavLink>
                  </li> */}
                  <li className="p-2">
                    <NavLink
                      to="/settings"
                      className="text-center flex items-center hover:bg-zinc-200 p-2 rounded-xl"
                      onClick={toggleSubmenu}
                    >
                      <IoSettingsOutline className="mr-1" />
                      Settings
                    </NavLink>
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
          <button
            className="md:hidden text-white mr-2"
            onClick={toggleDropdown}
          >
            <div className="w-8 h-1 bg-white m-1 rounded-lg"></div>
            <div className="ml-3 w-6 h-1 bg-white m-1 rounded-lg"></div>
          </button>
          <ul className="hidden md:flex space-x-4">
            {!user ? (
              <>
                <li className="text-white text-lg">
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center hover:bg-zinc-600 rounded-xl underline"
                        : "flex items-center hover:bg-zinc-600 rounded-xl"
                    }
                  >
                    <AiOutlineUser className="mr-2" /> Signup
                  </NavLink>
                </li>
                <li className="text-white text-lg">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center hover:bg-zinc-600 rounded-xl underline"
                        : "flex items-center hover:bg-zinc-600 rounded-xl"
                    }
                  >
                    <AiOutlineLogin className="mr-2" /> Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {(user.role === "user" ||
                  user.role === "admin" ||
                  user.role === "staff") && (
                  <>
                    <li className="text-zinc-400 self-center font-sans">
                      Hello {user.name}
                    </li>
                    <li className="text-white self-center">
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center p-1 bg-zinc-600 rounded-xl underline"
                            : "flex items-center hover:bg-zinc-600 rounded-xl"
                        }
                      >
                        <AiOutlineHome className="mr-1 " /> Home
                      </NavLink>
                    </li>
                    <li className="text-white self-center">
                      <NavLink
                        to="/posts"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center p-1 bg-zinc-600 rounded-xl underline"
                            : "flex items-center hover:bg-zinc-600 rounded-xl"
                        }

                      >
                        <AiOutlineFileText className="mr-1" /> My Posts
                      </NavLink>
                    </li>
                    <li className="text-white self-center">
                      <NavLink
                        to="/myvideo"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center p-1 bg-zinc-600 rounded-xl underline"
                            : "flex items-center hover:bg-zinc-600 rounded-xl"
                        }
                      >
                        <MdOutlineOndemandVideo className="mr-1" /> My Videos
                      </NavLink>
                    </li>
                    <li className="text-white self-center">
                      <NavLink
                        to="/videoposts"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center p-1 bg-zinc-600 rounded-xl underline"
                            : "flex items-center hover:bg-zinc-600 rounded-xl"
                        }
                      >
                        <MdOutlineVideoLibrary className="mr-1" /> Videos
                      </NavLink>
                    </li>
                    <li className="text-white self-center">
                      <NavLink
                        to="/addwork"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center p-1 bg-zinc-600 rounded-xl underline"
                            : "flex items-center hover:bg-zinc-600 rounded-xl"
                        }
                      >
                        <MdWorkspacePremium className="mr-1" /> Add Work
                      </NavLink>
                    </li>
                  </>
                )}
                {(user.role === "admin" || user.role === "staff") && (
                  <>
                    <li className="text-white self-center">
                      <NavLink
                        to="/users"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center p-1 bg-zinc-600 rounded-xl underline"
                            : "flex items-center hover:bg-zinc-600 rounded-xl"
                        }
                      >
                        <HiOutlineUsers className="mr-1" />
                        Users
                      </NavLink>
                    </li>
                    {/* <li className="text-white self-center">
                      <NavLink
                        to="/services"
                          className={({ isActive }) =>
              isActive  ? "flex items-center p-1 bg-zinc-600 rounded-xl underline" : "flex items-center hover:bg-zinc-600 rounded-xl"
            }
                      >
                        <MdOutlineCleaningServices className="mr-1" />
                        Services
                      </NavLink>
                    </li> */}
                  </>
                )}
                <li className="text-white self-center">
                  <NavLink
                    to="/ai"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center p-1 bg-zinc-600 rounded-xl underline"
                        : "flex items-center hover:bg-zinc-600 rounded-xl"
                    }
                  >
                    <BsChatSquareDots className="mr-1" /> Chat
                  </NavLink>
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
                      <NavLink
                        to="/signup"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center hover:bg-zinc-600 rounded-xl underline"
                            : "flex items-center hover:bg-zinc-600 rounded-xl"
                        }
                        onClick={closeDropdown}
                      >
                        <AiOutlineUser /> Signup
                      </NavLink>
                    </li>
                    <li className="text-lg">
                      <NavLink
                        to="/login"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center hover:bg-zinc-600 rounded-xl underline"
                            : "flex items-center hover:bg-zinc-600 rounded-xl"
                        }
                        onClick={closeDropdown}
                      >
                        <AiOutlineLogin /> Login
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    {(user.role === "user" ||
                      user.role === "admin" ||
                      user.role === "staff") && (
                      <>
                        <li className="text-lg">
                          <NavLink
                            to="/"
                            className={({ isActive }) =>
                              isActive
                                ? "flex items-center hover:bg-zinc-600 rounded-xl underline"
                                : "flex items-center hover:bg-zinc-600 rounded-xl"
                            }
                            onClick={closeDropdown}
                          >
                            <AiOutlineHome /> Home
                          </NavLink>
                        </li>
                        <li className="text-lg">
                          <NavLink
                            to="/posts"
                            className={({ isActive }) =>
                              isActive
                                ? "flex items-center hover:bg-zinc-600 rounded-xl underline"
                                : "flex items-center hover:bg-zinc-600 rounded-xl"
                            }
                            onClick={closeDropdown}
                          >
                            <AiOutlineFileText /> My Posts
                          </NavLink>
                        </li>
                        <li className="text-lg">
                          <NavLink
                            to="/myvideo"
                            className={({ isActive }) =>
                              isActive
                                ? "flex items-center hover:bg-zinc-600 rounded-xl underline"
                                : "flex items-center hover:bg-zinc-600 rounded-xl"
                            }
                            onClick={closeDropdown}
                          >
                            <MdOutlineOndemandVideo /> My Videos
                          </NavLink>
                        </li>
                        <li className="text-lg">
                          <NavLink
                            to="/videoposts"
                            className={({ isActive }) =>
                              isActive
                                ? "flex items-center bg-zinc-300 p-2 rounded-xl underline"
                                : "flex items-center hover:bg-zinc-600 rounded-xl"
                            }
                            onClick={closeDropdown}
                          >
                            <MdOutlineVideoLibrary /> Videos
                          </NavLink>
                        </li>
                        <li className="text-lg">
                          <NavLink
                            to="/addwork"
                            className={({ isActive }) =>
                              isActive
                                ? "flex items-center hover:bg-zinc-600 rounded-xl underline"
                                : "flex items-center hover:bg-zinc-600 rounded-xl"
                            }
                            onClick={closeDropdown}
                          >
                            <MdWorkspacePremium /> Add Work
                          </NavLink>
                        </li>
                      </>
                    )}
                    {(user.role === "admin" || user.role === "staff") && (
                      <>
                        <li className="text-lg">
                          <NavLink
                            to="/users"
                            className={({ isActive }) =>
                              isActive
                                ? "flex items-center hover:bg-zinc-600 rounded-xl underline"
                                : "flex items-center hover:bg-zinc-600 rounded-xl"
                            }
                            onClick={closeDropdown}
                          >
                            <HiOutlineUsers /> Users
                          </NavLink>
                        </li>
                        {/* <li className="text-lg">
                          <NavLink
                            to="/services"
                              className={({ isActive }) =>
              isActive ? "flex items-center hover:bg-zinc-600 rounded-xl underline" : "flex items-center hover:bg-zinc-600 rounded-xl"
            }
                            onClick={closeDropdown}
                          >
                            <MdOutlineCleaningServices /> Services
                          </NavLink>
                        </li> */}
                      </>
                    )}
                    <li className="text-lg">
                      <NavLink
                        to="/addwork"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center hover:bg-zinc-600 rounded-xl underline"
                            : "flex items-center hover:bg-zinc-600 rounded-xl"
                        }
                        onClick={closeDropdown}
                      >
                        <BsChatSquareDots /> Chat
                      </NavLink>
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
