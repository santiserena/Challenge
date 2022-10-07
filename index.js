// TO RUN-->  npm start

require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/routes.js')
var responseTime = require('response-time')

var app = express();

const port = 3000;
app.listen(port, () => console.log("Listening on port", port));

//MIDDLEWARES
app.use(responseTime())
app.use(express.json())
app.use("/api", userRoutes);

mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log("Connect to MongoDB Atlas"))
.catch((error) => console.log(error));