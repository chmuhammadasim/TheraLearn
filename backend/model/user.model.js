const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  sender: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

const psychologistSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    sparse: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
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
  role: {
    type: String,
    default: 'psychologist',
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  profilePictureUrl: {
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
  dateOfBirth: {
    type: Date,
  },
  bio: {
    type: String,
    trim: true,
  },
  education: {
    type: [String], // Array of degrees/certifications
    trim: true,
  },
  experience: {
    type: [String], // Description of experience
    trim: true,
  },
  specialization: {
    type: String,
    default: "Down Syndrome Specialist",
    trim: true,
  },
  therapyMethods: {
    type: [String], // Example: ["Behavioral Therapy", "Speech Therapy"]
    trim: true,
  },
  certifications: {
    type: [String], // Example: ["Certified Child Psychologist", "Autism Spectrum Training"]
    trim: true,
  },
  availability: {
    type: String, // Example: "Monday-Friday, 9 AM - 5 PM"
    trim: true,
  },
  consultationFee: {
    type: Number, // Example: Fee per session
  },
  patients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parent',
  }],
  reviews: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String, trim: true },
  }],
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, trim: true },
    timestamp: { type: Date, default: Date.now },
  }],
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
  }
});

module.exports = mongoose.model('Psychologist', psychologistSchema);
