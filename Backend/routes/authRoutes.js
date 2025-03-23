const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const mailController = require('../sendMail/sendMail');
const { authenticateToken } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', authController.registerUser);
router.post('/login', authController.login);
router.post('/submit', authController.handleSubmission);

// Protected routes - require authentication
router.get('/me', authenticateToken, authController.getCurrentUser);
router.post('/send-mail', authenticateToken, mailController);

module.exports = router;
