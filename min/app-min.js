var router=require("./router.js"),http=require("http");http.createServer(function(e,r){r.writeHead(200,{"Content-Type":"text/plain"}),router.home(e,r),router.user(e,r)}).listen(1337,"127.0.0.1"),console.log("Server running at http://<wordpsace-url>");