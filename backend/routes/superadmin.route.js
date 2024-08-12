const express = require('express');
const {  superadmin } = require('../middleware/authMiddleware');
const checkAuth = require('../middleware/check-auth');
const superadminController = require('../controller/superadmin.controller');
const router = express.Router();

router.get('/',superadminController.Checkapi);
router.get('/all',checkAuth,superadmin,superadminController.getAllUsers);

module.exports = router;