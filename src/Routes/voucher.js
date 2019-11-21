'use-strict'

const express = require('express');
const voucherController = require('../Controllers/voucher.js');
const Router = express.Router();

Router.get('/', voucherController.getVoucherAll);
Router.get('/:code', voucherController.getVoucherBy);
Router.post('/', voucherController.postVoucher);
Router.put('/:code', voucherController.updateVoucherBy);
Router.delete('/:code', voucherController.deleteVoucher);


module.exports = Router;