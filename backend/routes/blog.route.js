const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog.controller");
const { psychologistadmin, admin } = require("../middleware/authMiddleware");
const checkAuth = require("../middleware/check-auth");
router.get("/", blogController.Checkapi);
router.get("/all", blogController.getAllBlogs);
router.get("/getbyid/:id", blogController.getBlogById);
router.delete("/delete/:blogId", checkAuth, admin, blogController.deleteBlog);
router.patch(
  "/update-status/:blogId",
  checkAuth,
  psychologistadmin,
  blogController.updateBlogStatus
);
router.put(
  "/toggle-active/:blogId",
  checkAuth,
  psychologistadmin,
  blogController.toggleBlogActiveStatus
);
router.post("/like/:blogId", checkAuth, blogController.likeBlog);
router.post("/dislike/:blogId", checkAuth, blogController.dislikeBlog);
router.post("/comment/:blogId", checkAuth, blogController.submitComment);

module.exports = router;
