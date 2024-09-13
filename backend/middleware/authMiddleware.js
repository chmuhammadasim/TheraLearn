const admin = (req, res, next) => {
    if (req.userData.role === 'admin') {
      next();
    } else {
      res.status(403);
       throw new Error('Not authorized as an admin');
    }
  };

  const psychologist = (req, res, next) => {
    if (req.userData.role === 'psychologist') {
      next();
    } else {
      res.status(403);
       throw new Error('Not authorized as an psychologist');
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

  const userpsychologistadmin = (req, res, next) => {
    if (req.userData.role === 'user' || req.userData.role === 'psychologist' || req.userData.role === 'admin') {
      next();
    } else {
      res.status(403);
       throw new Error('Not authorized as an ');
    }
  };
  const psychologistadmin = (req, res, next) => {
    if ( req.userData.role === 'psychologist' || req.userData.role === 'admin') {
      next();
    } else {
      res.status(403);
       throw new Error('Not authorized as an psychologistadmin ');
    }
  };
  
  module.exports = {  admin,user,psychologist,userpsychologistadmin,psychologistadmin };  