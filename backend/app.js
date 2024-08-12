require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('file-system');
const accessControl = require('./middleware/access-controls');
const errorHandler = require('./middleware/error-handler');
const errorMessage = require('./middleware/error-message');
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const superadmin = require('./routes/superadmin.route');

app.use(cors());
app.use(accessControl);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

try {
  mongoose.connect(process.env.THERALEARN_DB_URL);
  console.log(`mongoDB connected successfully on ${process.env.THERALEARN_DB_URL}(app.js)`);
} catch (error) {
  console.log(`mongoDB cannot connected on ${process.env.THERALEARN_DB_URL}(app.js)`)
}

app.get('/api', function (req, res) {
  res.status(200).send({
    message: 'Express backend server'
  });
});

app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/superadmin",superadmin);

app.use(errorHandler);
app.use(errorMessage);
try {
  server.listen(process.env.PORT_URL || 5000);
  console.log(`Connect with the port ${process.env.PORT_URL}`);
} catch (error) {
  console.log(`Cannot Connect with the port ${process.env.PORT_URL}`);
  console.log(error);
}