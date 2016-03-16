var ref = new Firebase("https://social-informor.firebaseio.com");

	//$('#twitterAuth').on('click', twitterAuth);

function twitterAuth() {

	window.alert("you tried signing in to twitter");

	ref.authWithOAuthPopup("twitter", function(error, authData) {
		if (error) {
		    console.log("Login Failed!", error);
		} else {
		    console.log("Authenticated successfully with payload:", authData);
		}
	});
}

window.onload = function () {
  document.getElementById("twitterAuth").onclick = twitterAuth;
};