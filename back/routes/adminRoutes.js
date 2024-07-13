const express = require("express");
const {
  getAllUsers,
  deleteUser,
  promoteUserRole,
  getProfileById
} = require("../controllers/adminController.js");
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRole");
const router = express.Router();

router.get("/users", protect, authorizeRoles("admin", "staff"), getAllUsers);
router.delete(
  "/deleteuser/:userId",
  protect,
  authorizeRoles("admin", "staff"),
  deleteUser
);
router.put(
  "/promoteuser/:userId",
  protect,
  authorizeRoles("admin", "staff"),
  promoteUserRole
);
router.get(
  "/profile/:userId",
  protect,
  getProfileById
);

module.exports = router;
