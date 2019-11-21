'use-strict';

const express = require('express');
const Router = express.Router();

const user = require('./user');
const category = require('./category');
const transaction = require('./transaction');
const voucher = require('./voucher');

Router.get('/',(req,res)=> {
    res.json({
        message: "Welcome to Backend LinkWae",
    })
})

Router.use('/users',user);
Router.use('/categories',category);
Router.use('/transactions',transaction);
Router.use('/vouchers',voucher);

module.exports = Router;