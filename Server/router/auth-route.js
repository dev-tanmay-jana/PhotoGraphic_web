const express = require("express");
const router = express();

const AuthControler = require("../controler/auth-controler");
const {signupSchema,loginSchema} = require("../validatiors/auth-validator");
const validate = require("../middlewere/validate-middlewere");
const { authMiddlewere } = require("../middlewere/auth-middlewere");

router.route("/").get(AuthControler.home);

router.route("/signup").post(validate(signupSchema), AuthControler.signup);

router.route("/login").post(validate(loginSchema),AuthControler.login);

router.route("/user").get(authMiddlewere,AuthControler.user);

module.exports = router;