require("dotenv").config();
// console.log("MONGO_URI:", process.env.MONGO_URI);
const express = require("express");
const cors = require("cors");
//import routes
const auth_router = require("./router/auth-route");
const contact_router = require("./router/contact-router");
const service_router = require("./router/service-route");
//admin route
const admin_router = require("./router/admin-route");
//connect db
const connectDb = require("./connections/db");
const errormiddlewere = require("./middlewere/error-middlewere");
const { is } = require("zod/v4/locales");


const app = express();
const port =process.env.PORT || 8000;

const corsOptions = {
    origin: `*`, // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, // If you need to send cookies or authentication headers
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

//cross origin resource sharing
app.use(cors(corsOptions));
//middleware
app.use(express.json());

app.use("/", auth_router, contact_router, service_router);
app.use("/admin", admin_router);

app.use(errormiddlewere);

// const startServer = async () => {
//     try {
//         await connectDb();
//         app.listen(port, () => {
//             console.log(`Server is running at http://localhost:${port}`);
//         });
//     } catch (error) {
//         console.error("Error starting server:", error);
//         process.exit(1);
//     }
// };
// const isconnected = require("mongoose").connection.readyState;
// if (!isconnected){
//     startServer();
// }else{
//     console.log("Server already connected to database");
// }

const isconnected = require("mongoose").connection.readyState;

async function startServer() {
    try {
        if (!isconnected) {
            await connectDb();
        } else {
            console.log("Server already connected to database");
        }
        isconnected= true;
        console.log(`Server is started`);
    } catch (error) {
        console.error("Error starting server:", error);
        // process.exit(1);
    }
};

app.use((req, res, next) => {
    if (!isconnected) {
        startServer().then(() => next());
    } else {
        next();
    }
});


module.exports = app;