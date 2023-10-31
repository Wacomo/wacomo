const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');

// User sign-up route
router.post('/signup', [
    check('username').not().isEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.signup);

// Test GET route
router.get('/test', (req, res) => {
    res.json({ message: 'GET request test successful' });
});


// Get user profile route (protected)
router.get('/profile', authMiddleware, userController.getUserProfile);

// Update user profile route (protected)
router.put('/profile', authMiddleware, userController.updateUserProfile);

// Other user-related routes (if needed)

module.exports = router;
