const express = require("express");
const axios = require("axios");
const Cities = require("../model/cities");

const router = express.Router();

// UNCOMMENT TO SEE IN THIS ENDPOINT THE DB DOCUMENTS
/* router.get("/allcities", async (req, res) => {
  const allCities = await Cities.find();
  res.send(allCities);
}); */

router.get("/:city", async (req, res) => {
  let succes = false;
  let err = 0;

  while (succes === false && err < 3) {
    try {
      const alreadyExist = await Cities.find({ name: req.params.city });
      if (alreadyExist.length) {
        succes = true;
        res.send(
          `The temperature consulted is ${alreadyExist[0].temperature} degrees. Source: DB`
        );
      } else {
        //possibility of error 15%:
        if (Math.round(Math.random() * 100) <= 15) {
          throw new Error("Simulated bug -> 15% ");
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
            res.send(
              `The temperature consulted is ${saved.temperature} degrees. Source: API weather`
            );
          }
        }
      }
    } catch (error) {
      console.log("Error counter ->", err);
      err++;
    }
  }
  if (succes === false && err >= 3)
    res
      .status(400)
      .send(
        "ERROR: There were three failures in the external api, or the city does not exist"
      );
});
module.exports = router;
