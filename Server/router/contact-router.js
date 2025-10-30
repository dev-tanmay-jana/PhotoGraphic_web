const express = require("express");
const router = express.Router();
const ContactControler = require("../controler/contact-controler");

router.route("/contact").post(ContactControler);

module.exports = router;