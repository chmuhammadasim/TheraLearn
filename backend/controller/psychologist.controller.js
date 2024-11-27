const Users = require("../model/user.model");
const Blog = require("../model/blog.model");
const psychologistController = {};
psychologistController.Checkapi = (req, res) => {
  res.status(200).send({
    message: "psychologist API is working",
  });
};
psychologistController.getAllPsychologists = async (req, res) => {
  try {
    const psychologists = await Users.find({
      role: "psychologist",
      isActive: true,
    });
    if (!psychologists || psychologists.length === 0) {
      return res.status(404).json({ message: "No psychologists found." });
    }
    res.status(200).json(psychologists);
  } catch (error) {
    console.error("Error fetching psychologists:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
psychologistController.getPsychologistById = async (req, res) => {
  const id = req.headers.psychologistid;
  try {
    const psychologist = await Users.findById(id);
    if (!psychologist) {
      return res.status(404).json({ message: "Psychologist not found." });
    }
    if (psychologist.role !== "psychologist") {
      return res
        .status(400)
        .json({ message: "The user is not a psychologist." });
    }
    res.status(200).json(psychologist);
  } catch (error) {
    console.error("Error fetching psychologist by ID:", error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid psychologist ID." });
    }
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
psychologistController.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.userData.userId });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
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
    res.status(500).json({ message: "Error creating blog" });
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
    res.status(500).json({ message: "Error updating blog" });
  }
};
psychologistController.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.blogId);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog" });
  }
};
psychologistController.fetchPatientsByPsychologistId = async (req, res) => {
  const { id } = req.headers.psychologistid;
  try {
    const patients = await getPatientsByPsychologistId(id);
    return res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return res.status(500).json({ message: "Error fetching patients" });
  }
};
psychologistController.handleSendMessageToPatient = async (req, res) => {
  const { patientId } = req.params;
  const { message } = req.body;
  try {
    const response = await sendMessageToPatient(patientId, message);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error sending message:", error);
    return res
      .status(500)
      .json({ message: "Error sending message to patient" });
  }
};
psychologistController.handleAssignPsychologistToPatient = async (req, res) => {
  const { psychologistId } = req.headers.psychologistid;
  try {
    const response = await assignPsychologistToPatient(psychologistId);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error assigning psychologist:", error);
    return res.status(500).json({ message: "Error assigning psychologist" });
  }
};
psychologistController.fetchQuestionnaire = async (req, res) => {
  const { psychologistId } = req.headers.psychologistid;
  try {
    const questionnaire = await getQuestionnaire(psychologistId);
    return res.status(200).json(questionnaire);
  } catch (error) {
    console.error("Error fetching questionnaire:", error);
    return res.status(500).json({ message: "Error fetching questionnaire" });
  }
};
psychologistController.handleSubmitAnswer = async (req, res) => {
  const { psychologistId } = req.headers.psychologistid;
  const { answers } = req.body;
  try {
    const response = await submitAnswer(psychologistId, answers);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error submitting answers:", error);
    return res.status(500).json({ message: "Error submitting answers" });
  }
};

psychologistController.fetchQnA = async (req, res) => {
  const { psychologistId } = req.headers.psychologistid;
  try {
    const qna = await getQnA(psychologistId);
    return res.status(200).json(qna);
  } catch (error) {
    console.error("Error fetching Q&A:", error);
    return res.status(500).json({ message: "Error fetching Q&A" });
  }
};

psychologistController.handleAskQuestion = async (req, res) => {
  const { psychologistId } = req.headers.psychologistid;
  const { question } = req.body;
  try {
    const response = await askQuestion(psychologistId, question);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error submitting question:", error);
    return res.status(500).json({ message: "Error submitting question" });
  }
};
module.exports = psychologistController;
