
	var api_key = "OZXHNDSPPIQZC6KRMG";
	var client_secret = "G7ICAMU4GXCKBZI7MYUBYTOL5NVR5JQCSSNYOFDUAWGANK6PPH";
	var personal_oath_token = "FFG3EZYIB7NXA3ADTDK4";
	var anon_oath_token = "VO2Y6GAPL3VUAEFOUGVVl";
	// var url = "https://www.eventbriteapi.com/v3/events/search/?q="
	// event = "https://www.eventbriteapi.com/v3/events/search/?token="+anon_oath_token;
	// https://www.eventbriteapi.com/v3/events/search/?token=VO2Y6GAPL3VUAEFOUGVVl
	// https://www.eventbriteapi.com/v3/events/search/?q=adele&popular=on&categories=111&token=FFG3EZYIB7NXA3ADTDK4
	
	var cat = "&categories=111"
	var popular = "&popular=on"
	var token_syntax= "&token="
	var array =["Coldplay", "Taylor Swift", "Calvin Harris"];
	var appId = "social-informor";
	var url_bands = "https://api.bandsintown.com/artists/"
	var events = "/events.jsonp?app_id=social-informor";
	// http://api.bandsintown.com/artists/Skrillex/events.json?app_id=YOUR_APP_ID

	function getEvents(){
		console.log("get events Button Clicked");
    	window.alert("get events Button Clicked");
		for (var i = 0; i < array.length; i++) {
			if (hasWhiteSpace(array[i])=== true) {
				artist = array[i].split(' ').join('%20');
	        }
	        else{
	          artist = array[i];
	        }
			url2 = url_bands+artist+events;
			console.log(url2);
			$.get(url2, function(data, status){
	        	console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
	        // formatResults(data);
	    	});
		}
	}

	function hasWhiteSpace(s) {
	  return s.indexOf(' ') >= 0;
	}

window.onload = function () {
  document.getElementById("events").onclick = getEvents;
    
};

