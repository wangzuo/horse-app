var express = require('express');
var request = require('supertest');
var router = require('./');
var app = express();

app.use('/horse', router({
  cacheDir: __dirname + '/cached'
}));

describe('GET /logo', function() {
  this.timeout(5000);

  it('search with keywords', function(done) {
    request(app)
      .get('/horse/logo?key=chrome&market=itunes')
      .expect(200, done);
  });
});