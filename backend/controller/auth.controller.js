const Users = require('../model/user.model');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const AuthController = {};

// Check API route
AuthController.Checkapi = (req, res) => {
    res.status(200).send({
        message: 'Auth API is working'
    });
};

// Sign Up User
AuthController.SignUpUser = async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check for password and other necessary fields in the body
        const { password, email } = req.body;

        // Ensure email is not already registered (catching duplicate email error manually)
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'This email is already registered.' });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // Create new user with hashed password
        const user = new Users({ ...req.body, password: hash });
        await user.save();

        res.status(201).send({ message: 'Signup successful', status: '201' });
    } catch (error) {
        console.error('Error during signup:', error);
        
        // Handle specific MongoDB duplicate key error for unique fields like email
        if (error.code === 11000) {
            res.status(400).send({ message: 'This email is already registered' });
        } else {
            res.status(500).send({
                message: 'An error occurred during signup',
                detail: error.message,
            });
        }
    }
};

// Log In User
AuthController.LogInUser = async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Check if user exists
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found. Please signup first.' });
        }

        // Check if the password matches
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Incorrect email or password' });
        }

        // Remove password from the user object for security reasons
        user.password = undefined;

        // Generate a JWT token
        const token = jsonwebtoken.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: '2d' } // Token expires in 2 days
        );

        // Respond with success message, token, and expiration info
        res.status(201).send({
            message: 'Successfully logged in',
            token,
            expiresIn: 86400000, // 24 hours in milliseconds
            status: '201',
            role: user.role,
        });
    } catch (error) {
        console.error('Error during login:', error);

        // Handle possible errors (JWT generation issues, etc.)
        res.status(500).send({
            message: 'An error occurred during login',
            detail: error.message,
        });
    }
};

module.exports = AuthController;
