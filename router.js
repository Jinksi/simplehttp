var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require('querystring');

var commonHeader = {'Content-Type' : 'text/html'};

//Handle HTTP route GET / and POST / i.e. Home
  function home(request, response){
  //if url === "/" && GET
  if(request.url === "/"){
    if (request.method.toLowerCase() === "get"){
      //show search
      response.writeHead(200, commonHeader);
      renderer.view('header', {}, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    } else {
      //if url === '/" && POST
      var body = "";
      request.on('data', function(body){
        var query = querystring.parse(body.toString());
        response.writeHead(303, {'Location' : "/" + query.username});
        response.end();
      });
      // get post data from body
      // extract username
        //redirect to /:username
    }
  }
}
//Handle HTTP route GET /:username i.e. ericjinks
  function user(request, response){
    //if url == "/..."
    var username = request.url.replace('/', '');
    if (username.length > 0){
      response.writeHead(200, commonHeader);
      renderer.view('header', {}, response);

      var studentProfile = new Profile(username);
      //get json from treehouse
          //on end
      studentProfile.on("end", function(profileJSON){
        //show profile

        // store the values
        var values = {
          avatarURL : profileJSON.gravatar_url,
          username : profileJSON.name,
          badgeCount : profileJSON.badges.length,
          jsPoints : profileJSON.points.JavaScript
        };

        // render
        renderer.view('profile', values, response);
        renderer.view('footer', {}, response);
        response.end();

      });

      //on error

      studentProfile.on("error", function(error){
              //show error
              renderer.view('error', {errorMessage: error.message}, response);
              renderer.view('search', {}, response);
              renderer.view('footer', {}, response);
              response.end();

      });

      // response.write(username + '\n');
      // response.end('Footer\n');

    }
}

module.exports.home = home;
module.exports.user = user;
