const express = require('express');
const {  admin } = require('../middleware/authMiddleware');
const checkAuth = require('../middleware/check-auth');
const adminController = require('../controller/superadmin.controller');
const router = express.Router();

router.get('/',adminController.Checkapi);
router.get('/all',checkAuth,admin,adminController.getAllUsers);
router.patch('/users/:userId', checkAuth, admin, adminController.updateUserStatus);

module.exports = router;