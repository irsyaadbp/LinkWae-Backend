'use-strict'

const express = require('express');
const merchantController = require('../Controllers/merchant.js');
const Router = express.Router();

Router.get('/', merchantController.getMerchant);
Router.get('/by/:id', merchantController.getMerchantId);
Router.post('/', merchantController.postMerchant);
Router.put('/by/:id', merchantController.updateMerchant);
Router.delete('/by/:id', merchantController.deleteMerchant);

module.exports = Router;