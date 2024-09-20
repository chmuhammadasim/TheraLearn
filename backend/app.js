require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("file-system");
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

app.use(cors());
app.use(accessControl);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.THERALEARN_DB_URL)
    .then(() =>
      console.log(
        `mongoDB connected successfully on ${process.env.THERALEARN_DB_URL}(app.js)`
      )
    )
    .catch((error) => {
      console.error(
        `mongoDB cannot connect on ${process.env.THERALEARN_DB_URL}(app.js)`,
        error
      );
    });
}

app.get("/api", function (req, res) {
  res.status(200).send({
    message: "Express backend server",
  });
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/superadmin", superadmin);
app.use("/api/blog", blogRoute);
app.use("/api/query", queryRoute);
app.use("/api/psychologist", psychologistRoute);
app.use("/api/game", gameRoute);

app.use(errorHandler);
app.use(errorMessage);
try {
  server.listen(process.env.PORT_URL || 5000);
  console.log(`Connect with the port ${process.env.PORT_URL}`);
} catch (error) {
  console.log(`Cannot Connect with the port ${process.env.PORT_URL}`);
  console.log(error);
}
