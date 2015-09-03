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
- /horse/info?term={term} - Search for app info
- /horse/app/{app_id} - Get icon & screenshots of app
- /horse/logo?key={key} - Get the icon of the first app in search result
- /horse/logo/{app_id} - Get the icon of app

#### License
MIT
