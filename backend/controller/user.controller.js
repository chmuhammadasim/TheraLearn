const User = require("../model/user.model");
const userController = {};
const mongoose = require("mongoose");
userController.Checkapi = (req, res) => {
  res.status(200).send({
    message: "Auth API is working",
  });
};
userController.GetUserById = async (req, res) => {
  const id = req.userData.userId;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }
    if (error.name === "MongoError") {
      return res.status(500).json({
        success: false,
        message: "Database error occurred while fetching user",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error: Unable to fetch user",
      error: error.message,
    });
  }
};
module.exports = userController;