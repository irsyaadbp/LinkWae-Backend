"use-strict";

const express = require("express");
const transactionController = require("../Controllers/transaction.js");
const Router = express.Router();

Router.get("/", transactionController.getHistoryAll);
Router.get("/user/:user_id", transactionController.getHistoryByUser);
Router.get("/id/:transaction_id", transactionController.getHistoryById)
Router.post("/", transactionController.postTransaction);
Router.put("/:invoice_no", transactionController.updateTransaction);

module.exports = Router;
