var request = require('request');
var cheerio = require('cheerio');

module.exports = {
  get: function(appId, cb) {
    var link = 'http://www.wandoujia.com/apps/' + appId;

    console.log(link);

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
  },

  search: function(term, cb) {
    var link = 'http://www.wandoujia.com/search?key='+encodeURIComponent(term)+'&source=search';

    request(link, function(err, res) {
      if(err) return cb(err);

      var html = res.body;
      var $ = cheerio.load(html);
      var $cards = $('#j-search-list > li.card');

      var apps = $cards.map(function(i, el) {
        var $el = $(el);
        return {
          id: $el.attr('data-pn'),
          name: $el.find('.app-desc > a.name').text(),
          icon: $el.find('.icon-wrap img.icon').attr('src'),
          desc: $el.find('.app-desc .comment').text()
        };
      }).get();

      cb(null, apps);
    });
  }
};
