//DESINSTALAR const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');
//const morgan = require('morgan');

// TO RUN--->  npm start

require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/routes.js')
var responseTime = require('response-time')

var StatsD = require('node-statsd')

var stats = new StatsD()


var app = express();

const port = 3000;
app.listen(port, () => console.log("Listening on port", port));

//MIDDLEWARES

/* app.use(responseTime((req, res, time) => {
    console.log(time);
    req.headers.delay = time
    //res.setHeader('late', time)
    console.log('ESTOS SON LOS HEADERS DEL MIDDLEWARE-> ',req.headers);
})) */

app.use(responseTime())

/* app.use((req, res, next) =>{
    req.headers.delay2 = 'hola'
    next();
  }) */
  
app.use(express.json())
app.use("/api", userRoutes);


mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log("Connect to MongoDB Atlas"))
.catch((error) => console.log(error));

//export default app;
