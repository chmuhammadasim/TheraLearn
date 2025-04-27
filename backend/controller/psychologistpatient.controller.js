const {Psychologist} = require("../model/user.model");
const { Parent, Child } = require("../model/parentchild.model");
const psychologistpatient = {};

psychologistpatient.getPsychologistDetails = async (req, res) => {
  try {
    if (!req.userData || !req.userData.id) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    const psychologist = await Psychologist.findById(req.userData.id);
    if (!psychologist || psychologist.role !== "psychologist") {
      return res.status(404).json({ message: "Psychologist not found" });
    }
    res.status(200).json(psychologist);
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

psychologistpatient.getMyPatients = async (req, res) => {
  try {
    if (!req.userData || !req.userData.id) {
      return res.status(400).json({ message: "Invalid user data" });
    }



    const psychologist = await Psychologist.findById(req.userData.id)
      .populate("patients")
      .exec();
    if (!psychologist) {
      return res.status(404).json({ message: "Psychologist not found" });
    }
    const parents = await Parent.find({ _id: { $in: psychologist.patients } })
      .populate("children")
      .exec();
    if (!parents.length) {
      return res
        .status(404)
        .json({ message: "No parents found for this psychologist" });
    }
     console.log("Parents with their children:", parents);

    // const psychologist = await Psychologist.findById(req.userData.id)
    // .populate({
    //   path: "patients", // Fetch parents (patients)
    //   model: "Parent",
    //   populate: {
    //     path: "children", // Fetch children within parents
    //     model: "Child"
    //   }
    // })
    // .exec();

    if (!psychologist) {
      return res.status(404).json({ message: "Psychologist not found" });
    }

    if (!psychologist || psychologist.role !== "psychologist") {
      return res.status(404).json({ message: "Psychologist not found" });
    }
    // console.log("Patients:", psychologist);
    res.status(200).json(psychologist.patients);
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
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
    psychologist.messages.push({
      from: from,
      to: id,
      message: message,
      sender: "user",
    });
    await psychologist.save();
    const patient = await User.findById(req.headers.patientid);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    patient.messages.push({
      from: from,
      to: id,
      message: message,
      sender: "user",
    });

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
    const from = req.userData.id;

    if (!id) {
      return res.status(400).json({ message: "Patient ID is required" });
    }
    const psychologist = await Psychologist.findById(req.userData.id).populate(
      "messages"
    );
    if (!psychologist) {
      return res.status(404).json({ message: "Psychologist not found" });
    }
    const patient = await Parent.findById(id).populate("messages");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const filteredMessages = psychologist.messages.filter(
      (msg) =>
        (msg.from.toString() === from.toString() &&
          msg.to.toString() === id.toString()) ||
        (msg.from.toString() === id.toString() &&
          msg.to.toString() === from.toString())
    );

    res.status(200).json({ filteredMessages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

psychologistpatient.getPsyChat = async (req, res) => {
  try {
    const from = req.headers.psychologistid;
    const id = req.userData.userId;

    if (!id) {
      return res.status(400).json({ message: "Patient ID is required" });
    }
    const psychologist = await Psychologist.findById(req.userData.userId).populate(
      "messages"
    );
    if (!psychologist) {
      return res.status(404).json({ message: "Psychologist not found" });
    }
    const patient = await Psychologist.findById(id).populate("messages");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const filteredMessages = psychologist.messages.filter(
      (msg) =>
        (msg.from.toString() === from.toString() &&
          msg.to.toString() === id.toString()) ||
        (msg.from.toString() === id.toString() &&
          msg.to.toString() === from.toString())
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
    const userId = req.userData.id;

    if (!psychologistid) {
      return res.status(400).json({ message: "Psychologist ID is required" });
    }
    const psychologist = await Psychologist.findById(psychologistid);
    if (!psychologist) {
      return res.status(404).json({ message: "Psychologist not found" });
    }
    const patient = await Parent.findById(userId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    patient.assignedDoctor = psychologistid;
    await patient.save();
    return res
      .status(200)
      .json({ message: "Psychologist assigned successfully", patient });
  } catch (error) {
    console.error("Error assigning psychologist:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

psychologistpatient.getAssignedPsychologists = async (req, res) => {
  try {
    const patientId = req.userData.userId;
    const patient = await Parent.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    if (!patient.psychologist) {
      return res
        .status(404)
        .json({ message: "No psychologist assigned to this patient" });
    }

    res.status(200).json(patient.psychologist);
  } catch (error) {
    console.error("Error fetching assigned psychologists:", error);
    res.status(500).json({ message: "Failed to fetch assigned psychologists" });
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
        .json({
          message: "Message, psychologist ID, and patient ID are required",
        });
    }
    const psychologist = await User.findById(psychologistId);
    const patient = await User.findById(patientId);

    if (!psychologist) {
      return res.status(404).json({ message: "Psychologist not found" });
    }
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    psychologist.messages.push({
      from: patientId,
      to: psychologistId,
      message: message,
      sender: "psychologist",
    });
    patient.messages.push({
      from: patientId,
      to: psychologistId,
      message: message,
      sender: "psychologist",
    });
    await psychologist.save();
    await patient.save();
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = psychologistpatient;
