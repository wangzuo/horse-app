var request = require('supertest');
var express = require('express');
var app = require('./app');

describe('GET /logo', function() {
  this.timeout(10000);

  it('search with keywords from itunes', function(done) {
    request(app)
      .get('/horse/logo?key=chrome&market=itunes')
      .expect(200, done);
  });

  it('search with keywords from googleplay', function(done) {
    request(app)
      .get('/horse/logo?key=chrome&market=googleplay')
      .expect(200, done);
  });

  it('search with keywords from wandoujia', function(done) {
    request(app)
      .get('/horse/logo?key=chrome&market=wandoujia')
      .expect(200, done);
  });
});

describe('GET /search', function() {
  this.timeout(10000);

  it('search with keywords from itunes', function(done) {
    request(app)
      .get('/horse/search?key=chrome&market=itunes')
      .expect(200, done);
  });

  it('search with keywords from googleplay', function(done) {
    request(app)
      .get('/horse/search?key=chrome&market=googleplay')
      .expect(200, done);
  });

  it('search with keywords from wandoujia', function(done) {
    request(app)
      .get('/horse/search?key=chrome&market=wandoujia')
      .expect(200, done);
  });
});

describe('GET /app/:appId', function() {
});

describe('GET /logo/:appId', function() {
});