const express = require('express');
const router = express.Router();
const blogController = require('../controller/blog.controller');
const { psychologistadmin, admin } = require('../middleware/authMiddleware');
const checkAuth = require('../middleware/check-auth');

// Route to check API status
router.get("/", blogController.Checkapi);

// Route to get all blogs
router.get("/all", blogController.getAllBlogs);

// Route to get a blog by ID
router.get('/getbyid/:id', blogController.getBlogById);

// Route to delete a blog by ID
router.delete('/delete/:blogId',checkAuth,admin, blogController.deleteBlog);

// Route to update the status of a blog by ID
router.patch('/update-status/:blogId',checkAuth,psychologistadmin, blogController.updateBlogStatus);

module.exports = router;
