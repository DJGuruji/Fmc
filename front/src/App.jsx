import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./pages/Profile";

import Home from "./pages/Home";
import AddWork from "./pages/AddWork";
import Posts from "./pages/Posts";
import Services from "./pages/Services";
import Pnf from "./pages/Pnf";
import Connections from "./pages/Connections";
import Likes from "./pages/Likes";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";
import ForgotPass from "./components/ForgotPass";

import { useAuthStore } from "./store/authStore";
import Navbar from "./components/NavBar";

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
        <Route path="/posts" element={user ? <Posts /> : <Login />} />
        {user && (user.role === "admin" || user.role === "staff") && (
          <>
            <Route path="/services" element={user ? <Services /> : <Login />} />
            <Route path="/admin" element={user ? <Admin /> : <Login />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
