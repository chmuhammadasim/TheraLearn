const User = require("../model/user.model");
const psychologistpatient = {};
psychologistpatient.getPsychologistDetails = async (req, res) => {
  try {
    if (!req.userData || !req.userData.userId) {
      return res.status(400).json({ message: "Invalid user data" });
    }
    const psychologist = await User.findById(req.userData.userId);
    if (!psychologist || psychologist.role !== "psychologist") {
      return res.status(404).json({ message: "Psychologist not found" });
    }
    res.status(200).json(psychologist);
  } catch (error) {
    console.error(error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

psychologistpatient.getMyPatients = async (req, res) => {
  try {
    if (!req.userData || !req.userData.userId) {
      return res.status(400).json({ message: "Invalid user data" });
    }
    const psychologist = await User.findById(req.userData.userId).populate("patients");
    if (!psychologist || psychologist.role !== "psychologist") {
      return res.status(404).json({ message: "Psychologist not found" });
    }
    res.status(200).json(psychologist.patients);
  } catch (error) {
    console.error(error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

psychologistpatient.sendMessageToPatient = async (req, res) => {
  try {
    const { message } = req.body;
    const id = req.headers.patientid;
    const from = req.userData.userId;
    if (!message || !id) {
      return res
        .status(400)
        .json({ message: "Message and patient ID are required" });
    }
    const psychologist = await User.findById(req.userData.userId);
    if (!psychologist) {
      return res.status(404).json({ message: "Patient not found" });
    }
    psychologist.messages.push({ from:from, to: id, message:message });
    await psychologist.save();
    const patient = await User.findById(req.headers.patientid);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    patient.messages.push({ from:from, to: id, message:message });

    await patient.save();
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
psychologistpatient.getPatientResponse = async (req, res) => {
  try {
    const id = req.headers.patientid;
    const patient = await User.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    const response = patient.responses.find(
      (resp) => resp.to === req.userData.userId
    );
    res.status(200).json({ response: response?.message || "" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
psychologistpatient.getPatientChat = async (req, res) => {
  try {
    const id = req.headers.patientid;
    const from = req.userData.userId;
    if (!id) {
      return res.status(400).json({ message: "Patient ID is required" });
    }
    const psychologist = await User.findById(req.userData.userId).populate('messages');
    if (!psychologist) {
      return res.status(404).json({ message: "Psychologist not found" });
    }
    const patient = await User.findById(id).populate('messages');
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    
    const filteredMessages = psychologist.messages.filter(
      (msg) =>
        (msg.from.toString() === from.toString() && msg.to.toString() === id.toString()) ||
        (msg.from.toString() === id.toString() && msg.to.toString() === from.toString())
    );
    
    
    res.status(200).json({ filteredMessages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

psychologistpatient.assignPsychologistToPatient = async (req, res) => {
  try {
    const { psychologistid } = req.headers;
    const userId = req.userData.userId; 
    if (!psychologistid) {
      return res.status(400).json({ message: 'Psychologist ID is required' });
    }
    const psychologist = await User.findById(psychologistid);
    if (!psychologist) {
      return res.status(404).json({ message: 'Psychologist not found' });
    }
    const patient = await User.findById(userId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    patient.psychologist = psychologistid;
    await patient.save();
    return res.status(200).json({ message: 'Psychologist assigned successfully', patient });
  } catch (error) {
    console.error('Error assigning psychologist:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

psychologistpatient.getAssignedPsychologists = async (req, res) => {

  try {
    const patientId = req.userData.userId;
    const patient = await User.findById(patientId);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    if (!patient.psychologist) {
      return res.status(404).json({ message: 'No psychologist assigned to this patient' });
    }

    res.status(200).json(patient.psychologist);
  } catch (error) {
    console.error('Error fetching assigned psychologists:', error);
    res.status(500).json({ message: 'Failed to fetch assigned psychologists' });
  }
};

psychologistpatient.sendMessageToPsychologist = async (req, res) => {
  try {
    const { message } = req.body;
    const psychologistId = req.headers.psychologistid;
    const patientId = req.userData.userId;
    if (!message || !psychologistId || !patientId) {
      return res
        .status(400)
        .json({ message: "Message, psychologist ID, and patient ID are required" });
    }
    const psychologist = await User.findById(psychologistId);
    const patient = await User.findById(patientId);
    
    if (!psychologist) {
      return res.status(404).json({ message: "Psychologist not found" });
    }
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    psychologist.messages.push({ from: patientId, to: psychologistId, message });
    patient.messages.push({ from: patientId, to: psychologistId, message });
    await psychologist.save();
    await patient.save();
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = psychologistpatient;
