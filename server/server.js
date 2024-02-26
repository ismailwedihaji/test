// require("dotenv").config();

// const express = require("express");
// const cookieParser = require("cookie-parser");
// const authController = require("./controller/authController");
// const applicationController = require('./controller/applicationController');
// const app = express();
// const cors = require("cors");

// app.use(express.json());
// app.use(cookieParser());

// // app.use(cors({
// //   origin: 'http://localhost:3000', 
// //   credentials: true, 
// //   allowedHeaders: ['Content-Type', 'Authorization'],
// // }));

// // const corsOptions = {
// //   origin: 'https://myapp-frontend-u9lq.onrender.com', // This will be the URL of your frontend app
// //   credentials: true,
// //   allowedHeaders: ['Content-Type', 'Authorization'],
// // };

// const corsOptions = {
//   origin: process.env.CORS_ORIGIN,
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };

// app.use(cors(corsOptions));


// // app.use(cors({ origin: '*', credentials: true }));
// // app.use((req, res, next) => {
// //   res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
// //   res.header('Access-Control-Allow-Credentials', 'true');
// //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
// //   if (req.method === 'OPTIONS') {
// //     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
// //     return res.status(200).json({});
// //   }
// //   next();
// // });


// app.post("/login", authController.login);
// app.post("/register", authController.register);
// app.post("/apply", applicationController.submitApplication);
// app.get("/apply", applicationController.handleCompetences);
// app.get("/applications", applicationController.listAllApplications);
// app.post("/applications", applicationController.setApplicationStatus);

// const port = process.env.PORT || 5001;


// const server = app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


// module.exports = { server };


const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send({result: 'No CORS enabled here'});
});
app.get('/cors', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'https://myapp-frontend-u9lq.onrender.com');
  res.send({result: 'This has CORS enabled'});
});
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});