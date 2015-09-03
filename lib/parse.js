var request = require('request');
var cheerio = require('cheerio');

module.exports = function(link, cb) {
  request(link, function(err, res) {
    if(err) return cb(err);
    else if (res.statusCode >= 400) return cb(new Error('req fail with ' + res.statusCode));

    var html = res.body;
    var $ = cheerio.load(html);

    cb(null, $);
  });
};
