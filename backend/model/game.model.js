const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gameName: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    default: 1
  },
  score: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['uncompleted', 'completed', 'in-progress', 'failed'],
    default: 'uncompleted'
  },
  results: {
    type: Map,
    of: Number,
    default: {}
  },
  datePlayed: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', gameSchema);
