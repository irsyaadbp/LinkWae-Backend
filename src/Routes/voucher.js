'use-strict'

const express = require('express');
const voucherController = require('../Controllers/voucher.js');
const Router = express.Router();

Router.get('/', voucherController.getVoucherAll);
Router.get('/by/:code', voucherController.getVoucherBy);
Router.post('/', voucherController.postVoucher);
Router.patch('/by/:code', voucherController.updateVoucherBy);
Router.delete('/by/:code', voucherController.deleteVoucher);


module.exports = Router;