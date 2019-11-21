'use-strict'

const express = require('express');
const categoryController = require('../Controllers/category.js');
const Router = express.Router();

Router.get('/', categoryController.getCategory);
Router.get('/id/:id', categoryController.getCategoryId);
Router.get('/parent/:parent', categoryController.getCategoryParent);
Router.post('/', categoryController.postCategory);
Router.patch('/by/:id', categoryController.updateCategory);

module.exports = Router;