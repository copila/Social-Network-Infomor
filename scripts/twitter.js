

var ref = new Firebase("https://social-informor.firebaseio.com");

$('#sign-in-with-twitter').on('click', 'input', function() { twitOath() });

function twitOath(){
	ref.authWithOAuthPopup("twitter", function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		  }
	});
}
       

