var assert = require('assert');
var url = require('url');
var RT = require('../');

describe('RottenTomatoes', function() {
  describe('._makeRtUrl', function() {
    it('returns a url with the api key added in the query params', function() {
      var apiKey = 'abcdefg';
      var rt = new RT(apiKey);
      var rtUrl = rt._makeRtUrl('movies.json', {hurp: 'durp', foobar: 'beans'});
      var parsed = url.parse(rtUrl, true);

      assert.equal(parsed.query.apikey, apiKey);
      assert.equal(parsed.query.hurp, 'durp');
      assert.equal(parsed.query.foobar, 'beans');
      assert.equal(rtUrl, 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?hurp=durp&foobar=beans&apikey=abcdefg');
    });
  });
});
