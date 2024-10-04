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
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter); // Apply rate limiting middleware

// Prevent browsers from sniffing MIME types
app.use(helmet.noSniff()); 
app.use(helmet.hidePoweredBy()); // Remove the X-Powered-By header

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
    .connect(process.env.THERALEARN_DB_URL,)
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
      process.exit(1); // Exit process with failure
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

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).send({
    error: "Not Found",
    message: "The requested resource could not be found.",
  });
});

// Apply custom error handling middleware
app.use(errorHandler);
app.use(errorMessage);

// Start the server and listen on the specified port
server.listen(process.env.PORT_URL || 5000, (error) => {
  if (error) {
    console.error(`Cannot Connect with the port ${process.env.PORT_URL}:`, error.message);
    process.exit(1); // Exit process with failure
  } else {
    console.log(`Connected with the port ${process.env.PORT_URL}`);
  }
});
