var parse = require('./parse');

module.exports = {
  get: function(appId, cb) {
    var link = 'http://www.wandoujia.com/apps/' + appId;

    parse(link, function(err, $) {
      if(err) return cb(err);

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

    parse(link, function(err, $) {
      if(err) return cb(err);

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
