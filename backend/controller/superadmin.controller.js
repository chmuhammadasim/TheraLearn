const adminController = {};
const User = require("../model/user.model");
adminController.Checkapi = (req, res) => {
  res.status(200).send({
    message: "Auth API is working",
  });
};

const {Parent, Child} = require("../model/parentchild.model");
const Psychologist = require("../model/user.model");


adminController.getAllUsers = async (req, res) => {
  try {

    // Fetch all parents separately with children data
    const parents = await Parent.find({})
      .populate("children", "firstName lastName dateOfBirth gender school grade")
      .select("-password");

    // Fetch all children separately with parent data
    const children = await Child.find({})
      .populate("parent", "firstName lastName contact email")
      .populate("assignedDoctor", "firstName lastName contact email")
      .select("-password");

    // Fetch all psychologists with their patients
    const psychologists = await Psychologist.find({})
      .populate("patients", "firstName lastName dateOfBirth")
      .populate("messages", "from to message sentAt")
      .select("-password");

    if (!parents.length && !children.length && !psychologists.length) {
      return res.status(404).json({ message: "No users found" });
    }

    console.log("Parents:", parents);
    console.log("Children:", children);
    console.log("Psychologists:", psychologists);
    
    res.status(200).json({
      totalParents: parents.length,
      totalChildren: children.length,
      totalPsychologists: psychologists.length,
      parents,
      children,
      psychologists,
    });


  } catch (error) {
    console.error("Error fetching users:", error);

    if (error.name === "MongoNetworkError") {
      return res.status(503).json({ message: "Database connection error. Please try again later." });
    }

    if (error.name === "CastError" || error.name === "ValidationError") {
      return res.status(400).json({
        message: "Invalid request data. Please check your input and try again.",
        error: error.message,
      });
    }

    res.status(500).json({
      message: "An unexpected error occurred while fetching users",
      error: error.message,
    });
  }
};

adminController.updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isActive = isActive;
    await user.save();
    res.status(200).json({
      message: `User ${isActive ? "activated" : "deactivated"} successfully`,
      user,
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
adminController.addPsychologist = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      role,
      firstName,
      lastName,
      profilePictureUrl,
      contact,
      address,
      city,
      country,
      dateOfBirth,
      bio,
      education,
      experience,
      specialization,
      therapyMethods,
      certifications,
      availability,
      consultationFee
    } = req.body;

    const psychologist = new Psychologist({
      username,
      email,
      password,
      role,
      firstName,
      lastName,
      profilePictureUrl,
      contact,
      address,
      city,
      country,
      dateOfBirth,
      bio,
      education,
      experience,
      specialization,
      therapyMethods,
      certifications,
      availability,
      consultationFee
    });

    await Psychologist.save();
    res.status(201).json({ message: "Psychologist added successfully", psychologist });
  } catch (error) {
    console.error("Error adding psychologist:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = adminController;
