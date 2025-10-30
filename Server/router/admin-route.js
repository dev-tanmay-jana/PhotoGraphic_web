const express = require('express');
const router = express.Router();

// Import the admin controller
const AdminController = require("../controler/admin-controler.js");
// Import middlewares
const {authMiddlewere} = require("../middlewere/auth-middlewere");
const {adminMiddleware} = require("../middlewere/admin-middlewere.js");

router.route("/users").get(authMiddlewere, adminMiddleware, AdminController.getAllUsers);
router.route("/contacts").get(authMiddlewere,adminMiddleware, AdminController.getAllContacts);

router.route("/contacts/delete/:id").delete(authMiddlewere, adminMiddleware, AdminController.deleatContactById);
// Delete user by id
router.route("/users/delete/:id").delete(authMiddlewere, adminMiddleware, AdminController.deleatUserById);
// get single user by id
router.route("/users/:id").get(authMiddlewere, adminMiddleware, AdminController.getUserById);
// Update user by id - to be implemented
router.route("/users/update/:id").patch(authMiddlewere, adminMiddleware, AdminController.updateUserById);

module.exports = router;