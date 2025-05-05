const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  let token;  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
      }
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.userData = decoded;
    
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
};