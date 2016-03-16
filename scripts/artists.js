
	// var api_key = "OZXHNDSPPIQZC6KRMG";
	// var client_secret = "G7ICAMU4GXCKBZI7MYUBYTOL5NVR5JQCSSNYOFDUAWGANK6PPH";
	// var personal_oath_token = "FFG3EZYIB7NXA3ADTDK4";
	// var anon_oath_token = "VO2Y6GAPL3VUAEFOUGVVl";
	// var url = "https://www.eventbriteapi.com/v3/events/search/?q="
	// event = "https://www.eventbriteapi.com/v3/events/search/?token="+anon_oath_token;
	// https://www.eventbriteapi.com/v3/events/search/?token=VO2Y6GAPL3VUAEFOUGVVl
	// https://www.eventbriteapi.com/v3/events/search/?q=adele&popular=on&categories=111&token=FFG3EZYIB7NXA3ADTDK4
		// http://api.bandsintown.com/artists/Skrillex/events.json?app_id=YOUR_APP_ID
	// var cat = "&categories=111"
	// var popular = "&popular=on"
	// var token_syntax= "&token="
	var array =["Coldplay", "Taylor Swift", "Calvin Harris"];
	var appId = "social-informor";
	// var url_bands = "https://api.bandsintown.com/artists/"
	// var events = "/events.jsonp?app_id=social-informor";
	var jamBaseAPI = "zq6j5ydsaezxw8faf5fh6qvr";
	var jamBaseURL = "https://api.jambase.com/events?";
	var artistIdSyn = "artistId=";
	var restOfUrl = "&page=0&api_key=zq6j5ydsaezxw8faf5fh6qvr";
	var artistNameSyn = "artists?name=";
	var jamBaseURLArtistID = "https://api.jambase.com/"
	// http://api.jambase.com/events?artistId=52303&page=0&api_key=zq6j5ydsaezxw8faf5fh6qvr
	// http://api.jambase.com/artists?name=Calvin+harris&page=0&api_key=zq6j5ydsaezxw8faf5fh6qvr
	var gigAPIKey = "b3458f6944d5c8d8ec7e6a01348345ca";
	var restOfSGUrl = "&client_id=NDM1ODIxMnwxNDU4MTA3MDY3&client_secret=dE4BXwM7ph1gl22YPPm2IQJqDOmr4c5qes0Cv-Lt"
	var seatgeekURL = "https://api.seatgeek.com/2/events?performers.slug="
	var eventInfo = [];
// 	'https://api.seatgeek.com/2/events?performers.slug=new-york-mets'
// 	ID: "NDM1ODIxMnwxNDU4MTA3MDY3"
// Secret: "dE4BXwM7ph1gl22YPPm2IQJqDOmr4c5qes0Cv-Lt"
// https://api.seatgeek.com/2/events?performers.slug=coldplay&client_id=NDM1ODIxMnwxNDU4MTA3MDY3&client_secret=dE4BXwM7ph1gl22YPPm2IQJqDOmr4c5qes0Cv-Lt
// https://api.seatgeek.com/2/events?performers.slug=Coldplay&client_id=NDM1ODIxMnwxNDU4MTA3MDY3&client_secret=dE4BXwM7ph1gl22YPPm2IQJqDOmr4c5qes0Cv-Lt


	function getEvents(){
		console.log("get events Button Clicked");
    	window.alert("get events Button Clicked");
		for (var i = 0; i < array.length; i++) {
			if (hasWhiteSpace(array[i])=== true) {
				artist = array[i].split(' ').join('-');
				artist = artist.toLowerCase();
	        }
	        else{
	          artist = array[i];
	          artist = artist.toLowerCase();
	        }
			url2 = seatgeekURL+artist+restOfSGUrl;
			console.log(url2);
			$.get(url2, function(data, status){
	        	// console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
	        	var events = data.events;
	        	for (var x = 0; x < events.length; x++){

	        		try{
	        			var title = data.events[x].title;
	        			var announce_date = data.events[x].announce_date;
	        			var score = data.events[x].score;
	        			var location = data.events[x].location;
	        			var object = { artist: artist, title:title, announced_date: announce_date, score:score, location:location };
	        			console.log("object is: " + JSON.stringify(object));
	        			eventInfo.push(object);
	        			console.log(eventInfo.length);

	        		}
	        		catch(error){
	        			console.log("caught an error");

	        		}
	        		finally{
	        			console.log("in the finall section");

	        		}
	        	}
	        	
	        	console.log("first evnet is " + title + " announced on: " + announce_date + " scored at " + score);

	        // formatResults(data);
	    	});
		}
	}

	function hasWhiteSpace(s) {
	  return s.indexOf(' ') >= 0;
	}

function displayEvents(){
	eventInfo.sort(function(b,a) {
    return parseFloat(a.score) - parseFloat(b.score);
  	});
	for (var x = 0; x < eventInfo.length; x++){
      	console.log("artist name is: " + eventInfo[x].artist + " score is: " + eventInfo[x].score);
      	$( "#artist_ events" ).append( "<li>" + eventInfo[x].artist+ ": " + "title: " + eventInfo[x].title + "score: " + eventInfo[x].score + " announced_date: " + eventInfo[x].announced_date + "</li>" );
	}
}

window.onload = function () {
  document.getElementById("events").onclick = getEvents;
  document.getElementById("d").onclick = displayEvents;

  // function displayHotness(array){
//   console.log("display hotness function called");
//   for (i = 0; i < 10 ; i++) { 
//       var artistName = array[i].name;
//       var hotness_score = array[i].hotttnesss;
//       console.log("artist name is: " + artistName + " hotness score is: " + hotness_score);
//       $( "#hot_artists" ).append( "<li>" + artistName + ": " + "score: " +hotness_score + "</li>" );
//   }
// }

    
};


// SCRATCHPAD CODE

// function displayHotness(array){
//   console.log("display hotness function called");
//   for (i = 0; i < 10 ; i++) { 
//       var artistName = array[i].name;
//       var hotness_score = array[i].hotttnesss;
//       console.log("artist name is: " + artistName + " hotness score is: " + hotness_score);
//       $( "#hot_artists" ).append( "<li>" + artistName + ": " + "score: " +hotness_score + "</li>" );
//   }
// }




