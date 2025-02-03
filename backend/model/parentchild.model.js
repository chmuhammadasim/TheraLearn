const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    default: 'child',
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    trim: true,
  },
  medicalConditions: [{
    type: String,
    trim: true,
  }],
  allergies: [{
    type: String,
    trim: true,
  }],
  medications: [{
    type: String,
    trim: true,
  }],
  doctorNotes: [{
    date: {
      type: Date,
      default: Date.now,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    notes: {
      type: String,
      trim: true,
    },
    prescriptions: [{
      medication: String,
      dosage: String,
      instructions: String,
    }],
    followUpDate: {
      type: Date,
    }
  }],
  geneticDisorders: [{
    type: String,
    trim: true,
  }],
  familyMedicalHistory: [{
    type: String,
    trim: true,
  }],
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  bmi: {
    type: Number,
  },
  mentalHealthNotes: [{
    date: { type: Date, default: Date.now },
    psychologistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Psychologist' },
    notes: { type: String, trim: true }
  }],
  hospitalVisits: [{
    date: { type: Date, default: Date.now },
    hospital: { type: String, trim: true },
    reason: { type: String, trim: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }
  }],
  labTests: [{
    testName: { type: String, trim: true },
    result: { type: String, trim: true },
    date: { type: Date, default: Date.now },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  }],
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
  },
  school: {
    type: String,
    trim: true,
  },
  grade: {
    type: String,
    trim: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parent',
    required: true,
  },
  assignedDoctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  therapySessions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TherapySession',
  }],
  behavioralIssues: [{
    type: String,
    trim: true,
  }],
  developmentalMilestones: [{
    type: String,
    trim: true,
  }],
  dietRestrictions: [{
    type: String,
    trim: true,
  }],
  activityPreferences: [{
    type: String,
    trim: true,
  }],
  hobbies: [{
    type: String,
    trim: true,
  }],
  favoriteSubjects: [{
    type: String,
    trim: true,
  }],
  extracurricularActivities: [{
    type: String,
    trim: true,
  }],
  languageSpoken: [{
    type: String,
    trim: true,
  }],
  specialNeeds: {
    type: String,
    trim: true,
  },
  sleepSchedule: {
    bedtime: String,
    wakeUpTime: String,
  },
  parentalConcerns: [{
    type: String,
    trim: true,
  }]
});

const parentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  contact: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  profilePictureUrl: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
  }],
  primaryCarePhysician: {
    name: String,
    contact: String,
    hospital: String,
  },
  emergencyAuthorization: {
    type: Boolean,
    default: false,
  },
  insurancePolicy: {
    policyNumber: String,
    coverageDetails: String,
    validUntil: Date,
  },
  medicalHistory: [{
    type: String,
    trim: true,
  }],
  insuranceProvider: {
    type: String,
    trim: true,
  },
  preferredHospital: {
    type: String,
    trim: true,
  }
});

const Parent = mongoose.model('Parent', parentSchema);
const Child = mongoose.model('Child', childSchema);

module.exports = { Parent, Child };
