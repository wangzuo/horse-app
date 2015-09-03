var express = require('express');
var router = require('./');

var app = express();

app.use('/horse', router({
  cacheDir: __dirname + '/cached'
}));

module.exports = app;