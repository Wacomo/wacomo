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
            hashedPassword: hashPassword, 
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

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.user_id }, secretKey, { expiresIn: '1h' });

        res.json({
            message: 'User logged in successfully',
            token: token,
        });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await db.User.findByPk(req.user.userId, {
            attributes: { exclude: ['hashedPassword'] } // Exclude the password from the result
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error getting current user:', error);
        res.status(500).json({ message: 'Failed to get user details', error: error.message });
    }
};

const changePassword = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { oldPassword, newPassword } = req.body;

    try {
        const user = await db.User.findByPk(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.hashedPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Old password does not match' });
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        user.hashedPassword = newHashedPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Failed to change password', error: error.message });
    }
};

const editProfile = async (req, res) => {
    const { username, email } = req.body;

    try {
        const user = await db.User.findByPk(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (username && username !== user.username) {
            user.username = username;
        }

        if (email && email !== user.email) {
            user.email = email;
        }

        await user.save();

        res.json({ message: 'Profile updated successfully', user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Failed to update profile', error: error.message });
    }
};




module.exports = {
    signup,
    login,
    getCurrentUser,
    changePassword,
    editProfile,
};
