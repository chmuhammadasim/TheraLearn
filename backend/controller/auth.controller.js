const Users = require('../model/user.model');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const AuthController = {};

AuthController.Checkapi = (req, res) => {
    res.status(200).send({
        message: 'Auth API is working'
    });
};

// Signup function
AuthController.SignUpUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = new Users({ ...req.body, password: hash });
        await user.save();
        res.status(201).send({ message: 'Signup was successful' });
    } catch (error) {
        console.error('Error during signup:', error);
        if (error.code === 11000) {
            res.status(400).send({ message: 'This email has already been registered' });
        } else {
            res.status(500).send({
                message: 'An error occurred during signup',
                detail: error.message
            });
        }
    }
};

// Login function
AuthController.LogInUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found. Please signup first.' });
        }
        const isMatch = bcrypt.compareSync(password, user.password);

        if (isMatch) {
            user.password = undefined;
            const token = jsonwebtoken.sign(
                { userId: user._id, role: user.role },
                process.env.JWT_KEY,
                { expiresIn: '1d' }
            );

            res.send({
                message: 'Successfully logged in',
                token,
                expiresIn: 86400000
            });
        } else {
            res.status(400).send({ message: 'Incorrect email or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({
            message: 'An error occurred during login',
            detail: error.message
        });
    }
};

module.exports = AuthController;