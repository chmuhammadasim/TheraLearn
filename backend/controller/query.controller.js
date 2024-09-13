const Query = require('../model/query.model');
const QueryController = {};


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
module.exports = QueryController;