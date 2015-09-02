var express = require('express');
var router = require('./');

var app = express();

app.use('/horse', router({
  cacheDir: __dirname + '/cached'
}));

app.listen(3991, function() {
  console.log('listening on 3991');
});

