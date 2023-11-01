const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY; // Your JWT secret key

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token not provided' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Attach the user information to the request object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
