const express = require('express');
const { registerUser, loginUser, updateUserProfile, forgotPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
// const authorizeRoles = require('../middleware/authorizeRole');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', protect, updateUserProfile);
router.post('/forgotpassword', forgotPassword);

// router.get('/admin', protect, authorizeRoles('admin', 'staff'), (req, res) => {
//     res.send('This is an admin or staff route.');
// });

module.exports = router;
