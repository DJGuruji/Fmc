const express = require("express");
const {
  updateUserProfile,
  deleteAccount,
  userSearch
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.put("/profile/:userId", protect, updateUserProfile);
router.post("/deleteacc/:userId", protect, deleteAccount);

router.get("/search", protect, userSearch);
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
