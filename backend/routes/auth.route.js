const express = require("express");
const router = express.Router();
const AuthController = require("../controller/auth.controller");
router.get("/", AuthController.Checkapi);
router.post("/login", AuthController.LogInUser);
router.post("/signup", AuthController.SignUpUser);
router.post("/forgetpassword", AuthController.ForgotPassword);

module.exports = router;
