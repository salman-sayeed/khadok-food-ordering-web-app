const express = require('express');
const router = express.Router();
const { getAllFood, getFoodById, createFood, updateFood, deleteFood } = require('../controllers/foodController');
const { protect, adminOnly } = require('../middleware/auth');

// Public routes
router.get('/', getAllFood);
router.get('/:id', getFoodById);

// Admin only routes
router.post('/', protect, adminOnly, createFood);
router.put('/:id', protect, adminOnly, updateFood);
router.delete('/:id', protect, adminOnly, deleteFood);

module.exports = router;