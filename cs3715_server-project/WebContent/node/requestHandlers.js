var querystring = require("querystring"),
fs = require("fs");

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
    
    /**This is the code to write to a file. It doesn't go here, but I need to figure out where to put it :)*/
    //fs.appendFile('message.txt', 'data to append', function (err) {
    //	  if (err) throw err;
    //	  console.log('The "data to append" was appended to file!');
    //});
}
exports.start = start;
exports.upload = upload;
exports.show = show;
