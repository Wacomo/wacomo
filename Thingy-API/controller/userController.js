const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const secretKey = process.env.JWT_SECRET_KEY;

const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Return a 400 status code for a bad request
        return res.status(400).json({ message: 'Bad request', errors: errors.array() });
    }

    const { username, email, hashedPassword } = req.body;

    try {
        const hashPassword = await bcrypt.hash(hashedPassword, 10);

        const newUser = await db.User.create({
            username: username,
            email : email,
            hashedPassword: hashPassword, // Ensure you use the correct field name
        });

        const token = jwt.sign({ userId: newUser.id }, secretKey, { expiresIn: '1h' });

        res.status(201).json({
            message: 'User created successfully',
            userId: newUser.id,
            token: token,
        });
    } catch (error) {
        // Log the error for debugging
        console.error('Error in signup:', error);

        // Return a 500 status code for an internal server error
        res.status(500).json({ message: 'User registration failed', error: error.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userProfile = await db.UserProfile.findOne({ where: { userId: req.user.userId } });
        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }

        res.status(200).json({ message: 'User profile retrieved successfully', userProfile });
    } catch (error) {
        console.error('Error in getUserProfile:', error);
        res.status(500).json({ message: 'Failed to retrieve user profile', error: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    // Implement logic to update the user's profile, e.g., in your database
    try {
        // Replace this with your actual logic to update the user's profile
        const userId = req.user.userId;
        const updatedData = req.body; // Data to update

        // Use Sequelize's update function to update the user's profile
        await db.UserProfile.update(updatedData, { where: { userId } });

        res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
        console.error('Error in updateUserProfile:', error);
        res.status(500).json({ message: 'Failed to update user profile', error: error.message });
    }
};

module.exports = {
    signup,
    getUserProfile,
    updateUserProfile, 
};
