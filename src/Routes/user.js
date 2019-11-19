"use-strict";

const express = require("express");
const userController = require("../Controllers/user.js");
const Router = express.Router();

Router.get("/", userController.getUser);

// Get User
Router.get("/by/:phone", userController.getUserByPhone);
Router.get("/by/:user_id", userController.getUserById);

// Authentication
Router.post("/checkAuth", userController.checkUserAuth);
// Router.post("/verifyOtp", userController.verifyOtp);
Router.post("/register", userController.register);
Router.post("/login", userController.login);

module.exports = Router;
