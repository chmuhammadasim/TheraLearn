const mongoose = require('mongoose');
// @typedef {Object} User
// @property {Number} id - The unique identifier for the user.
// @property {String} username - The username of the user.
// @property {String} email - The email address of the user.
// @property {String} password - The password of the user.
// @property {String} role - The role of the user. Can be 'user', 'psychologist', or 'admin'.
// @property {String} firstName - The first name of the user.
// @property {String} lastName - The last name of the user.
// @property {String} address - The address of the user.
// @property {String} city - The city of the user.
// @property {String} country - The country of the user.
// @property {String} contact - The contact information of the user.
// @property {String} bio - The biography of the user.
// @property {String} profilePictureUrl - The URL of the user's profile picture.
// @property {Date} dateOfBirth - The date of birth of the user.
// @property {Date} createdAt - The date and time when the user was created.
// @property {Date} lastLogin - The date and time of the user's last login.
// @property {Boolean} isActive - Indicates whether the user is active or not.
// @property {Array} games - An array of game IDs associated with the user.
// @property {Array} questions - An array of question IDs associated with the user.
// @property {Array} result - An array of result IDs associated with the user.
// @property {Array} education - An array of degrees/certifications of the psychologist.
// @property {String} experience - The description of the psychologist's experience.
// @property {String} specialization - The area of expertise of the psychologist.
// @property {Array} patients - An array of user IDs associated with the psychologist.
// @property {String} psychologist - The ID of the psychologist associated with the user.
 
const userSchema = new mongoose.Schema({
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
    enum: ['user', 'psychologist', 'admin'],
    default: 'user',
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
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
  contact: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  profilePictureUrl: {
    type: String,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
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
  games: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
  }],
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  }],
  result: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Result',
  }],
  // Field specific to Psychologists
  education: {
    type: [String], // Array of degrees/certifications
    trim: true,
  },
  experience: {
    type: String, // Description of experience
    trim: true,
  },
  specialization: {
    type: String, // Psychologist's area of expertise
    trim: true,
  },
  patients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  // Field specific to Users
  psychologist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('User', userSchema);
