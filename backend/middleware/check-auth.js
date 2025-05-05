const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authentication failed: No authorization header' });
    }
    if (!req.headers.authorization.startsWith('Bearer')) {
      return res.status(401).json({ message: 'Authentication failed: Invalid format, expected Bearer token' });
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(401).json({ message: 'Authentication failed: Invalid token' });
    }
    req.userData = decoded;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Authentication failed: Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Authentication failed: Token expired' });
    } else {
      return res.status(500).json({ message: 'Internal server error during authentication' });
    }
  }
};