const User = require('../model/user.model');
const userController = {};
userController.Checkapi = (req, res) => {
  res.status(200).send({
      message: 'Auth API is working'
  });
};

userController.GetUserById  = async (req, res) => {
  
    const id = req.userData.userId;
  
    try {
      const user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
  
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      if (error.name === 'CastError') {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID format'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Server Error: Unable to fetch user'
      });
    }
  };
  
module.exports = userController;
