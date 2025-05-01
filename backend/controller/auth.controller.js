const Users = require("../model/user.model");
const { Parent, Child } = require("../model/parentchild.model");
const { Psychologist } = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const AuthController = {};

AuthController.Checkapi = (_req, res) => {
  res.status(200).send({
    message: "Auth API is working",
  });
};

AuthController.SignUpUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { password, email, children, ...parentData } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
    let existingUser;
    try {
      existingUser = await Parent.findOne({ email });
    } catch (findErr) {
      console.error("Database error during user lookup:", findErr);
      return res.status(500).json({ message: "Database error", detail: findErr.message });
    }
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This email is already registered." });
    }
    let hashedPassword;
    try {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    } catch (hashErr) {
      console.error("Error hashing password:", hashErr);
      return res.status(500).json({ message: "Password hashing failed", detail: hashErr.message });
    }
    const parent = new Parent({
      ...parentData,
      email,
      password: hashedPassword,
    });
    if (children !== undefined) {
      if (!Array.isArray(children)) {
        return res.status(400).json({ message: "Children must be an array." });
      }
      try {
        const childRecords = await Child.insertMany(
          children.map((child) => ({ ...child, parent: parent._id }))
        );
        parent.children = childRecords.map((child) => child._id);
      } catch (childErr) {
        console.error("Error inserting children:", childErr);
        return res.status(500).json({ message: "Failed to add children", detail: childErr.message });
      }
    }
    try {
      await parent.save();
    } catch (saveErr) {
      console.error("Error saving parent:", saveErr);
      return res.status(500).json({ message: "Failed to save parent", detail: saveErr.message });
    }
    res.status(201).json({ message: "Signup successful", status: "201" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({
      message: "An error occurred during signup",
      detail: error.message,
    });
  }
};


AuthController.LogInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    let user = await Parent.findOne({ email }).populate("children");
    if (user && user.role === "parent") {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password." });
      }
      try {
        const token = jsonwebtoken.sign(
          {
            id: user._id,
            email: user.email,
            children: user.children
              ? user.children.map((child) => child._id)
              : [],
            role: user.role,
          },
          process.env.JWT_KEY,
          { expiresIn: "2d" }
        );
        return res.status(200).json({
          message: "Login successful",
          token,
          children: user.children,
          parent: user._id,
          role: user.role,
          assignedDoctor: user.assignedDoctor,
        });
      } catch (jwtErr) {
        console.error("JWT error:", jwtErr);
        return res
          .status(500)
          .json({ message: "Token generation failed", detail: jwtErr.message });
      }
    }
    user = await Psychologist.findOne({ email });
    if (user && (user.role === "psychologist" || user.role === "admin")) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password." });
      }
      try {
        const token = jsonwebtoken.sign(
          { id: user._id, email: user.email, role: user.role },
          process.env.JWT_KEY,
          { expiresIn: "2d" }
        );
        return res.status(200).json({
          message: "Login successful",
          token,
          role: user.role,
        });
      } catch (jwtErr) {
        console.error("JWT error:", jwtErr);
        return res
          .status(500)
          .json({ message: "Token generation failed", detail: jwtErr.message });
      }
    }
    return res.status(400).json({ message: "Invalid email or password." });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      message: "An error occurred during login",
      detail: error.message,
    });
  }
};

module.exports = AuthController;
