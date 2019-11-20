"use-strict";

const express = require("express");
const userController = require("../Controllers/user.js");
const Router = express.Router();
const { upload } = require("../Middleware/UploadImage");
// const uploadImage = upload.single("image");

Router.get("/", userController.getUser);

// Get User
Router.get("/phone/:phone", userController.getUserByPhone);
Router.get("/id/:user_id", userController.getUserById);

// Authentication
Router.post("/checkAuth", userController.checkUserAuth);
Router.post("/verifyOtp", userController.verifyOtp);
Router.post("/register", upload.single("image"), userController.register);
Router.post("/login", userController.login);

Router.post("/sendOtpEmail", userController.sendOtpEmail);

/* Forgot Password
 *
 * Old
 * Router.post("/forgotPin", userController.forgotPin);
 *
 * New
 * Please Request otp email to access /sendOtpEmail
 */
Router.post("/resetPin", userController.resetPin);

/* Verify Email
 *
 * Old
 * Router.post("/requestVerifyEmail", userController.sendOtpVerifyEmail);
 *
 * New
 * Please Request otp email to access /sendOtpEmail
 */
Router.post("/verifyEmail", userController.updateVerifyEmail);

Router.post("/requestToken", userController.requestTokenUser);

// Router.post("/sendOtpSms", userController.sendOtpSms);

module.exports = Router;
