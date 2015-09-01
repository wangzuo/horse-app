var fs = require('fs');
var path = require('path');
var request = require('request');
var Router = require('express').Router;

var engines = require('./engines');
var engine = engines['wandoujia'];

module.exports = function(options) {
  options = options || {};
  console.log(options.cacheDir);

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
      var img = path.join(options.cacheDir, appId);
      fs.exists(img, function(exists) {
        if(exists) {
          fs.createReadStream(img).pipe(res);
        } else {
          engine.get(appId, function(err, app) {
            console.log(app);
            var r = request(app.logo);
            r.pipe(res);
            r.pipe(fs.createWriteStream(img));
          });
        }
      });
    });
  });

  router.get('/logo/:appId', function(req, res, next) {
    var appId = req.params.appId;
    var img = path.join(options.cacheDir, appId);
    fs.exists(img, function(exists) {
      if(exists) {
        fs.createReadStream(img).pipe(res);
      } else {
        engine.get(appId, function(err, app) {
          var r = request(app.logo);
          r.pipe(res);
          r.pipe(fs.createWriteStream(img));
        });
      }
    });
  });
  

  return router;
};
