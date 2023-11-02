const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY; // Your JWT secret key

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7, authHeader.length); // Remove "Bearer " from beginning
        try {
            const decoded = jwt.verify(token, secretKey);
            req.user = decoded; // Attach the user information to the request object
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        return res.status(401).json({ message: 'Access denied. No token provided' });
    }
};

module.exports = authMiddleware;
