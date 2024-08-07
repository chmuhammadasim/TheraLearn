module.exports = (error, req,res,next) => {
    console.log("Bad Request on server(ErrorMessage)");
      if(!error.status){
        error.status = 500;
      }
      res.status(error.status || 500).send(error);
      next();
    };