const express = require('express');
const router = express.Router();
const blogController = require('../controller/blog.controller');
router.get("/all",blogController.getAllBlogs);

module.exports = router;