const services = require("../controler/service-controler");

const express  =require("express");
const router = express.Router();

router.route("/service").get(services);

module.exports = router;