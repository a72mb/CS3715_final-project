function route(handle, pathname, response, postData, full_path) {
  //console.log("About to route a request for " + pathname);
  var newpath=pathname.substring(0, 4); //Gets stuff in the /tmp/ directory

  if(typeof handle[newpath]==='function'){
    handle[newpath](response, postData, full_path);
  }
  else{
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;