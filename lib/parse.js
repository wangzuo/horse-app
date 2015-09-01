var request = require('request');
var cheerio = require('cheerio');

module.exports = function() {
  request(link, function(err, res) {
    if(err) return cb(err);

    var html = res.body;
    var $ = cheerio.load(html);

    cb(null, {
      logo: $('.app-icon > img').attr('src'),
      screenshots: $('.screenshot .overview > img').map(function(i, el) {
        return $(el).attr('src');
      }).get()
    });
  });
};
