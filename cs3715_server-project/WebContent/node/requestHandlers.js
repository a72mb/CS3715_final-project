var querystring = require("querystring"),
fs = require("fs");
path = require("path");
var url = require("url");
// Shows the textarea as the first web page
function start(response) {
    console.log("Request handler 'start' was called.");
    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" method="post">'+
        '<textarea name="text" rows="20" cols="60"></textarea>'+
        '<input type="submit" value="Submit text" />'+
        '</form>'+
        '</body>'+
        '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

// Shows tha data from postData on the webpage
function upload(response, postData) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(querystring.parse(postData).text);
    response.end();
}
function show(response, postData) {
    console.log("Request handler 'show' was called.");
    fs.readFile("./tmp/html/main.html", "utf-8", function(error, file) {
        if(error) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(error + "\n");
        response.end();
        } else {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(file, "utf-8");
        response.end();
        }
    }); 
}
function web(response, postData, filename){
    var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};
    
    //console.log("Request handler 'web' was called.");
    fs.exists(filename, function(exists) {
        if(!exists) {
            console.log("not exists: " + filename);
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write('404 Not Found\n');
            response.end();
            return;
        }
        var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
        response.writeHead(200, {'Content-Type':mimeType});

        var fileStream = fs.createReadStream(filename);
        fileStream.pipe(response);

    });/**/
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.web = web;