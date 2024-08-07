const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'superadmin'],
    default: 'user'
  },
  firstName : {
    type: String,
  },
  lastName : {
    type: String,
  },
  address : {
    type: String,
  },
  city : {
    type: String,
  },
  country : {
    type: String,
  },
  contact : {
    type: String,
  },
  bio : {
    type: String,
  },
  profilePictureUrl : {
    type: String,
  },
  dateOfBirth : {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  games: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  }],
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  result: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Result'
  }],
});

module.exports = mongoose.model('User', userSchema);
