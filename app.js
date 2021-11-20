const express = require("express");
const logger = require('morgan');


const app = express();

const loggerType = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(loggerType))

require('dotenv').config();

module.exports = app;
