const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalGamesPlayed: {
    type: Number,
    required: true,
    default: 0
  },
  totalTimePlayed: {
    type: Number,
    required: true,
    default: 0
  },
  averagePlayTime: {
    type: Number,
    default: 0
  },
  averageScore: {
    type: Number,
    default: 0
  },
  lastGame: {
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game'
    },
    score: {
      type: Number
    },
    timePlayed: {
      type: Number
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Result', resultSchema);
