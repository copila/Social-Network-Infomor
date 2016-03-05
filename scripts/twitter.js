var Twitter = require('twitter-node-client').Twitter;

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
       




 // $(function() {
 //                $(&quot;#sign-in-with-twitter&quot;).on(&quot;click&quot;, function() {
 //                    window.location.href = &quot;<some domain>/request-token&quot;;
 //                });
 //            });