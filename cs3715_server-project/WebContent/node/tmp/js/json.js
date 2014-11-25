window.onload = init;
var pathArray = this.location.pathname.split( '/' );
var callingPage = pathArray[pathArray.length-1];console.log(callingPage);
var entries=null;
var url = "http://www.pcglabs.mun.ca/~a72mb/CS3715/mb/request/posts.json";
function init() {
	getEntries();
}

function getEntries() {
	//var url = "http://www.pcglabs.mun.ca/~a72mb/CS3715/mb/request/posts.json";
	var request = new XMLHttpRequest();
	request.open("GET", url);
	request.onload = function() {
		if (request.status == 200) {
			updateEntries(request.responseText);
		}
	};
	request.send(null);
}

function updateEntries(responseText) {
	var entriesDiv = document.getElementById("listComment");
	var deletedDiv = document.getElementById("deletedItems");
	entries = JSON.parse(responseText);
	var article = "";
	switch(callingPage) {
	    case "withData.html":
	        article="iWatch";
	        break;
	    case "Article_iWatch.html":
	    	article="iWatch";
	        break;
	    case "Article_Scottish.html":
	    	article="scottish";
	        break;
	    case "Article_SocialResearch.html":
	    	article="social";
	        break;
	    case "Article_Syria_Iraq.html":
	    	article="syria";
	        break;
	    default:
	    	article="";
	}
	
	for (var i = 0; i < entries.length; i++) {
		var photo="";
		var mapId="";
		var entry = entries[i];
		var div = document.createElement("div");
		if(entry.article == article){
			if(entry.identity=="Blogger1"){
				div.setAttribute("class", "entry1");
				photo="blogger1";
				mapId="map1"+i;
			}
			else if(entry.identity=="Blogger2"){
				div.setAttribute("class", "entry2");
				photo="blogger2";
				mapId="map2"+i;
			}
			else{
				div.setAttribute("class", "guest");
				photo="guest";
				mapId="mapg"+i;
			}
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
function changeDeleteFlag(id) {
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    if(entry.id == id){
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