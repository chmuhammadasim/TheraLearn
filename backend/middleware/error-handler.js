module.exports = (req, res, next) => {
    console.log("Bad Request on server(ErrorHandler)");
      const error = {
        status: 404,
        message: 'This URL doesnot exists'
      }
      next(error);
  };