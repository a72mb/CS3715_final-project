window.onload = init;
var pathArray = this.location.pathname.split( '/' );
var callingPage = pathArray[pathArray.length-1];
var entries=null;
// url is the path to access json file
var url = "/tmp/request/posts.json";
// build up the dictionary for searching 
var id = {
	"Blogger1": ["blogger1", "entry1"],
	"Blogger2": ["blogger2", "entry2"]
};
var title = {
	"withData.html": ["iWatch"],
	"Article_iWatch.html": ["iWatch"],
	"Article_Scottish.html" : ["scottish"],
	"Article_SocialResearch.html" : ["social"],
	"Article_Syria_Iraq.html" : ["syria"]
};

function init() {
	getEntries();
}

function getEntries() {
	// XMLHttpRequest object: retrieve data from URL without having to do full page refresh
	var request = new XMLHttpRequest();
	// for open method: GET, POST, PUT, DELETE
	request.open("GET", url);
	// status == 200 for successful request
	request.onload = function() {
		if (request.status == 200) {
			// request.responseText will be the context of the posts.json
			updateEntries(request.responseText);
		}
	};
	request.send(null);
}

function updateEntries(responseText) {
	var entriesDiv = document.getElementById("listComment");
	var deletedDiv = document.getElementById("deletedItems");
	// JSON.parse, convert the string into a JavaScript object
	entries = JSON.parse(responseText);
	var article = title[callingPage];
	
	for (var i = 0; i < entries.length; i++) {
		var photo="";
		var mapId="";
		var entry = entries[i];
		var div = document.createElement("div");
		if(entry.article == article){
			// Setting the value for each case
			if(entry.identity in id){
				div.setAttribute("class", id[entry.identity][1])
				photo = id[entry.identity][0]
			}
			else{
				div.setAttribute("class", "guest");
				photo="guest";
			}
			mapId="map1"+i;

            div.setAttribute("id",entry.id);
			div.innerHTML += '<div class="photo"><a href="../img/'+photo+'.png"><img src="../img/'+photo+'.png" title="'+photo+'" alt="'+photo+'"></a></div>';
			div.innerHTML += '<div class="content"><h3>'+entry.name+'</h3><p>'+entry.comment+'</p></div>';
			
			if(entry.deleted!=1){
				div.innerHTML += '<img src="../img/delete.png" onclick="deleteItem(this);" class="icon" title="Click to delete">';
				div.innerHTML += '<div id="'+mapId+'" class="maps" style="float:none;"></div>';
				entriesDiv.appendChild(div);
				showMap(entry.location, mapId);
			}
			else{
				deletedDiv.appendChild(div);
			}
		}
	}
}
function changeDeleteFlag(identity) {
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    if(entry.id == identity){
        entry.deleted="1";
    }
  }
  saveJsonChanges();
}

function saveJsonChanges(){
    var request = new XMLHttpRequest();
	request.open("POST", url);
	request.send(JSON.stringify(entries));  /*From what I can tell, this should save the file. It doesn't. What am I doing wrong?*/
}