var axios = require('axios');
var querystring = require('querystring');

var RT_ENDPOINT='http://api.rottentomatoes.com/api/public/v1.0';

function makeRtUrl(rtEndpoint, api, params, apiKey) {
  params.apikey = apiKey;
  return rtEndpoint + '/' +  api + '?' + querystring.stringify(params);
}

// Handle the respones from axios. >= 400 status code is an error, empty
// body is an error
function handleResponse(response) {
  if (!response.status || response.status >= 400) {
    throw new Error('Bad status code: ' + response.status + ' for ' + response.config.url);
  }
  return response.data;
}

function RottenTomato(apiKey) {
  this.apiKey = apiKey;
}

/**
 * Make a an alias call to the RT api. Used to map IMDB ids to RT data for
 * example.
 *
 * @param id String alias id
 * @param type String what type of data this is alised to. Defaults to 'imdb'
 * @return promise for the api result
 */
RottenTomato.prototype.alias = function(id, type) {
  if (!type) {
    type = 'imdb';
  }
  return axios.get(this._makeRtUrl('movie_alias.json', {type: type, id: id})).then(handleResponse)
};

RottenTomato.prototype.getByImdb = function(imdbId) {
  return this.alias.call(this, imdbId);
}

/**
 * Search for searchTerm in the rotten tomatoes api, optionally specifying
 * a page and page_limit
 *
 * @param searchTerm String string to search for
 * @param opts Object hash of options. Can be `page` or `page_limit`
 */
RottenTomato.prototype.search = function(search, params) {
  return axios.get(this._makeRtUrl('movies.json', params)).then(handleResponse);
};

/**
 * Get a movie by rotten tomatoes id.
 *
 * @param id String|Number the rotten tomatoes id
 */
RottenTomato.prototype.get = function(id) {
  return axios.get(this._makeRtUrl('movies/' + id + '.json')).then(handleResponse);
};

RottenTomato.prototype._makeRtUrl = function(apiPath, params) {
  if (!params) {
    params = {};
  }
  return makeRtUrl(RT_ENDPOINT, apiPath, params, this.apiKey);
};

module.exports = RottenTomato;
