const express = require("express");
const {
  registerUser,
  loginUser,

  forgotPassword,
  verifyEmail,
  resetPassword,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/verify-email/:token', verifyEmail)
router.post("/forgotpassword", forgotPassword);

router.post("/reset-password/:userId", protect, resetPassword);

module.exports = router;
