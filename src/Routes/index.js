'use-strict';

const express = require('express');
const user = require('./user');
const Router = express.Router();

Router.get('/',(req,res)=> {
    res.json({
        message: "Welcome to Backend LinkWae",
    })
})

Router.use('/users',user)

module.exports = Router;