"use-strict";

const express = require("express");
const userController = require("../Controllers/user.js");
const Router = express.Router();
const { upload } = require("../Middleware/UploadImage");
// const uploadImage = upload.single("image");

Router.get("/", userController.getUser);

// Get User
Router.get("/by/:phone", userController.getUserByPhone);
Router.get("/by/:user_id", userController.getUserById);

// Authentication
Router.post("/checkAuth", userController.checkUserAuth);
Router.post("/verifyOtp", userController.verifyOtp);
Router.post("/register", upload.single("image"), userController.register);
Router.post("/login", userController.login);

// Forgot Password
Router.post("/forgotPin", userController.forgotPin);
Router.post("/resetPin", userController.resetPin);

module.exports = Router;
