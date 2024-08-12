const superadminController = {};
superadminController.Checkapi = (req, res) => {
  res.status(200).send({
      message: 'Auth API is working'
  });
};

  
module.exports = superadminController;
