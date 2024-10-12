const Users = require('../model/user.model');
const Blog = require('../model/blog.model');
const psychologistController = {};

psychologistController.Checkapi = (req, res) => {
  res.status(200).send({
    message: "psychologist API is working",
  });
};

psychologistController.getAllPsychologists = async (req, res) => {
  try {

    const psychologists = await Users.find({ role: 'psychologist', isActive: true });
    
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
  const id  = req.headers.psychologistid;
  try {
    const psychologist = await Users.findById(id);

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


psychologistController.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.userData.userId });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs' });
  }
};

psychologistController.createBlog = async (req, res) => {
  try {
    const newBlog = new Blog({
      ...req.body,
      author: req.userData.userId,
    });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog' });
  }
};

psychologistController.updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.blogId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog' });
  }
};


psychologistController.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.blogId);
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog' });
  }
};

psychologistController.fetchPatientsByPsychologistId = async (req, res) => {
  const { id } = req.headers.psychologistid; 
  try {
    const patients = await getPatientsByPsychologistId(id); // Call service function
    return res.status(200).json(patients); // Return the list of patients
  } catch (error) {
    console.error('Error fetching patients:', error);
    return res.status(500).json({ message: 'Error fetching patients' }); // Error response
  }
};

// Controller to send a message to a specific patient
psychologistController.handleSendMessageToPatient = async (req, res) => {
  const { patientId } = req.params; // Get patient ID from URL parameters
  const { message } = req.body; // Get message content from request body
  try {
    const response = await sendMessageToPatient(patientId, message); // Call service function
    return res.status(200).json(response); // Return success response
  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ message: 'Error sending message to patient' }); // Error response
  }
};

// Controller to assign a psychologist to a patient
psychologistController.handleAssignPsychologistToPatient = async (req, res) => {
  const { psychologistId } = req.headers.psychologistid; // Get psychologist ID from URL parameters
  try {
    const response = await assignPsychologistToPatient(psychologistId); // Call service function
    return res.status(200).json(response); // Return success response
  } catch (error) {
    console.error('Error assigning psychologist:', error);
    return res.status(500).json({ message: 'Error assigning psychologist' }); // Error response
  }
};

// Controller to fetch the questionnaire for a specific psychologist
psychologistController.fetchQuestionnaire = async (req, res) => {
  const { psychologistId } = req.headers.psychologistid; // Get psychologist ID from URL parameters
  try {
    const questionnaire = await getQuestionnaire(psychologistId); // Call service function
    return res.status(200).json(questionnaire); // Return the questionnaire
  } catch (error) {
    console.error('Error fetching questionnaire:', error);
    return res.status(500).json({ message: 'Error fetching questionnaire' }); // Error response
  }
};

psychologistController.handleSubmitAnswer = async (req, res) => {
  const { psychologistId } = req.headers.psychologistid; // Get psychologist ID from URL parameters
  const { answers } = req.body; // Get answers from request body
  try {
    const response = await submitAnswer(psychologistId, answers); // Call service function
    return res.status(200).json(response); // Return success response
  } catch (error) {
    console.error('Error submitting answers:', error);
    return res.status(500).json({ message: 'Error submitting answers' }); // Error response
  }
};

psychologistController.fetchQnA = async (req, res) => {
  const { psychologistId } = req.headers.psychologistid; // Get psychologist ID from URL parameters
  try {
    const qna = await getQnA(psychologistId); // Call service function
    return res.status(200).json(qna); // Return the Q&A
  } catch (error) {
    console.error('Error fetching Q&A:', error);
    return res.status(500).json({ message: 'Error fetching Q&A' }); // Error response
  }
};

psychologistController.handleAskQuestion = async (req, res) => {
  const { psychologistId } = req.headers.psychologistid; // Get psychologist ID from URL parameters
  const { question } = req.body; // Get question from request body
  try {
    const response = await askQuestion(psychologistId, question); // Call service function
    return res.status(200).json(response); // Return success response
  } catch (error) {
    console.error('Error submitting question:', error);
    return res.status(500).json({ message: 'Error submitting question' }); // Error response
  }
};



module.exports = psychologistController;
