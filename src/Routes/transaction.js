'use-strict'

const express = require('express');
const transactionController = require('../Controllers/transaction.js');
const Router = express.Router();

Router.get('/', transactionController.getHistoryAll);
Router.get('/by/:user_id', transactionController.getHistoryAllBy);
Router.post('/', transactionController.postTransaction);
Router.patch('/by/:invoice_no', transactionController.updateTransaction);

module.exports = Router;