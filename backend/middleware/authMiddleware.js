const admin = (req, res, next) => {
    if (req.userData.role === 'admin') {
      next();
    } else {
      res.status(403);
       throw new Error('Not authorized as an admin');
    }
  };
  const superadmin = (req, res, next) => {
    if (req.userData.role === 'superadmin') {
      next();
    } else {
      res.status(403);
       throw new Error('Not authorized as an superadmin');
    }
  };
  const user = (req, res, next) => {
    if (req.userData.role === 'user') {
      next();
    } else {
      res.status(403);
       throw new Error('Not authorized as an User');
    }
  };
  module.exports = {  admin,user,superadmin };  