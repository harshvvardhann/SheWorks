const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { getDb, collections } = require('../config/db');

// Middleware to verify JWT token - remains mostly the same
const authenticateToken = async (req, res, next) => {
    // Get token from header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN format

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Get user from DB (optional - to check if user still exists)
        console.log(decoded);

        const db = getDb();
        const user = await db.collection(collections.users).findOne({ _id: new ObjectId(decoded.userId) });

        if (!user) {
            return res.status(401).json({ message: 'Invalid token. User not found.' });
        }

        // Add user info to request
        req.user = {
            userId: decoded.userId,
            role: decoded.role,
            email: decoded.email,
        };

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

// Role-based authorization middleware - updated to use Role enum
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }

        next();
    };
};

module.exports = {
    authenticateToken,
    authorize,
};
