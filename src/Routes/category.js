'use-strict'

const express = require('express');
const categoryController = require('../Controllers/category.js');
const Router = express.Router();

Router.get('/', categoryController.getCategory);
Router.get('/by/:id', categoryController.getCategoryId);
Router.post('/', categoryController.postCategory);
Router.put('/by/:id', categoryController.updateCategory);
Router.delete('/by/:id', categoryController.deleteCategory);

module.exports = Router;