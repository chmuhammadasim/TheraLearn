const User = require('../model/user.model');
const userController = {};
const mongoose = require("mongoose");
// API check
userController.Checkapi = (req, res) => {
  res.status(200).send({
    message: 'Auth API is working',
  });
};

// Get user by ID
userController.GetUserById = async (req, res) => {
  const id = req.userData.userId;

  try {
    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format',
      });
    }

    // Fetch the user from the database
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Respond with the user data
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user by ID:', error);

    // Handle validation or cast errors
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format',
      });
    }

    // Handle any database or server error
    if (error.name === 'MongoError') {
      return res.status(500).json({
        success: false,
        message: 'Database error occurred while fetching user',
      });
    }

    // Generic server error
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to fetch user',
      error: error.message, // Optional: include error message for debugging
    });
  }
};

module.exports = userController;
