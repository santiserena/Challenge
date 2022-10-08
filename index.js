// TO RUN-->  npm start

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/routes.js");
var responseTime = require("response-time");

var app = express();

const port = 3000;
app.listen(port, () => console.log("Listening on port", port));

//MIDDLEWARES
app.use(responseTime());
app.use(express.json());
app.use("/api", userRoutes);

mongoose
  .connect("mongodb+srv://Santiago:123@cluster0.l6oc7ti.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("Connect to MongoDB Atlas"))
  .catch((error) => console.log(error));
