const express = require('express');
const router = express.Router();
const QueryController = require('../controller/query.controller');

router.get("/",QueryController.Checkapi);
router.post("/",QueryController.submitQuery);

module.exports = router;