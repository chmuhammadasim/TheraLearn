const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  gameName: {
    type: String,
    required: true,
  },
  sessions: [{
    level: {
      type: Number,
      default: 1,
    },
    score: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['uncompleted', 'completed', 'in-progress', 'failed'],
      default: 'uncompleted',
    },
    datePlayed: {
      type: Date,
      default: Date.now,
    },
    highestScore: {
      type: Number,
      default: 0, 
    },
    attempts: {
      type: Number,
      default: 1, 
    },
  }],
  overallResults: {
    highestScore: {
      type: Number,
      default: 0,
    },
    totalAttempts: {
      type: Number,
      default: 0,
    },
    totalScore: {
      type: Number,
      default: 0,
    },
  },
});

module.exports = mongoose.model('Game', gameSchema);