const User = require("../models/User");
const jwt = require("jsonwebtoken");


// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };




const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve users' });
    }
  };

  const deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      await user.deleteOne(); 
      res.json({ message: "User removed" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Failed to delete user" });
    }
  };



  
  // Controller function to promote user role
  const promoteUserRole = async (req, res) => {
    const { userId, role } = req.body;
  
    try {
      const user = await User.findById(req.params.userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update the user role
      user.role = role;
      await user.save();
  
      res.json({ message: `User role updated to ${role}` });
    } catch (error) {
      console.error("Error promoting user role:", error);
      res.status(500).json({ message: "Failed to promote user role" });
    }
  };

  const getProfileById = async (req, res) => {
    const userId = req.params.userId; // Assuming ID is passed as a route parameter
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Modify the response as per your requirement
      res.status(200).json(user);
    } catch (err) {
      console.error('Error retrieving user:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };

  module.exports = {

    getAllUsers,
    deleteUser,
    promoteUserRole,
    getProfileById
  };