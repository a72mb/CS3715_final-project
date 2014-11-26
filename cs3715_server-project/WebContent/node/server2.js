var sys = require("sys");
var my_http = require("http");
var path = require("path");
var url = require("url");
var filesys = require("fs");

/* 
	start: 					export function
	onRequest: 			request for create server
	fileCtrl:				check the file exist or not by full path name
	fileException:	log the error message
*/
function start(route, handle){
	function onRequest(request, response){
		function fileCtrl(exists){
			function fileException(err, file){
				if(err){
					response.writeHeader(500, {"Content-Type": "text/plain"});  
					response.write(err + "\n");  
					response.end();  
				}  
				else{
					response.writeHeader(200);  
					response.write(file, "binary");  
					response.end();
				}
			}
			if(!exists){
				response.writeHeader(404, {"Content-Type": "text/plain"});  
				response.write("404 Not Found\n");  
				response.end();
			}
			else{
				filesys.readFile(full_path, "binary",fileException);
			}
		}
		var my_path = url.parse(request.url).pathname;
		var full_path = path.join(process.cwd(),my_path);
		console.log("Request for " + my_path + " received.");

		filesys.exists(full_path,fileCtrl);
		
		var postData="";
		
		request.setEncoding("utf8");
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '"+
            postDataChunk + "'.");
        });
	}
	my_http.createServer(onRequest).listen(8888);
	console.log("Server Running on 8888");
}

exports.start = start;	