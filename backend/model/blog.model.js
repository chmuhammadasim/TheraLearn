const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 150,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'psychologist',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    trim: true,
    maxLength: 300,
  },

  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  coverImageUrl: {
    type: String,
    default: '', // URL for the cover image
  },
  videoUrl: {
    type: String,
    default: '', // URL for an embedded video related to the blog
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Refers to the user who liked the blog
    },
  ],
  dislikedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Refers to the user who disliked the blog
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      comment: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  estimatedReadTime: {
    type: Number, // Time in minutes
    default: function () {
      return Math.ceil(this.content.split(' ').length / 200); // Assuming an average reading speed of 200 words per minute
    },
  },

  allowComments: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

blogSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
