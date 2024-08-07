const Users = require('../model/user.model');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const AuthController = {};

//////Signup in function 
AuthController.SignUpUser = async (req, res) => {
    try {
        console.log("starting signup(user.controller.js)");
        const body = req.body;
        const password = body.password;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        body.password = hash;

        const user = new Users(body);
        await user.save();
        console.log("starting ended(user.controller.js)");
        res.status(201).send({
            message: 'Signup was Successful'
        });
    } catch (error) {
        console.log("Error occured while signing up(user.controller.js)");
        console.log('Error:', error);
        if (error.code === 11000) {
            res.send({
                message: 'This email has been registered already',
            }).status(500);
        } else {
            res.send({
                message: 'Error',
                detail: error
            }).status(500);
        }
    }
};

//////Login in function 
AuthController.LogInUser = async (req, res) => {
    console.log("Starting Login(user.controller.js)");
    try {
        const body = req.body;
        const email = body.email;
        const result = await Users.findOne({ email: email });
        if (!result) {
            console.log("User doesnot exist(user.controller.js)");
            res.status(404).send({
                Error: 'This user doesnot exists. Please signup first'
            });
        } else {
            if (bcrypt.compareSync(body.password, result.password)) {
                result.password = undefined;
                const token = jsonwebtoken.sign({
                    data: result,
                    role: 'User'
                }, process.env.JWT_KEY, { expiresIn: '1d' });
                console.log("Logging in ended,Successfully Logged in (user.controller.js)");
                res.send({ message: 'Successfully Logged in', token: token, expiresIn: 86400000 });
            } else {
                console.log('password doesnot match(user.controller.js)');
                res.status(404).send({ message: 'Wrong email or Password' });
            }
        }
    } catch (error) {
        console.log("Error occured while logining in(user.controller.js)")
        console.log('Error', error);
    }
};

module.exports = AuthController;