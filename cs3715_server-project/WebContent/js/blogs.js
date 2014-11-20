window.onload = function(){
	
	var movie = new Movie("Plan 9 from Outer Space","Cult Classic",2,["3:00pm","7:00pm","11:00pm"]);
	var jsonString = JSON.stringify(movie);
	alert(jsonString);
	var url = "../request/data.json";
	var request = new XMLHttpRequest();	
	request.onload = function(){
		if(request.status == 200){
			alert(request.responseText);
		}
	};
	request.open("GET", url);
	request.send(null);
};