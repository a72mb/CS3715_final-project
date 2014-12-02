var http = require("http");
var url = require("url");
var path = require("path");
fs = require("fs");

function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        
        var full_path = path.join(process.cwd(),pathname);
        
        request.setEncoding("utf8");
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            //console.log("Received POST data chunk '"+postDataChunk + "'.");
            var firstSplit = postDataChunk.split("&");
            var secondSplit=Array();
            for(var i=0;i<firstSplit.length;i++){
            	secondSplit.push(firstSplit[i].split("="));
            }

            var rv={};
            for(var i=0; i<secondSplit.length;i++){
            	for(var j=0; j<secondSplit[i].length;j++){
            		if(secondSplit[i][0]=="date")
            			rv['date']="12/02/2014";
            		else if(secondSplit[i][0]=="article")
            			rv['article']=secondSplit[i][j];
            		else if(secondSplit[i][0]=="identity")
            			rv['identity']=secondSplit[i][j];
            		else if(secondSplit[i][0]=="fullname")
            			rv['name']=secondSplit[i][j];
            		else if(secondSplit[i][0]=="comment")
            			rv['comment']=secondSplit[i][j];
            		else if(secondSplit[i][0]=="location"){
            			rv['location']={'latitude':'53','longitude':'0'};
            		}
            		else if(secondSplit[i][0]=="deleted")
            			rv['deleted']=secondSplit[i][j];
            	}
            }
            var json = JSON.stringify(rv);
            save(json);
        });
        request.addListener("end", function() {
            route(handle, pathname, response, postData, full_path);
        });
    }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started on port 8888.");
}
function save(dataToSave){
	var jsonfile = require('./tmp/request/posts.json');
	var jsonstring = JSON.stringify(jsonfile);
	jsonstring=jsonstring.substring(0,jsonstring.length-1);
	jsonstring = jsonstring+",\n"+dataToSave+"\]";//console.log(jsonstring);
    fs.writeFile('tmp/request/posts.json', jsonstring, function (err) {
    	  if (err) throw err;
    	  console.log('The data was appended to json file!');
    });
}

exports.start = start;