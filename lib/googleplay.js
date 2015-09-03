var parse = require('./parse');

module.exports = {
  get: function(appId, cb) {
    var link = 'https://play.google.com/store/apps/details?id=' + appId;

    parse(link, function(err, $) {
      if(err) return cb(err);

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

    parse(link, function(err, $) {
      if(err) return cb(err);

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
