/* myLoc.js */
window.init = getMyLocation();
var map=null;
var targetDiv="";
var currentLatitude;
var currentLongitude;
var blogger1Coords =  {
	latitude: 47.571946,
	longitude: -52.734753
};
var blogger2Coords =  {
	latitude: 47.576707,
	longitude: -52.731863
};

function getCurrentLocation(){
    return { latitude: currentLatitude, longitude: currentLongitude};
}
function getMyLocation(target) {
	targetDiv=target;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayLocation);
	}
	else {
		alert("Geolocation not supported");
	}
}

function displayLocation(position) {
	currentLatitude = position.coords.latitude;
	currentLongitude = position.coords.longitude;

	// var div = document.getElementById("location");
	// div.innerHTML = "You are at Latitude: " + currentLatitude + ", Longitude: " + currentLongitude;
	// console.log(position.coords+"   " +targetDiv);
	// print(position.coords + "    " +targetDiv);
	showMap(position.coords,targetDiv);
}

function showMap(coords, divTarget) {
	var googleLatAndLong = new google.maps.LatLng(coords.latitude, 
												  coords.longitude);
	var mapOptions = {
		zoom: 15,
		center: googleLatAndLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var mapDiv = document.getElementById(divTarget);
	map = new google.maps.Map(mapDiv, mapOptions);
	
	addMarker(map, googleLatAndLong);
}

function addMarker(map, latlong) {
	var markerOptions = {
		position: latlong,
		map: map,
		clickable: false
	};
	var marker = new google.maps.Marker(markerOptions);
}
function getComments(){
	var blogger1 = document.getElementsByClassName('entry1');
	var blogger2 = document.getElementsByClassName('entry2');
	
	for (var i = 0; i < blogger1.length; i++) {
	    blogger1[i].innerHTML += '<div id="map1'+i+'" class="maps" style="float:none;"></div>';
	    showMap(blogger1Coords, 'map1'+i);
	}
	
	for (var i = 0; i < blogger2.length; i++) {
	    blogger2[i].innerHTML += '<div id="map2'+i+'" class="maps" style="float:none;"></div>';
	    showMap(blogger2Coords, 'map2'+i);
	}
}