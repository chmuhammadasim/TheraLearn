const Query = require('../model/query.model');
const QueryController = {};
const nodemailer = require('nodemailer');


QueryController.Checkapi = (req,res) => {
    res.status(200).send({
        message: 'Express backend server for query'
      });
}
QueryController.submitQuery = async (req, res) => {
    try {
      const { name, email, message } = req.body;
  
      // Validate input
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Create a new query entry
      const newQuery = new Query({
        name,
        email,
        message,
      });
  
      // Save the query to the database
      await newQuery.save();
  
      res.status(201).json({
        message: 'Query submitted successfully',
        query: newQuery,
      });
    } catch (error) {
      console.error('Error submitting query:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  QueryController.getAllQueries = async (req, res) => {
    try {
      const queries = await Query.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        data: queries
      });
    } catch (error) {
      console.error('Error fetching queries:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  };

  QueryController.replyToQuery = async (req, res) => {
    const { email, subject, replyMessage } = req.body;
  
    try {
      // Set up nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // Your email address
          pass: process.env.EMAIL_PASSWORD // Your email password
        }
      });
  
      // Define the email content
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject || 'Reply to your query',
        text: replyMessage
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({
        success: true,
        message: 'Reply sent successfully!'
      });
    } catch (error) {
      console.error('Error sending reply:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send reply',
        error: error.message
      });
    }
  };
module.exports = QueryController;