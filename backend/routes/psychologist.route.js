const express = require('express');
const router = express.Router();
const psychologistController = require('../controller/psychologist.controller');
router.get("/",psychologistController.Checkapi);
router.get("/getall",psychologistController.getAllPsychologists);
router.get('/getbyid/', psychologistController.getPsychologistById);

module.exports = router;