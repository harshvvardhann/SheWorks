const express = require('express');
const router = express.Router();
const investorController = require('../controllers/investorController');
const { authenticateToken, authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/', investorController.getAllInvestors);
router.get('/:id', investorController.getInvestorById);
router.get('/search/category/:category', investorController.searchInvestorsByCategory);

// Protected routes - require authentication
router.post('/', authenticateToken, investorController.createInvestor);
router.put('/:id', authenticateToken, authorize('investor', 'admin'), investorController.updateInvestor);
router.delete('/:id', authenticateToken, authorize('admin'), investorController.deleteInvestor);

module.exports = router;