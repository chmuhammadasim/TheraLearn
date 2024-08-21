const Users = require('../model/user.model');
const psychologistController = {};

psychologistController.Checkapi = (req, res) => {
  res.status(200).send({
    message: "psychologist API is working",
  });
};
psychologistController.getAllPsychologists = async (req, res) => {
  try {
    const psychologists = await User.find({ role: 'psychologist' });

    if (!psychologists || psychologists.length === 0) {
      return res.status(404).json({ message: 'No psychologists found.' });
    }

    res.status(200).json(psychologists);
  } catch (error) {
    console.error('Error fetching psychologists:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

psychologistController.getPsychologistById = async (req, res) => {
  const { id } = req.params;

  try {
    const psychologist = await User.findById(id);

    if (!psychologist) {
      return res.status(404).json({ message: 'Psychologist not found.' });
    }

    if (psychologist.role !== 'psychologist') {
      return res.status(400).json({ message: 'The user is not a psychologist.' });
    }

    res.status(200).json(psychologist);
  } catch (error) {
    console.error('Error fetching psychologist by ID:', error);

    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid psychologist ID.' });
    }

    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};



module.exports = psychologistController;
