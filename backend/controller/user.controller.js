const User = require("../model/user.model");
const {Parent, Child} = require("../model/parentchild.model");
const userController = {};
const mongoose = require("mongoose");
userController.Checkapi = (req, res) => {
  res.status(200).send({
    message: "Auth API is working",
  });
};
userController.GetUserById = async (req, res) => {
  console.log(req.userData);
  
  const id = req.userData.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const parent = await Parent.findById(id)
      .populate({
        path: 'children',
        model: 'Child',
        populate: {
          path: 'games',
          model: 'Game' // Fetch game details using game IDs from children
        }
      })
      .lean();

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: "Parent not found",
      });
    }
    
    console.log("Parent:", parent);
    
    res.status(200).json({
      success: true,
      data: parent,
    });
  } catch (error) {
    console.error("Error fetching parent by ID:", error);

    res.status(500).json({
      success: false,
      message: "Server error: Unable to fetch user",
      error: error.message,
    });
  }
};


userController.UpdateUserById = async (req, res) => {
  console.log("Update Request:", req.userData);

  const id = req.userData.id;
  const updateData = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    // Find and update the user
    const updatedUser = await Parent.findByIdAndUpdate(
      id,
      { $set: updateData }, // Update only provided fields
      { new: true, runValidators: true }
    ).populate("children");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);

    res.status(500).json({
      success: false,
      message: "Server error: Unable to update user",
      error: error.message,
    });
  }
};
module.exports = userController;