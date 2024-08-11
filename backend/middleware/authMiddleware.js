const admin = (req, res, next) => {
    if (user.role === 'admin') {
      next();
    } else {
      res.status(403);
       throw new Error('Not authorized as an admin');
    }
  };
  const user = (req, res, next) => {
    if (user.role === 'user') {
      next();
    } else {
      res.status(403);
       throw new Error('Not authorized as an User');
    }
  };
  module.exports = {  admin,user };  