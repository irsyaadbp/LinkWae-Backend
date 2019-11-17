'use-strict';

const express = require('express');
const userController = require('../Controllers/user.js');
const Router = express.Router();

Router.get('/', userController.getUser);

module.exports = Router;