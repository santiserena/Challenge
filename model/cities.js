const mongoose = require("mongoose");

const citiesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("cities", citiesSchema);
