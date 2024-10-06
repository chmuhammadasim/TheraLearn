const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  hero: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    buttonText: {
      type: String,
    },
  },
  features: [
    {
      icon: {
        type: String,
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      image: {
        type: String,
      },
    },
  ],
  cta: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    buttonText: {
      type: String,
    },
    features: [
      {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
  },
  updatedAt: {
    type: Date,
  },
});

contentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
