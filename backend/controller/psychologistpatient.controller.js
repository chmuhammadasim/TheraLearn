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
psychologistpatient.getPatientChildren = async (req, res) => {
  try {
    const patientId = req.headers.patientid;
    
    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required" });
    }
    
    const parent = await Parent.findById(patientId).populate('children');
    
    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }
    
    res.status(200).json(parent.children || []);
  } catch (error) {
    console.error("Error fetching patient children:", error);
    res.status(500).json({ message: "Server error" });
  }
};

psychologistpatient.addChildToPatient = async (req, res) => {
  try {
    const patientId = req.headers.patientid;
    const childData = req.body;
    
    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required" });
    }
    
    const parent = await Parent.findById(patientId);
    
    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }
    
    const newChild = new Child(childData);
    await newChild.save();
    
    parent.children.push(newChild._id);
    await parent.save();
    
    res.status(201).json({ message: "Child added successfully", child: newChild });
  } catch (error) {
    console.error("Error adding child to patient:", error);
    res.status(500).json({ message: "Server error" });
  }
};

psychologistpatient.getChildRecords = async (req, res) => {
  try {
    const childId = req.headers.childid;
    if (!childId) {
      return res.status(400).json({ message: "Child ID is required" });
    }
    
    const child = await Child.findById(childId);
    
    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }
    console.log("Child records:", child);
    res.status(200).json(child);
  } catch (error) {
    console.error("Error fetching child records:", error);
    res.status(500).json({ message: "Server error" });
  }
};

psychologistpatient.saveChildNotes = async (req, res) => {
  try {
    const childId = req.headers.childid;
    const { notes } = req.body;
    
    if (!childId) {
      return res.status(400).json({ message: "Child ID is required" });
    }
    
    const child = await Child.findById(childId);
    
    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }
    
    child.notes = notes;
    await child.save();
    
    res.status(200).json({ message: "Notes saved successfully", child });
  } catch (error) {
    console.error("Error saving child notes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

psychologistpatient.saveChildPrescription = async (req, res) => {
  try {
    const childId = req.headers.childid;
    const { prescription } = req.body;
    
    if (!childId) {
      return res.status(400).json({ message: "Child ID is required" });
    }
    
    const child = await Child.findById(childId);
    
    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }
    
    child.prescription = prescription;
    await child.save();
    
    res.status(200).json({ message: "Prescription saved successfully", child });
  } catch (error) {
    console.error("Error saving child prescription:", error);
    res.status(500).json({ message: "Server error" });
  }
};

psychologistpatient.saveChildFollowUp = async (req, res) => {
  try {
    const childId = req.headers.childid;
    const followUpData = req.body;
    
    if (!childId) {
      return res.status(400).json({ message: "Child ID is required" });
    }
    
    const child = await Child.findById(childId);
    
    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }
    
    if (!child.followUps) {
      child.followUps = [];
    }
    
    child.followUps.push(followUpData);
    await child.save();
    
    res.status(200).json({ message: "Follow-up saved successfully", child });
  } catch (error) {
    console.error("Error saving child follow-up:", error);
    res.status(500).json({ message: "Server error" });
  }
};

psychologistpatient.saveChildMentalHealthNotes = async (req, res) => {
  try {
    const childId = req.headers.childid;
    const { mentalHealthNotes } = req.body;
    
    if (!childId) {
      return res.status(400).json({ message: "Child ID is required" });
    }
    
    const child = await Child.findById(childId);
    
    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }
    
    child.mentalHealthNotes = mentalHealthNotes;
    await child.save();
    
    res.status(200).json({ message: "Mental health notes saved successfully", child });
  } catch (error) {
    console.error("Error saving child mental health notes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

psychologistpatient.saveChildLabTests = async (req, res) => {
  try {
    const childId = req.headers.childid;
    const { labTests } = req.body;
    
    if (!childId) {
      return res.status(400).json({ message: "Child ID is required" });
    }
    
    const child = await Child.findById(childId);
    
    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }
    
    child.labTests = labTests;
    await child.save();
    
    res.status(200).json({ message: "Lab tests saved successfully", child });
  } catch (error) {
    console.error("Error saving child lab tests:", error);
    res.status(500).json({ message: "Server error" });
  }
};

psychologistpatient.saveChildTherapySession = async (req, res) => {
  try {
    const childId = req.headers.childid;
    const sessionData = req.body;
    
    if (!childId) {
      return res.status(400).json({ message: "Child ID is required" });
    }
    
    const child = await Child.findById(childId);
    
    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }
    
    if (!child.therapySessions) {
      child.therapySessions = [];
    }
    
    child.therapySessions.push(sessionData);
    await child.save();
    
    res.status(200).json({ message: "Therapy session saved successfully", child });
  } catch (error) {
    console.error("Error saving child therapy session:", error);
    res.status(500).json({ message: "Server error" });
  }
};

psychologistpatient.saveChildDietRestrictions = async (req, res) => {
  try {
    const childId = req.headers.childid;
    const { dietRestrictions } = req.body;
    
    if (!childId) {
      return res.status(400).json({ message: "Child ID is required" });
    }
    
    const child = await Child.findById(childId);
    
    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }
    
    child.dietRestrictions = dietRestrictions;
    await child.save();
    
    res.status(200).json({ message: "Diet restrictions saved successfully", child });
  } catch (error) {
    console.error("Error saving child diet restrictions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = psychologistpatient;
