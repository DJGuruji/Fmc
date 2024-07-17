import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./pages/Profile";

import Home from "./pages/Home";
import AddWork from "./pages/AddWork";

import Users from "./pages/admin/Users";
import Services from "./pages/admin/Services";
import Pnf from "./pages/Pnf";
import Connections from "./pages/Connections";
import Likes from "./pages/Likes";
import Admin from "./pages/admin/Admin";
import Settings from "./pages/Settings";
import ForgotPass from "./components/ForgotPass";
import PostList from "./pages/PostList";
import VideoPostList from "./pages/VideoPostList";
import MyVideo from "./pages/MyVideo";
import CreatePost from "./components/CreatePost";
import CreateVideoPost from "./components/CreateVideoPost";
import { useAuthStore } from "./store/authStore";
import Navbar from "./components/NavBar";
import UserProfileShow from "./pages/UserProfileShow";
import DeleteAcc from "./components/DeleteAcc";
import Followers from "./components/Followers";
import Following from "./components/Following";
import PasswordChange from "./components/PasswordReset";

const App = () => {
  const { user } = useAuthStore();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={user ? <Home /> : <Signup />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/forgotpass" element={user ? <Home /> : <ForgotPass />} />
        <Route path="*" element={<Pnf />} />
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route
          path="/connections"
          element={user ? <Connections /> : <Login />}
        />
        <Route path="/likes" element={user ? <Likes /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
        <Route path="/profile" element={user ? <Profile /> : <Login />} />
        <Route path="/addwork" element={user ? <AddWork /> : <Login />} />
        <Route path="/posts" element={user ? <PostList /> : <Login />} />
        <Route path="/followers/:userId" element={user ? <Followers /> : <Login />} />
        <Route path="/following/:userId" element={user ? <Following /> : <Login />} />
        <Route path="/" element={<PostList />} />
        <Route
          path="/videoposts"
          element={user ? <VideoPostList /> : <Login />}
        />
        <Route path="/myvideo" element={user ? <MyVideo /> : <Login />} />
        <Route path="/createpost" element={user ? <CreatePost /> : <Login />} />
        <Route path="/deleteacc" element={user ? <DeleteAcc /> : <Login />} />
        <Route
          path="/createvideopost"
          element={user ? <CreateVideoPost /> : <Login />}
        />
        <Route
          path="/changepass"
          element={user ? <PasswordChange /> : <Login />}
        />
        <Route
          path="/profile/:userId"
          element={user ? <UserProfileShow /> : <Login />}
        />

        {user && (user.role === "admin" || user.role === "staff") && (
          <>
            <Route path="/services" element={user ? <Services /> : <Login />} />
            <Route path="/admin" element={user ? <Admin /> : <Login />} />
            <Route path="/users" element={user ? <Users /> : <Login />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
