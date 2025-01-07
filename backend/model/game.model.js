const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sessions: [{
    gameName: {
      type: String,
      required: true,
    },
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
    datePlayed: {
      type: Date,
      default: Date.now,
    },
    attempts: {
      type: Number,
      default: 1, 
    },
  }],
});

module.exports = mongoose.model('Game', gameSchema);