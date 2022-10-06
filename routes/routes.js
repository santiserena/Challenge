const express = require('express')
const axios = require('axios')
const mongoose = require('mongoose')
const Cities = require ("../model/cities") 

const router = express.Router();

//show all cities
router.get('/allcities', async (req, res) => {
    const allCities = await Cities.find() 
    res.send (allCities)
    
})

//Gives cities temperature
router.get("/:city", async (req, res) => {
    
    try {
        
      const alreadyExist = await Cities.find({name: req.params.city})
      if (alreadyExist.length) res.send(alreadyExist) 

      else {

        let info = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${process.env.API_KEY}&units=metric`)
        let temperature = info.data.main.temp.toString()
        
        if (temperature){
            let saved = await Cities.create({name: req.params.city, temperature: parseFloat(temperature)})
            res.send('guardado -> ' + saved)
        }
    }
 
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
});
 
module.exports = router 