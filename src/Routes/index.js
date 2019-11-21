"use-strict";

const express = require("express");
const user = require("./user");
const article = require("./article");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.json({
    message: "Welcome to Backend LinkWae"
  });
});

Router.use("/users", user);
Router.use("/articles", article);

module.exports = Router;
