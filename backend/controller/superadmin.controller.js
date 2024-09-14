const adminController = {};
const User = require('../model/user.model');

adminController.Checkapi = (req, res) => {
  res.status(200).send({
    message: 'Auth API is working'
  });
};

// Controller to get all users and their data
adminController.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    if (!users || users.length === 0) {
      return res.status(404).send({
        message: 'No users found'
      });
    }
    res.status(200).json(users);
  } catch (error) {
    if (error.name === 'MongoNetworkError') {
      return res.status(503).send({
        message: 'Database connection error. Please try again later.',
      });
    }

    if (error.name === 'CastError' || error.name === 'ValidationError') {
      return res.status(400).send({
        message: 'Invalid request data. Please check your input and try again.',
        error: error.message,
      });
    }
    return res.status(500).send({
      message: 'An unexpected error occurred while fetching users',
      error: error.message,
    });
  }
};
adminController.updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's status
    user.isActive = isActive;
    await user.save();

    res.status(200).json({
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user,
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = adminController;
