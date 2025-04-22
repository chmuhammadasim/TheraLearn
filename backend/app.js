require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const accessControl = require("./middleware/access-controls");
const errorHandler = require("./middleware/error-handler");
const errorMessage = require("./middleware/error-message");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const superadmin = require("./routes/superadmin.route");
const blogRoute = require("./routes/blog.route");
const gameRoute = require("./routes/game.route");
const psychologistRoute = require("./routes/psychologist.route");
const queryRoute = require("./routes/query.route");
const contentRoute = require("./routes/content.route");
const psychologistpatientRoute = require("./routes/patientpsychologist");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xssprotection = require("./middleware/xss-protection");
const mongoSanitize = require("express-mongo-sanitize");


const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
app.use(cors());
app.use(accessControl);
app.use(helmet());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "100kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "100kb" }));

app.use(mongoSanitize());
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.THERALEARN_DB_URL, clientOptions)
    .then(() =>
      console.log(
        `MongoDB connected successfully on ${process.env.THERALEARN_DB_URL}(app.js)`
      )
    )
    .catch((error) => {
      console.error(
        `MongoDB cannot connect on ${process.env.THERALEARN_DB_URL}(app.js):`,
        error.message
      );
      process.exit(1);
    });
}

app.use(xssprotection);
app.get("/api", function (req, res) {
  res.status(200).send({
    message: "Express backend server",
  });
});
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  })
);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/superadmin", superadmin);
app.use("/api/blog", blogRoute);
app.use("/api/query", queryRoute);
app.use("/api/psychologist", psychologistRoute);
app.use("/api/game", gameRoute);
app.use("/api/content", contentRoute);
app.use("/api/psychologistpatient", psychologistpatientRoute);

app.use((_req, res, next) => {
  res.status(404).send({
    error: "Not Found",
    message: "The requested resource could not be found.",
  });
  next();
});
app.use(errorHandler);
app.use(errorMessage);
server.listen(process.env.PORT_URL || 5000, (error) => {
  if (error) {
    console.error(
      `Cannot Connect with the port ${process.env.PORT_URL}:`,
      error.message
    );
  } else {
    console.log(`Connected with the port ${process.env.PORT_URL}`);
  }
});