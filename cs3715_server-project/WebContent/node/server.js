var http = require("http");
var url = require("url");
var path = require("path");

function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        
        var full_path = path.join(process.cwd(),pathname);
        //console.log("FULL PATH "+full_path);
        
        request.setEncoding("utf8");
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '"+
            postDataChunk + "'.");
        });
        request.addListener("end", function() {
            route(handle, pathname, response, postData, full_path);
        });
    }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;
