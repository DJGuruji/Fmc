import React, { useState } from 'react';
import { AiOutlineUser, AiOutlinePhone, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, mobile, email, password, confirmPassword } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await axios.post('/auth/register', formData);
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="bg-slate-100 flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <AiOutlineUser className="text-gray-600 mr-2" />
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required
              className="w-full outline-none"
              placeholder="Enter your name"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="mobile">Mobile</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <AiOutlinePhone className="text-gray-600 mr-2" />
            <input
              type="text"
              name="mobile"
              value={mobile}
              onChange={onChange}
              required
              className="w-full outline-none"
              placeholder="Enter your mobile number"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <AiOutlineMail className="text-gray-600 mr-2" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="w-full outline-none"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <AiOutlineLock className="text-gray-600 mr-2" />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="w-full outline-none"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">Confirm Password</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <AiOutlineLock className="text-gray-600 mr-2" />
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              required
              className="w-full outline-none"
              placeholder="Confirm your password"
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">Signup</button>
        <p className="ml-7 lg:ml-9 xl:ml-9 mt-5 ">
          Already Have An Account ?{" "}
          <a
            onClick={() => navigate("/login")}
            className="text-blue-700 hover:underline hover:text-green-700 "
          >
            Login{" "}
          </a>
          here.
        </p>
      </form>
  
    </div>
  );
};

export default Signup;
