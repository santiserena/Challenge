import express from "express";
import axios from "axios";
import cities from "../model/cities.js";
import mongoose from "mongoose";



/* PROTEGER */ const apiKey = '302115177249219dbfaf573dfddd63ac'

const router = express.Router();


//Gives cities temperature

/* router.get('/algo', (req, res) => {
    res.send ('ruta temporal')

}) */

router.get("/:city", async (req, res) => {
    
    //try {

        /* const creacion = cities({name:req.params.city}) //aca lo crearía
        creacion.save().then( data => res.json(data)).catch( err => console.log(err)) */

        const nvo = await createListing(cities,
            {
                name: "prueba",
            }
        );
        
      //  let info = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${apiKey}&units=metric`)
        //let temperature = info.data.main.temp.toString()
        //res.send(temperature)
        //res.send('holaa ' + process.env.MONGODB_URI)
        
    //} catch (error) {
      //  console.log(error.message);
        //res.status(400).send(error.message);
   // }
    
});
 



export default router;