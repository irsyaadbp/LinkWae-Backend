'use-strict';

require('dotenv/config');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const Router = require('./src/Routes/index');

const server = express();
const portServer = 8000;
const port = process.env.PORT || portServer;
const nodeEnv = 'Development';

server.listen(port, ()=>{
	console.log(`Server is running in port ${port} in ${nodeEnv} Node`);
});

server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));

server.use('/', Router);

module.exports = server;