require("dotenv").config();
// console.log("MONGO_URI:", process.env.MONGO_URI);
const express = require("express");
const cross = require("cors");
//import routes
const auth_router = require("./router/auth-route");
const contact_router = require("./router/contact-router");
const service_router = require("./router/service-route");
//amdin route
const admin_router = require("./router/admin-route");
//connect db
const connectDb = require("./connections/db");
const errormiddlewere = require("./middlewere/error-middlewere");


const app = express();
const port =process.env.PORT || 8000;

const corsOptions = {
    origin: `*`, // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, // If you need to send cookies or authentication headers
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

//cross origin resource sharing
app.use(cross(corsOptions));
//middlewere
app.use(express.json());

app.use("/", auth_router, contact_router, service_router);
app.use("/admin", admin_router);

app.use(errormiddlewere);
const isconnected = require("mongoose").connection.readyState;
if(isconnected){
    console.log("Already connected to mongo db");       
}else{
    connectDb();
        // .then( () =>{
        //     app.listen(port, ()=>{
        //         console.log(`server started at: http://localhost:${port}`);
        //     });
        // });
}
//start server
module.exports = app;