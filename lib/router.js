var fs = require('fs');
var path = require('path');
var request = require('request');
var Router = require('express').Router;

var engines = require('./engines');
var engine = engines['googleplay'];

module.exports = function(options) {
  options = options || {};

  if (options.cacheDir) {
    fs.mkdir(options.cacheDir, function(e) {
      if (e && e.code != 'EEXIST') {
        console.log(e);
      } else {
        console.log('cache files in ' + options.cacheDir);
      }
    });
  };

  var router = Router();

  router.get('/info', function(req, res, next) {
    engine.search(req.query.term, function(err, apps) {
      if(err) return next(err);

      res.send(apps.map(function(app) {
        return app.id;
      }));
    });
  });

  router.get('/app/:appId', function(req, res, next) {
    engine.get(req.params.appId, function(err, app) {
      if(err) return next(err);
      res.send(app);
    });
  });

  router.get('/logo', function(req, res, next) {
    var key = req.query.key;
    engine.search(key, function(err, apps) {
      if(err) return next(err);

      if(!apps.length) return next();

      var appId = apps[0].id;

      var img = path.join(options.cacheDir, appId+'');
      fs.exists(img, function(exists) {
        if(exists) {
          fs.createReadStream(img).pipe(res);
        } else if(engine.get) {
          engine.get(appId, function(err, app) {
            console.log(app);
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
    var appId = req.params.appId;
    var img = path.join(options.cacheDir, appId);
    fs.stat(img, function(err) {
      if (!err) {
        fs.createReadStream(img).pipe(res);
      } else if (err.code == 'ENOENT') {
        engine.get(appId, function(err, app) {
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
