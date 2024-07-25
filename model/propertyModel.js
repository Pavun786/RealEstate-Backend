const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({

    propertyType : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    price : {

        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model("Property",propertySchema)