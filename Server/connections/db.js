const mongoose = require("mongoose");



// const URI = && "mongodb://127.0.0.1:27017/MernStack";

const URI = process.env.MONGO_URI;

const connectDb = async () => {
    try {
        // console.log("Connecting to:", URI);
        await mongoose.connect(URI);
        console.log("Connect to mongo db");
        
    } catch (error) {
        console.log(error);
        process.exit(0);
    }

};

module.exports = connectDb;