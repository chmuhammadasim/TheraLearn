// psychologistController.js
const User = require('../model/user.model');
const Message = require('../models/Message');
const psychologistpatientController = {};

// Fetch all psychologists
exports.getAllPsychologists = async (req, res) => {
  try {
    const psychologists = await Psychologist.find();
    res.status(200).json(psychologists);
  } catch (error) {
    console.error('Error fetching psychologists:', error);
    res.status(500).json({ message: 'Error fetching psychologists' });
  }
};

// Fetch a specific psychologist by ID
exports.getPsychologistById = async (req, res) => {
  const psychologistId = req.headers['psychologistid'];
  try {
    const psychologist = await Psychologist.findById(psychologistId);
    if (!psychologist) {
      return res.status(404).json({ message: 'Psychologist not found' });
    }
    res.status(200).json(psychologist);
  } catch (error) {
    console.error('Error fetching psychologist:', error);
    res.status(500).json({ message: 'Error fetching psychologist details' });
  }
};

// Fetch the list of patients assigned to a psychologist
exports.getPatientsByPsychologistId = async (req, res) => {
  const psychologistId = req.headers['psychologist-id'];
  try {
    const patients = await Patient.find({ psychologist: psychologistId });
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ message: 'Error fetching patients' });
  }
};

// Send a message to a specific patient
exports.sendMessageToPatient = async (req, res) => {
  const patientId = req.headers['patient-id'];
  const { message } = req.body;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const newMessage = new Message({
      sender: req.user.id, // Assuming req.user contains the authenticated psychologist
      receiver: patientId,
      content: message,
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
};

// Assign a psychologist to a patient
exports.assignPsychologistToPatient = async (req, res) => {
  const psychologistId = req.headers['psychologist-id'];
  const patientId = req.body.patientId;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    patient.psychologist = psychologistId;
    await patient.save();

    res.status(200).json({ message: 'Psychologist assigned successfully' });
  } catch (error) {
    console.error('Error assigning psychologist:', error);
    res.status(500).json({ message: 'Error assigning psychologist' });
  }
};

// Fetch the questionnaire (example placeholder)
exports.getQuestionnaire = async (req, res) => {
  const psychologistId = req.headers['psychologist-id'];

  try {
    // Replace with actual logic for fetching questionnaires
    res.status(200).json({ message: 'Questionnaire fetched successfully' });
  } catch (error) {
    console.error('Error fetching questionnaire:', error);
    res.status(500).json({ message: 'Error fetching questionnaire' });
  }
};

// Submit answers to the questionnaire
exports.submitAnswers = async (req, res) => {
  const psychologistId = req.headers['psychologist-id'];
  const { answers } = req.body;

  try {
    // Replace with actual logic for storing answers
    res.status(201).json({ message: 'Answers submitted successfully' });
  } catch (error) {
    console.error('Error submitting answers:', error);
    res.status(500).json({ message: 'Error submitting answers' });
  }
};

// Fetch the Q&A
exports.getQnA = async (req, res) => {
  const psychologistId = req.headers['psychologist-id'];

  try {
    // Replace with actual logic for fetching Q&A
    res.status(200).json({ message: 'Q&A fetched successfully' });
  } catch (error) {
    console.error('Error fetching Q&A:', error);
    res.status(500).json({ message: 'Error fetching Q&A' });
  }
};

// Ask a new question in Q&A
exports.askQuestion = async (req, res) => {
  const psychologistId = req.headers['psychologist-id'];
  const { question } = req.body;

  try {
    // Replace with actual logic for storing the question
    res.status(201).json({ message: 'Question submitted successfully' });
  } catch (error) {
    console.error('Error submitting question:', error);
    res.status(500).json({ message: 'Error submitting question' });
  }
};
