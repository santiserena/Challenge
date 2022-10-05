// TO RUN--->  npm start

import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/routes.js";

dotenv.config();

var app = express();

const port = 3000;
app.listen(port, () => console.log("Listening on port", port));

//MIDDLEWARES
app.use(express.json())
app.use("/api", userRoutes);



mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log("Connect to MongoDB Atlas"))
.catch((error) => console.log(error));

export default app;
