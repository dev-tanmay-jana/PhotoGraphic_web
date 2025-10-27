const express = require("express");
const router = express();

const AuthControler = require("../controler/auth-controler");
const signupSchema = require("../validatiors/auth-validator");
const validate = require("../middlewere/validate-middlewere");
const { authmiddlewere } = require("../middlewere/auth-middlewere");

router.route("/").get(AuthControler.home);

router.route("/signup").post(validate(signupSchema), AuthControler.signup);

router.route("/login").post(AuthControler.login);

router.route("/user").get(authmiddlewere,AuthControler.user);

module.exports = router;