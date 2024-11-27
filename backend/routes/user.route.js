const express = require("express");
const { userpsychologistadmin } = require("../middleware/authMiddleware");
const checkAuth = require("../middleware/check-auth");
const userController = require("../controller/user.controller");
const router = express.Router();

router.get("/", userController.Checkapi);
router.get(
  "/byid",
  checkAuth,
  userpsychologistadmin,
  userController.GetUserById
);

module.exports = router;
