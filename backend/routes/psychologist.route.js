const express = require('express');
const router = express.Router();
const psychologistController = require('../controller/psychologist.controller');
router.get("/",psychologistController.Checkapi);

module.exports = router;