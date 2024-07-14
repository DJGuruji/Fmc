const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images only!");
    }
  },
}).single("postImage");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};




// const updateUserProfile = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       // A Multer error occurred when uploading
//       console.error("Multer error:", err);
//       return res.status(400).json({ message: "Error uploading file", error: err });
//     }

//     if (!req.file) {
     
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     try {
//       const user = await User.findById(req.params.userId);
//       console.log(req.file.path);

//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       console.log("Incoming request data:", req.body);

//       user.name = req.body.name ?? user.name;
//       user.mobile = req.body.mobile ?? user.mobile;
//       user.email = req.body.email ?? user.email;
//       user.photo = req.file.path ?? user.photo; 
//       user.state = req.body.state ?? user.state;
//       user.job = req.body.job ?? user.job;
//       user.district = req.body.district ?? user.district;
//       user.office = req.body.office ?? user.office;
//       user.officePlace = req.body.officePlace ?? user.officePlace;

//       console.log("Updated user data:", user);

//       const updatedUser = await user.save();

//       return res.json({
//         _id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         mobile: updatedUser.mobile,
//         photo: updatedUser.photo,
//         state: updatedUser.state,
//         job: updatedUser.job,
//         district: updatedUser.district,
//         office: updatedUser.office,
//         officePlace: updatedUser.officePlace,
//         role: updatedUser.role,
//         token: generateToken(updatedUser._id), // Ensure this function is secure
//       });
//     } catch (error) {
//       console.error("Error updating user profile:", error);
//       return res.status(500).json({ message: "Failed to update profile", error });
//     }
//   });
// };


const updateUserProfile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      // A Multer error occurred when uploading
      console.error("Multer error:", err);
      return res.status(400).json({ message: "Error uploading file", error: err });
    }

    try {
      const user = await User.findById(req.params.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update user data based on request body
      user.name = req.body.name ?? user.name;
      user.mobile = req.body.mobile ?? user.mobile;
      user.email = req.body.email ?? user.email;
      
      // Check if photo was uploaded; if not, retain the existing photo
      if (req.file) {
        user.photo = req.file.path;
      }

      user.state = req.body.state ?? user.state;
      user.job = req.body.job ?? user.job;
      user.district = req.body.district ?? user.district;
      user.office = req.body.office ?? user.office;
      user.officePlace = req.body.officePlace ?? user.officePlace;

      const updatedUser = await user.save();

      return res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        mobile: updatedUser.mobile,
        photo: updatedUser.photo, // Return the updated photo path
        state: updatedUser.state,
        job: updatedUser.job,
        district: updatedUser.district,
        office: updatedUser.office,
        officePlace: updatedUser.officePlace,
        role: updatedUser.role,
        token: generateToken(updatedUser._id), // Ensure this function is secure
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
      return res.status(500).json({ message: "Failed to update profile", error });
    }
  });
};




const deleteAccount = async (req, res) => {
  const { password } = req.body;

  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Delete user
    await user.deleteOne();

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const userSearch = async (req, res) => {
  const { query } = req.query;

  try {
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { officePlace: { $regex: query, $options: "i" } },
        { district: { $regex: query, $options: "i" } },
        { state: { $regex: query, $options: "i" } },
      ],
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  updateUserProfile,

  deleteAccount,
  userSearch,
};
