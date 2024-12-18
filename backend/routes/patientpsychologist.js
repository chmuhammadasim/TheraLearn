const express = require("express");
const { psychologist } = require("../middleware/authMiddleware");
const checkAuth = require("../middleware/check-auth");
const psychologistpatient = require("../controller/psychologistpatient.controller");
const router = express.Router();


router.get('/me', checkAuth,psychologist, psychologistpatient.getPsychologistDetails);
router.get('/my-patients', checkAuth,psychologist, psychologistpatient.getMyPatients);
router.post('/send-message', checkAuth, psychologist, psychologistpatient.sendMessageToPatient );
router.get('/get-response', checkAuth,psychologist, psychologistpatient.getPatientResponse );
module.exports = router;
