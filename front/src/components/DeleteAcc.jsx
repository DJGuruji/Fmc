import React, { useState } from 'react';
import axios from '../axios'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../store/authStore";

const DeleteAcc = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { logout } = useAuthStore();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [deleting, setDeleting] = useState(false); 

  const handleDeleteAccount = async () => {
    try {
      setDeleting(true); 

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post(`users/deleteacc/${user._id}`, { password }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Account deleted successfully:', response.data);
      toast.success('Account deleted successfully');
      logout(); 
      navigate("/login"); 
    } catch (error) {
      toast.error('Error deleting account');
      console.error('Error deleting account:', error);
    } finally {
      setDeleting(false); 
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      setPasswordMatch(true);
      handleDeleteAccount();
    } else {
      setPasswordMatch(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <div className="md:w-1/2 lg:w-1/2 xl:w-1/2 w-3/4  mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Delete Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Enter your password to confirm:</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Enter Password'
            />
          </div>
          {!passwordMatch && <p className="text-red-500 text-sm mb-4">Passwords do not match!</p>}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder='Confirm Password'
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
            disabled={deleting} // Disable button while deleting
          >
            {deleting ? 'Deleting Account...' : 'Delete Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteAcc;
