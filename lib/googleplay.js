var request = require('request');
var cheerio = require('cheerio');

module.exports = {
  get: function(appId, cb) {
    var link = 'https://play.google.com/store/apps/details?id=' + appId;

    console.log(link);

    request(link, function(err, res) {
      if(err) return cb(err);

      var html = res.body;
      var $ = cheerio.load(html);

      cb(null, {
        logo: $('.cover-container img.cover-image').attr('src'),
        screenshots: $('img.full-screenshot').map(function(i, el) {
          return $(el).attr('src');
        }).get()
      });
    });
  },

  search: function(term, cb) {
    var link = 'https://play.google.com/store/search?c=apps&q='+encodeURIComponent(term);

    request(link, function(err, res) {
      if(err) return cb(err);

      var html = res.body;
      var $ = cheerio.load(html);
      var $cards = $('.card-list > .card');

      var apps = $cards.map(function(i, el) {
        var $el = $(el);
        return {
          id: $el.attr('data-docid'),
          name: $el.find('div.details > a.title').text(),
          icon: $el.find('img.cover-image').attr('src')
        };
      }).get();

      cb(null, apps);
    });
  }
};
