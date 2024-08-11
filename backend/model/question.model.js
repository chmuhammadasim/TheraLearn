const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: [{
    text: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
      default: false,
    },
  }],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium',
  },
  category: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  timesAttempted: {
    type: Number,
    default: 0,
  },
  timesCorrect: {
    type: Number,
    default: 0,
  },
  tags: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

questionSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Question', questionSchema);
