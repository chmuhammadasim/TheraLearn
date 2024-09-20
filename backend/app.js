// Load environment variables from .env file
require("dotenv").config();

// Import required modules
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
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xssprotection = require("./middleware/xss-protection");

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Apply custom access control middleware
app.use(accessControl);

// Use Helmet to help secure Express apps with various HTTP headers
app.use(helmet());

// Set up rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: "draft-7", // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(helmet.noSniff()); // Prevent browsers from sniffing MIME types
app.use(limiter); // Apply rate limiting middleware

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Connect to MongoDB if not in test environment
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

// Apply custom XSS protection middleware
app.use(xssprotection);

// Define a simple route to test the server
app.get("/api", function (req, res) {
  res.status(200).send({
    message: "Express backend server",
  });
});

// Define routes for different parts of the application
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/superadmin", superadmin);
app.use("/api/blog", blogRoute);
app.use("/api/query", queryRoute);
app.use("/api/psychologist", psychologistRoute);
app.use("/api/game", gameRoute);

// Apply custom error handling middleware
app.use(errorHandler);
app.use(errorMessage);

// Start the server and listen on the specified port
try {
  server.listen(process.env.PORT_URL || 5000);
  console.log(`Connect with the port ${process.env.PORT_URL}`);
} catch (error) {
  console.log(`Cannot Connect with the port ${process.env.PORT_URL}`);
  console.log(error);
}
