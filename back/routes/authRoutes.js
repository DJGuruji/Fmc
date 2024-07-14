const express = require("express");
const {
  registerUser,
  loginUser,

  forgotPassword,

  resetPassword,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/forgotpassword", forgotPassword);

router.post("/reset-password/:userId", protect, resetPassword);

module.exports = router;
