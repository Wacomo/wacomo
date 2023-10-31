const bcrypt = require('bcrypt');
const db = require('../db/db');
const { validationResult } = require('express-validator');
const hash = require('../utils/hash');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

// User sign-up route
const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    const hashedPassword = await hash.hashPassword(password);

    try {
        const newUser = await db.one(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
            [username, email, hashedPassword]
        );

        const token = jwt.sign({ userId: newUser.id }, secretKey, { expiresIn: '1h' });

        res.status(201).json({
            message: 'User created successfully',
            userId: newUser.id,
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: 'User registration failed', error: error.message });
    }
};

// Get user profile by user ID
const getUserProfile = async (req, res) => {
    const userId = req.user.userId; // Extract the user ID from the JWT token
    try {
        const user = await db.one('SELECT username, email FROM users WHERE id = $1', [userId]);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
};

// Update user profile by user ID
const updateUserProfile = async (req, res) => {
    const userId = req.user.userId; // Extract the user ID from the JWT token
    const { username, email } = req.body;

    try {
        // Update user profile information in the database
        await db.none('UPDATE users SET username = $1, email = $2 WHERE id = $3', [username, email, userId]);
        res.json({ message: 'User profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
};

// Other user-related functions

module.exports = {
    signup,
    getUserProfile,
    updateUserProfile,
    // Other user-related functions
};
