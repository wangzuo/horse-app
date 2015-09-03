var request = require('supertest');
var express = require('express');
var app = require('./app');

describe('GET /logo', function() {
  this.timeout(5000);

  it('search with keywords', function(done) {
    request(app)
      .get('/horse/logo?key=chrome&market=itunes')
      .expect(200, done);
  });
});