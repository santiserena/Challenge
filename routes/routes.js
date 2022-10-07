const express = require('express')
const axios = require('axios')
const mongoose = require('mongoose')
const Cities = require ("../model/cities"); 
const { request } = require('express');
var responseTime = require('response-time')


const router = express.Router();

//show all cities
router.get('/allcities', async (req, res) => {
    //console.log('ACAA HEADERS-------> ',req.headers);
    const allCities = await Cities.find() 
    res.send (allCities)
    
})

//Gives cities temperature
router.get("/:city", async (req, res) => {
 

  let succes = false;
  let err = 0;

  while (succes === false && err < 3) {
      try {
      //possibility of error 15%
      if (Math.round(Math.random() * 100) <= 15) {
        err++
        console.log('primer error');
        throw new Error("Artificial error -> 15% ");
      }

      const alreadyExist = await Cities.find({ name: req.params.city });
      if (alreadyExist.length) {
        succes = true;
        res.send(alreadyExist);

      } else {
        let info = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${process.env.API_KEY}&units=metric`
        );

        let temperature = info.data.main.temp.toString();

        if (temperature) {
          let saved = await Cities.create({
            name: req.params.city,
            temperature: parseFloat(temperature),
          });
          succes = true;
          res.send("guardado -> " + saved);
        }
      }
    } catch (error) {
      
      console.log('van errores->' , err);
      err++;
    }
}
      if (succes===false && err >= 3) res.status(400).send('ERROR');
});
 
module.exports = router 