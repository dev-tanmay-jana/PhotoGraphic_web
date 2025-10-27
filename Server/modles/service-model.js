const {Schema, model } = require("mongoose");


const serciceSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    brand:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
    inStock:{
        type: String,
        required: true,
    }
});

const Service = model("service", serciceSchema)

module.exports = Service;