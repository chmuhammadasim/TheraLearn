const express = require('express');
const {  user } = require('../middleware/authMiddleware');
const checkAuth = require('../middleware/check-auth');
const userController = require('../controller/user.controller');
const router = express.Router();

router.get('/', userController.Checkapi);
router.get('/byid',checkAuth,  user, userController.GetUserById);
// router.get('/users', user, getAllUsers);
// router.put('/users/', user, updateUser);
// router.delete('/users/', user, deleteUser);

module.exports = router;