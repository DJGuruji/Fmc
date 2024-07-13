const express = require("express");
const {
  registerUser,
  loginUser,
  updateUserProfile,
  forgotPassword,
 
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile/:userId", protect, updateUserProfile);
router.post("/forgotpassword", forgotPassword);

router.get("/profile", protect, (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    mobile: req.user.mobile,
    photo: req.user.photo,
    state: req.user.state,
    job: req.user.job,
    district: req.user.district,
    office: req.user.office,
    officePlace: req.user.officePlace,
  });
});



module.exports = router;
