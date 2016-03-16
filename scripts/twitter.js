var ref = new Firebase("https://social-informor.firebaseio.com");

	//$('#twitterAuth').on('click', twitterAuth);
	var APIKEY 			= "";
	var url 			= "https://api.twitter.com/1.1/";
	var statusSyntax 	= "statuses/"
	var news 			= "news?"
	var songs 			= "songs?"
	var APIpart 		= "api_key="+APIKEY;
	var results 		= "4";
	var start 			= "0"
	var artist;
	var object = [];
	var topTenArtists = [];


function twitterAuth() {

	window.alert("you tried signing in to twitter");

	ref.authWithOAuthPopup("twitter", function(error, authData) {
		if (error) {
		    window.alert("Login Failed!", error);
		} else {
		    window.alert("Authenticated successfully with payload:", authData);
		}
	});
}

function getTweets() {
	window.alert("you tried retrieving tweets");

	var url2 = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=informor&count=2";
	getURL(url2);
}

function getURL(url2){	
	window.alert("URL: " + url2);

	$.get(url2, function(data, status){
    console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
    formatResults(data);
	});
}


window.onload = function () {
  document.getElementById("twitterAuth").onclick = twitterAuth;
  document.getElementById("twitterQuery").onclick = getTweets;
};