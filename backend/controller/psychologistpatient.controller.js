const User = require('../model/user.model');
const psychologistpatient = {};
psychologistpatient.getPsychologistDetails = async (req, res) => {  
  try {
    const psychologist = await User.findById(req.userData.userId);
    if (!psychologist || psychologist.role !== 'psychologist') {
      return res.status(404).json({ message: 'Psychologist not found' });
    }
    res.status(200).json(psychologist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

psychologistpatient.getMyPatients = async (req, res) => {
  try {
    const psychologist = await User.findById(req.userData.userId).populate('patients');
    if (!psychologist || psychologist.role !== 'psychologist') {
      return res.status(404).json({ message: 'Psychologist not found' });
    }
    res.status(200).json(psychologist.patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
psychologistpatient.sendMessageToPatient = async (req, res) => {
  try {
    const { message } = req.body;
    const id = req.headers.patientid;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    user.messages.push({ from:from, to:id, message:_id });
    await user.save();

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
psychologistpatient.getPatientResponse = async (req, res) => {
  try {
    const id = req.headers.patientid;
    const patient = await User.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const response = patient.responses.find((resp) => resp.to === req.userData.userId);
    res.status(200).json({ response: response?.message || '' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = psychologistpatient;