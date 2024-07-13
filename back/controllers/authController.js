const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");

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
}).single("profileImage");



const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = async (req, res) => {
  const { name, mobile, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    mobile,
    email,
    password,
    role: role || "user",
  });

  if (user) {
    const transporter = nodemailer.createTransport({
      // host: process.env.SMTP_HOST,
      // port: process.env.SMTP_PORT,
      // auth: {
      //   user: process.env.SMTP_USER,
      //   pass: process.env.SMTP_PASS,
      // },
      host: "localhost",
      port: 1025,
      secure: false,
    });

    const message = {
      from: `nath93266@gmail.com`,
      to: user.email,
      subject: "Welcome to our App",
      text: "Thank you for registering!",
    };

    transporter.sendMail(message);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};


const updateUserProfile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log("eroor in uploading");
      return res.status(400).json({ message: err });
      
    }

    try {
      const user = await User.findById(req.params.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      console.log("Incoming request data:", req.body);

      // Update user fields if provided in the request body
      user.name = req.body.name ?? user.name;
      user.mobile = req.body.mobile ?? user.mobile;
      user.email = req.body.email ?? user.email;
      user.photo = req.file ? req.file.path : user.photo; // Save the file path
      user.state = req.body.state ?? user.state;
      user.job = req.body.job ?? user.job;
      user.district = req.body.district ?? user.district;
      user.office = req.body.office ?? user.office;
      user.officePlace = req.body.officePlace ?? user.officePlace;

      console.log("Updated user data:", user);

      const updatedUser = await user.save();

      return res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        mobile: updatedUser.mobile,
        photo: updatedUser.photo,
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
      res.status(500).json({ message: "Failed to update profile" });
    }
  });
};



const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const resetToken = generateToken(user._id);
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  await user.save();

  const resetUrl = `API/auth/passwordreset/${resetToken}`;

  const message = `
    <h1>You have requested a password reset</h1>
    <p>Please go to this link to reset your password</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
  `;

  try {
    const transporter = nodemailer.createTransport({
      // host: process.env.SMTP_HOST,
      // port: process.env.SMTP_PORT,
      // auth: {
      //   user: process.env.SMTP_USER,
      //   pass: process.env.SMTP_PASS,
      // },
      host: "localhost",
      port: 1025,
      secure: false,
    });

    const mailOptions = {
      from: "nath93266@gmail.com",
      to: user.email,
      subject: "Password Reset Request",
      html: message,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(500).json({ message: "Email could not be sent" });
  }
};


module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  forgotPassword,

};
