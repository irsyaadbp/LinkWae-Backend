"use-strict";

require("dotenv/config");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const Router = require("./src/Routes/index");

// Databases
const db = require("./src/Config/connect");

//Text DB
db.authenticate()
  .then(() => {
    console.log("Database Connected.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

const server = express();
const portServer = 5000;
const port = process.env.PORT || portServer;
const nodeEnv = "Development";

server.listen(port, () => {
  console.log(`Server is running in port ${port} in ${nodeEnv} Node`);
});

server.use(logger("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use("/", Router);

module.exports = server;
