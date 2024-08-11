const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    enum: ['admin', 'user', 'superadmin'],
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
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
  }
});

module.exports = mongoose.model('User', userSchema);
