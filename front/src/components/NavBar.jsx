import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
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

import logo from "../assets/musk.jpeg";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);
  const toggleSubmenu = () => setSubmenuOpen(!submenuOpen);

  return (
    <>
      <nav className="bg-zinc-700 p-2 sticky top-0 ">
        <div className="flex justify-between items-center">
          {user && (
            <div className="relative">
              <div className="flex p-1">
                <img
                  src={logo}
                  className="menu-item w-10 h-10 md:w-12 md:h-12 lg:w-12 lg:h-12 rounded-full cursor-pointer"
                  alt={logo}
                  onClick={toggleSubmenu}
                />
                <p className="text-zinc-200 font-semi-bold self-center px-5">
                  Hello {user.name}
                </p>
              </div>
              {submenuOpen && (
                <ul className="sub-menu absolute mt-2 rounded-md shadow-lg bg-white border-2 border-blue-500 left-0">
                  <li className="p-2">
                    <Link
                      to={`/profile/${user._id}`}
                      onClick={toggleSubmenu}
                      className="text-center flex items-center "
                    >
                      <CgProfile className="mr-1" />
                      View Profile
                    </Link>
                  </li>
                  <li className="p-2">
                    <Link
                      to="/connections"
                      onClick={toggleSubmenu}
                      className="text-center flex items-center"
                    >
                      <PiNetwork className="mr-1" />
                      Connections
                    </Link>
                  </li>
                  <li className="p-2">
                    <Link
                      to="/likes"
                      onClick={toggleSubmenu}
                      className="text-center flex items-center"
                    >
                      <FcLike className="mr-1" />
                      Wish List
                    </Link>
                  </li>
                  <li className="p-2">
                    <Link
                      to="/settings"
                      className="text-center flex items-center"
                      onClick={toggleSubmenu}
                    >
                      <IoSettingsOutline className="mr-1" />
                      Settings
                    </Link>
                  </li>

                  <li className="text-white self-center p-4">
                    <button
                      onClick={logout}
                      className="border-2 border-red-700 text-red-800 flex items-center bg-red-300 hover:bg-red-400 rounded-md p-1"
                    >
                      <AiOutlineLogout className="mr-2" /> Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
          <button className="md:hidden text-white" onClick={toggleDropdown}>
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
                    <li className="">
                      <form
                        action=""
                        method="post"
                        className="flex items-center rounded-md p-0.5 bg-white"
                      >
                        <AiOutlineSearch className="text-xl text-black" />
                        <input
                          type="text"
                          placeholder="Search by name or place"
                          className="p-1 rounded-md active:border-0"
                        />
                      </form>
                    </li>
                    <li className="text-white self-center">
                      <Link to="/" className="flex items-center">
                        <AiOutlineHome className="mr-1" /> Home
                      </Link>
                    </li>
                    <li className="text-white self-center">
                      <Link to="/posts" className="flex items-center">
                        <AiOutlineFileText className="mr-1" /> My Posts
                      </Link>
                    </li>
                    <li className="text-white self-center">
                      <Link to="/myvideo" className="flex items-center">
                        <MdOutlineOndemandVideo className="mr-1" /> My Videos
                      </Link>
                    </li>
                    <li className="text-white self-center">
                      <Link to="/videoposts" className="flex items-center">
                        <MdOutlineVideoLibrary className="mr-1" /> Videos
                      </Link>
                    </li>
                    <li className="text-white self-center">
                      <Link to="/addwork" className="flex items-center">
                        <MdWorkspacePremium className="mr-1" /> Add Work
                      </Link>
                    </li>
                  </>
                )}
                {(user.role === "admin" || user.role === "staff") && (
                  <>
                    <li className="text-white self-center">
                      <Link to="/admin" className="flex items-center">
                        <LiaUserLockSolid className="mr-1" />
                        Admin
                      </Link>
                    </li>
                    <li className="text-white self-center">
                      <Link to="/users" className="flex items-center">
                        <HiOutlineUsers className="mr-1" />
                        Users
                      </Link>
                    </li>
                    <li className="text-white self-center">
                      <Link to="/services" className="flex items-center">
                        <MdOutlineCleaningServices className="mr-1" />
                        Services
                      </Link>
                    </li>
                  </>
                )}
                <li className="text-white self-center">
                  <Link to="/addwork" className="flex items-center">
                    <BsChatSquareDots className="mr-1" /> Chat
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* mobile */}
        {dropdownOpen && (
          <div className="md:hidden">
            <div className="w-28 absolute mt-2 rounded-md shadow-lg bg-white right-0 border-2 border-blue-500">
              <ul className="flex flex-col space-y-2 mt-2">
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
                        <li className="mt-5">
                          <form
                            action=""
                            method="post"
                            className="flex items-center rounded-md bg-white"
                          >
                            <AiOutlineSearch className="text-lg" />
                            <input
                              type="text"
                              placeholder="Search by name or place"
                              className="p-1 rounded-md w-full"
                            />
                          </form>
                        </li>
                        <li className="flex justify-center p-1">
                          <Link
                            to="/"
                            className="flex items-center"
                            onClick={closeDropdown}
                          >
                            <AiOutlineHome className="mr-1" /> Home
                          </Link>
                        </li>
                        <li className="flex justify-center p-1">
                          <Link
                            to="/posts"
                            className="flex items-center"
                            onClick={closeDropdown}
                          >
                            <AiOutlineFileText className="mr-1" /> My Posts
                          </Link>
                        </li>
                        <li className="flex justify-center p-1">
                          <Link
                            to="/myvideo"
                            className="flex items-center"
                            onClick={closeDropdown}
                          >
                            <MdOutlineOndemandVideo className="mr-1" /> My Video
                          </Link>
                        </li>
                        <li className="flex justify-center p-1">
                          <Link
                            to="/videoposts"
                            className="flex items-center"
                            onClick={closeDropdown}
                          >
                            <MdOutlineVideoLibrary className="mr-1" /> Videos
                          </Link>
                        </li>

                        <li className="flex justify-center p-1">
                          <Link
                            to="/addwork"
                            className="flex items-center"
                            onClick={closeDropdown}
                          >
                            <MdWorkspacePremium className="mr-1" /> Add Work
                          </Link>
                        </li>
                      </>
                    )}
                    {(user.role === "admin" || user.role === "staff") && (
                      <>
                        <li className=" self-center">
                          <Link to="/admin" onClick={closeDropdown} className="flex items-center">
                            <LiaUserLockSolid className="mr-1" />
                            Admin
                          </Link>
                        </li>
                        <li className=" self-center">
                          <Link to="/users" onClick={closeDropdown} className="flex items-center">
                            <HiOutlineUsers className="mr-1" />
                            Users
                          </Link>
                        </li>
                        <li className="flex justify-center p-1">
                          <Link
                            to="/services"
                            onClick={closeDropdown}
                            className="flex items-center"
                          >
                            <MdOutlineCleaningServices className="mr-1" />
                            Services
                          </Link>
                        </li>
                      </>
                    )}
                    <li className="flex justify-center p-1">
                      <Link
                        to="/addwork"
                        className="flex items-center"
                        onClick={closeDropdown}
                      >
                        <BsChatSquareDots className="mr-1" /> Chat
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
