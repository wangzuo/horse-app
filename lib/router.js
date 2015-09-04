var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var request = require('request');
var Router = require('express').Router;
var markets = require('./markets');

module.exports = function(options) {
  options = options || {};

  var router = Router();

  router.use(function(req, res, next) {
    if(options.cacheDir) {
      mkdirp(options.cacheDir, function(err) {
        if(err) return next(err);
        next();
      });
    };
  });

  router.use(function(req, res, next) {
    // todo: options.defaultMarket | availablemarkets
    var market = req.query.market || 'itunes';
    req._market = markets[market];
    next();
  });

  router.get('/info', function(req, res, next) {
    var market = req._market;

    market.search(req.query.term, function(err, apps) {
      if(err) return next(err);

      res.send(apps.map(function(app) {
        return app.id;
      }));
    });
  });

  router.get('/app/:appId', function(req, res, next) {
    var market = req._market;

    market.get(req.params.appId, function(err, app) {
      if(err) return next(err);
      res.send(app);
    });
  });

  router.get('/logo', function(req, res, next) {
    var market = req._market;
    var key = req.query.key;

    market.search(key, function(err, apps) {
      if(err) return next(err);

      if(!apps.length) return next();

      var appId = apps[0].id;

      var img = path.join(options.cacheDir, appId+'');
      fs.exists(img, function(exists) {
        if(exists) {
          fs.createReadStream(img).pipe(res);
        } else if(market.get) {
          market.get(appId, function(err, app) {
            var r = request(app.logo);
            r.pipe(res);
            r.pipe(fs.createWriteStream(img));
          });
        } else {
          var app = apps[0];
          var r = request(app.logo);
          r.pipe(res);
          r.pipe(fs.createWriteStream(img));
        }
      });
    });
  });

  router.get('/logo/:appId', function(req, res, next) {
    var market = req._market;
    var appId = req.params.appId;
    var img = path.join(options.cacheDir, appId);

    fs.stat(img, function(err) {
      if (!err) {
        fs.createReadStream(img).pipe(res);
      } else if (err.code == 'ENOENT') {
        market.get(appId, function(err, app) {
          if (err) return next(err);

          var r = request(app.logo);
          r.pipe(res);
          r.pipe(fs.createWriteStream(img));
        });
      } else {
        return next(err);
      }
    });
  });

  return router;
};
