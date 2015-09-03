# horse-app
[![Build Status](https://travis-ci.org/wangzuo/horse-app.svg?branch=master)](https://travis-ci.org/wangzuo/horse-app) [![codecov.io](http://codecov.io/github/wangzuo/horse-app/coverage.svg?branch=master)](http://codecov.io/github/wangzuo/horse-app?branch=master)

[WIP] App information and images as a service
``` sh
npm install horse-app --save
```
horse-app works as an express middleware

``` javascript
var express = require('express');
var horse = require('horse-app');

var app = express();

app.use('/horse', horse({
  cacheDir: __dirname + '/cached'
}));

app.listen(3991, function() {
  console.log('listening on 3991');
});
```

#### Available routes
- http://localhost:3991/horse/logo?key=google

#### License
MIT
