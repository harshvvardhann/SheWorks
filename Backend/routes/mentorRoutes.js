const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');
const { authenticateToken, authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/', mentorController.getAllMentors);
router.get('/:id', mentorController.getMentorById);
router.get('/free', mentorController.getFreeMentors);

// Protected routes - require authentication
router.post('/', authenticateToken, mentorController.createMentor);
router.put('/:id', authenticateToken, authorize('mentor', 'admin'), mentorController.updateMentor);
router.delete('/:id', authenticateToken, authorize('admin'), mentorController.deleteMentor);

module.exports = router;
