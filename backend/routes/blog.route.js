const express = require('express');
const router = express.Router();
const blogController = require('../controller/blog.controller');
router.get("/",blogController.Checkapi);
router.get("/all",blogController.getAllBlogs);
router.get('/getbyid/:id', blogController.getBlogById);

module.exports = router;