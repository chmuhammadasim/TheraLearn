const Users = require("../model/user.model");
const {Parent,Child} = require("../model/parentchild.model");
const Psychologist = require("../model/user.model");
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

      const existingUser = await Parent.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'This email is already registered.' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create parent user
      const parent = new Parent({
          ...parentData,
          email,
          password: hashedPassword,
      });

      // Create children and associate them with the parent
      if (children && Array.isArray(children)) {
          const childRecords = await Child.insertMany(
              children.map(child => ({ ...child, parent: parent._id }))
          );
          parent.children = childRecords.map(child => child._id);
      }

      await parent.save();

      res.status(201).json({ message: 'Signup successful',status: "201" });
  } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'An error occurred during signup', detail: error.message });
  }
};


AuthController.LogInUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        var user = await Parent.findOne({ email });
        
        if(user && user.role == "parent"){
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password.' });
            }else{
                 user = await Parent.findOne({ email }).populate('children');  
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password.' });
            }
            const token = jsonwebtoken.sign(
                { id: user._id, email: user.email, children: user.children.map(child => child._id), role: user.role },
                process.env.JWT_KEY,
                { expiresIn: '2d' }
            );
            res.status(200).json({ 
                message: 'Login successful', 
                token, 
                children: user.children,
                parent: user._id, 
                role: user.role
            });
        }

        var user = await Psychologist.findOne({ email });
        console.log(user);
        if(user && user.role == "psychologist"){    
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password.' });
            }else{
                 user = await Psychologist.findOne({ email });  
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password.' });
            }
            const token = jsonwebtoken.sign(
                { id: user._id, email: user.email, role: user.role },
                process.env.JWT_KEY,
                { expiresIn: '2d' }
            );
            res.status(200).json({ 
                message: 'Login successful', 
                token, 
                role: user.role
            });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred during login', detail: error.message });
    }
};

module.exports = AuthController;
