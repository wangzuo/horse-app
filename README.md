# horse-app
[![Build Status](https://travis-ci.org/wangzuo/horse-app.svg?branch=master)](https://travis-ci.org/wangzuo/horse-app) [![codecov.io](http://codecov.io/github/wangzuo/horse-app/coverage.svg?branch=master)](http://codecov.io/github/wangzuo/horse-app?branch=master)

[WIP] App information and images as a service
``` sh
npm install horse-app --save
```
horse-app works as an express router

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
- GET /horse/info?term={term}&market={market} - Search for app info
- GET /horse/app/{app_id}&market={market} - Get icon & screenshots of app
- GET /horse/logo?key={key}&market={market} - Get the icon of the first app in search result
- GET /horse/logo/{app_id}?market={market} - Get the icon of app

#### Available app markets
- googleplay
- itunes
- wandoujia (China, Android)

#### License
MIT
