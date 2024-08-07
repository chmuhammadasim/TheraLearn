const express = require('express');
const router = express.Router();
const AuthController = require('../controller/auth.controller');
router.post("/",AuthController.checkapi);
router.post("/login",AuthController.LogInUser);
router.post("/signup",AuthController.SignUpUser);

module.exports = router;