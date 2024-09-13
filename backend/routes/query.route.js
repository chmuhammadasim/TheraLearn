const express = require('express');
const router = express.Router();
const QueryController = require('../controller/query.controller');
const checkAuth = require('../middleware/check-auth');
const { admin } = require('../middleware/authMiddleware');
router.get("/",QueryController.Checkapi);
router.post("/",QueryController.submitQuery);
router.get('/all',checkAuth, admin, QueryController.getAllQueries);
router.post('/reply',checkAuth, admin, QueryController.replyToQuery);

module.exports = router;