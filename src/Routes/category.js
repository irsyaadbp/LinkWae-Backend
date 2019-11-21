'use-strict'

const express = require('express');
const categoryController = require('../Controllers/category.js');
const Router = express.Router();

Router.get('/', categoryController.getCategory);
Router.get('/id/:id', categoryController.getCategoryId);
Router.get('/parent/:parent', categoryController.getCategoryParent);
Router.post('/', categoryController.postCategory);
Router.put('/:id', categoryController.updateCategory);

module.exports = Router;