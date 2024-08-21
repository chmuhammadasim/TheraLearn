const Blog = require("../model/blog.model");
const psychologistController = {};

psychologistController.Checkapi = (req, res) => {
  res.status(200).send({
    message: "blog API is working",
  });
};



module.exports = psychologistController;
