require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const authController = require("./controller/authController");
const applicationController = require('./controller/applicationController');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());

// app.use(cors({
//   origin: 'http://localhost:3000', 
//   credentials: true, 
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// const corsOptions = {
//   origin: 'https://myapp-frontend-u9lq.onrender.com', // This will be the URL of your frontend app
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };

// const corsOptions = {
//   origin: process.env.CORS_ORIGIN,
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };

// app.use(cors(corsOptions));



// const allowedOrigins = ['https://myapp-frontend-u9lq.onrender.com'];
const allowedOrigins = [process.env.CORS_ORIGIN];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // To allow cookies and sessions
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed request methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
};

// Then pass these options to the cors middleware
app.use(cors(corsOptions));

// Enable preflight requests for all routes
app.options('*', cors(corsOptions));

app.post("/login", authController.login);
app.post("/register", authController.register);
app.post("/apply", applicationController.submitApplication);
app.get("/apply", applicationController.handleCompetences);
app.get("/applications", applicationController.listAllApplications);
app.post("/applications", applicationController.setApplicationStatus);

const port = process.env.PORT || 5001;


const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


module.exports = { server };