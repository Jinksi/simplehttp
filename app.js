var router = require('./router.js');
var colors = require('colors');
// Problem: we need a simple way to look at a user's badge count and JS points from a web browser

//Solution: Use node.js to perform the profile lookups and serve our templates via HTTP

//1. Create a Web Server
var http = require('http');

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  router.home(request, response);
  router.user(request, response);
}).listen(1337, '127.0.0.1');

console.log('Server running at 127.0.0.1'.green);
