'use-strict';

const express = require('express');
const Router = express.Router();

const user = require('./user');
const category = require('./category');

Router.get('/',(req,res)=> {
    res.json({
        message: "Welcome to Backend LinkWae",
    })
})

Router.use('/users',user);
Router.use('/categories',category);

module.exports = Router;