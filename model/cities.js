import mongoose from "mongoose";

const citiesSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

export default mongoose.model('cities', citiesSchema); 