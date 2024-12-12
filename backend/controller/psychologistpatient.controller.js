const User = require('../model/user.model');
const psychologistpatient = {};
psychologistpatient.getPsychologistDetails = async (req, res) => {
  console.log(req.userData);
  
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
module.exports = psychologistpatient;