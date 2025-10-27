const Service = require("../modles/service-model");
const Contact = require("../modles/service-model");

const services = async (req,res) =>{
    try {
        const response = await Service.find();
        if(!response){
            res.status(404).json({msg:"No Dta found"});
            return;
        }
        res.status(200).json({msg: response});
    } catch (error) {
        console.log(error);
    }
};

module.exports = services;