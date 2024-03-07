/**
 * Load environment variables from .env file
 */
require("dotenv").config();

/**
 * Set up the backend server with necessary modules:
 * Import the express module to create an Express application for the backend server.
 * This server handles the API requests for user authentication, application processing, and other backend functionalities.
 */
const express = require("express");
const cookieParser = require("cookie-parser");
const authController = require("./controller/authController");
const applicationController = require("./controller/applicationController");
const authenticateToken = require('./middlewareProtection'); 
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(cookieParser());


/** 
 * Import the CORS middleware to enable Cross-Origin Resource Sharing for the application,
 * allowing the frontend to communicate with the backend server from different origins.
 */

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

/**
 * Defines routes for login, registration, and application handling with authentication.
 */
app.post("/login", authController.login);
app.post("/register", authController.register);
app.post("/apply",authenticateToken, applicationController.submitApplication);
app.get("/apply",authenticateToken, applicationController.handleCompetences);
app.get("/applications",authenticateToken, applicationController.listAllApplications);
app.post("/applications",authenticateToken, applicationController.setApplicationStatus);

const port = process.env.PORT || 5001;

/**
 * Starts the server on the specified port.
 */
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { server };
