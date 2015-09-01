var request = require('request');

module.exports = itunes = {
  search: function(term, cb) {
    var link = 'https://itunes.apple.com/search?term='+encodeURIComponent(term)+'&country=cn&entity=software';

    console.log('downloading from', link);

    request(link, function(err, res) {
      if(err) return cb(err);
      var data = JSON.parse(res.body);
      cb(null, data.results.map(function(app) {
        return {
          id: app.trackId,
          logo: app.artworkUrl60,
          screenshots: app.screenshotUrls
        };
      }));
    });
  }
};
