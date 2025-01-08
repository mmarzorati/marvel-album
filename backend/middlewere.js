const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    if (!req.cookies || !req.cookies.token) {
        return res.status(401).json({ message: 'Access denied: token error' });
    }
    const token = req.cookies.token;

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); // passo al prossimo middleware o route handler
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;