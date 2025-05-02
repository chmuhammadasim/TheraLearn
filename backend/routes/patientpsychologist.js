const express = require("express");
const { psychologist, user } = require("../middleware/authMiddleware");
const checkAuth = require("../middleware/check-auth");
const psychologistpatient = require("../controller/psychologistpatient.controller");
const router = express.Router();

router.get(
  "/me",
  checkAuth,
  psychologist,
  psychologistpatient.getPsychologistDetails
);
router.get(
  "/my-patients",
  checkAuth,
  psychologist,
  psychologistpatient.getMyPatients
);
router.post(
  "/send-message",
  checkAuth,
  psychologist,
  psychologistpatient.sendMessageToPatient
);
router.get(
  "/get-response",
  checkAuth,
  psychologist,
  psychologistpatient.getPatientResponse
);
router.get(
  "/patient-chat",
  checkAuth,
  psychologist,
  psychologistpatient.getPatientChat
);

router.get(
  "/getassignedpsy",
  checkAuth,
  user,
  psychologistpatient.getAssignedPsychologists
);
router.get("/psy-chat", checkAuth, user, psychologistpatient.getPsyChat);
router.post(
  "/assign",
  checkAuth,
  user,
  psychologistpatient.assignPsychologistToPatient
);
router.post(
  "/sendmestopsy",
  checkAuth,
  user,
  psychologistpatient.sendMessageToPsychologist
);
router.get(
  "/children",
  checkAuth,
  psychologist,
  psychologistpatient.getPatientChildren
);
router.get(
  "/child-records",
  checkAuth,
  psychologist,
  psychologistpatient.getChildRecords
);

module.exports = router;
