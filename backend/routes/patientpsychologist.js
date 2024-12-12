const express = require("express");
const { psychologist } = require("../middleware/authMiddleware");
const checkAuth = require("../middleware/check-auth");
const userController = require("../controller/user.controller");
const router = express.Router();

router.get("/", userController.Checkapi);
router.get(
  "/getAllPsychologists",
  checkAuth,
  psychologist,
  userController.GetUserById
);
router.get(
    "/getbyid",
    checkAuth,
    psychologist,
    userController.GetUserById
  );
  router.get(
    "/patients",
    checkAuth,
    psychologist,
    userController.GetUserById
  );
  router.post(
    "/messages",
    checkAuth,
    psychologist,
    userController.GetUserById
  );
  router.post(
    "/assign",
    checkAuth,
    psychologist,
    userController.GetUserById
  );
  router.get(
    "/questionnaire",
    checkAuth,
    psychologist,
    userController.GetUserById
  );
  router.post(
    "/questionnaire/answers",
    checkAuth,
    psychologist,
    userController.GetUserById
  );
  router.get(
    "/psychologist/qna",
    checkAuth,
    psychologist,
    userController.GetUserById
  );
  router.post(
    "/psychologist/qna",
    checkAuth,
    psychologist,
    userController.GetUserById
  );

module.exports = router;
