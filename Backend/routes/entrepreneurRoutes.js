const express = require('express');
const router = express.Router();
const entrepreneurController = require('../controllers/entrepreneurController');
const { authenticateToken, authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/', entrepreneurController.getAllEntrepreneurs);
router.get('/search/field/:field', entrepreneurController.searchEntrepreneursByField);
router.get('/:id', entrepreneurController.getEntrepreneurById);

// Protected routes - require authentication
router.post('/', authenticateToken, entrepreneurController.createEntrepreneur);
router.put('/:id', authenticateToken, authorize('entrepreneur', 'admin'), entrepreneurController.updateEntrepreneur);
router.delete('/:id', authenticateToken, authorize('admin'), entrepreneurController.deleteEntrepreneur);

module.exports = router;
