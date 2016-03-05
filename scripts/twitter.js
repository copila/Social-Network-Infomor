var ref = new Firebase("https://social-informor.firebaseio.com");

(function() {
    $(&quot;#sign-in-with-twitter&quot;).on(&quot;click&quot;, function() {
       ref.authWithOAuthPopup("twitter", function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		  }
		});
 	});
 });
   
var Twitter = require('twitter-node-client').Twitter;


 // $(function() {
 //                $(&quot;#sign-in-with-twitter&quot;).on(&quot;click&quot;, function() {
 //                    window.location.href = &quot;<some domain>/request-token&quot;;
 //                });
 //            });