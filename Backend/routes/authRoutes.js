const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', authController.registerUser);
router.post('/login', authController.login);
router.post('/submit', authController.handleSubmission);

// Protected routes - require authentication
router.get('/me', authenticateToken, authController.getCurrentUser);

module.exports = router;
