const express = require('express');
const router = express.Router();
const userController = require('../controller/userController'); 
const authMiddleware = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');
const { validatePasswordChange } = require('../middleware/validators/passwordValidator');
const { validateUserRegisteration } = require('../middleware/validators/signupValidator');

// User sign-up route
router.post('/signup', [...validateUserRegisteration], userController.signup);

// User login route
router.post('/login', userController.login);

// Fetch current user route
router.get('/me', authMiddleware, userController.getCurrentUser);

// User password change route
router.post('/change-password', [authMiddleware, ...validatePasswordChange], userController.changePassword);

// User profile edit route
router.put('/edit-profile', authMiddleware, userController.editProfile);


module.exports = router;
