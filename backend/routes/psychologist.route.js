const express = require("express");
const router = express.Router();
const psychologistController = require("../controller/psychologist.controller");
const { psychologist, admin } = require("../middleware/authMiddleware");
const checkAuth = require("../middleware/check-auth");

router.get("/", psychologistController.Checkapi);
router.get("/getall", psychologistController.getAllPsychologists);
router.get("/getbyid/", psychologistController.getPsychologistById);
router.get(
  "/:id/blogs",
  checkAuth,
  psychologist,
  psychologistController.getBlogs
);
router.post(
  "/:id/blogs",
  checkAuth,
  psychologist,
  psychologistController.createBlog
);
router.put(
  "/:id/blogs/:blogId",
  checkAuth,
  psychologist,
  psychologistController.updateBlog
);
router.delete(
  "/:id/blogs/:blogId",
  checkAuth,
  psychologist,
  psychologistController.deleteBlog
);

module.exports = router;
