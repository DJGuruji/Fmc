const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const bcrypt = require('bcrypt');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5000000 },
//   fileFilter: function (req, file, cb) {
//     const filetypes = /jpeg|jpg|png/;
//     const extname = filetypes.test(
//       path.extname(file.originalname).toLowerCase()
//     );
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb("Error: Images only!");
//     }
//   },
// }).single("profileImage");



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
  const { identifier, password } = req.body;

  try {
    // Check if the identifier is an email or username
    const user = await User.findOne({
      $or: [{ email: identifier.toLowerCase() }, { name: identifier.toLowerCase() }],
    });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email/username or password" });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
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

  // const resetUrl = `API/auth/passwordreset/${resetToken}`;
  const resetUrl = `api/auth/passwordreset/${resetToken}`;

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




const resetPassword =  async (req, res) => {
  const { currentPassword, newPassword } = req.body;


  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(newPassword, salt);

    // user.password = hashedPassword;
    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Server error' });
  }
};





module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
