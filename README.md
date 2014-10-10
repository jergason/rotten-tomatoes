# Rotten Tomatoes

Rotten Tomatoes is a promise-based module for interacting with the
[Rotten Tomatoes api](http://developer.rottentomatoes.com/docs). It runs in
node.js and the browser.

## Installation

npm install --save rotten-tomatoes


## Usage

```JavaScript
var RottenTomatoes = require('rotten-tomatoes');
var rt = new RottenTomatoes('my rotten tomatoes api key');

// Toy Story 3 rotten tomatoes id
rt.get('770672122')
  .then(function (response) {
    console.log('response', response);
  });
```

## API


```JavaScript
// pass in the api key as a string
var rt = new RottenTomatoes(apiKey);

// get a movie by rotten tomatoes id
var promise = rt.get('770672122');

// get 25 search results for 'Toy Story'
promise = rt.search('Toy Story', {page: 1, page_size: 25})

// get the rotten tomatoes info for an imdb id
promise = rt.getByImdbId('0103776');
```

## License

MIT
