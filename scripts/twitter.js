// var ref = new Firebase("https://social-informor.firebaseio.com");

// (function() {
//     $(&quot;#sign-in-with-twitter&quot;).on(&quot;click&quot;, function() {
//         ref.authWithOAuthRedirect("twitter", function(error) {
// 	  		if (error) {
// 	    		console.log("Login Failed!", error);
// 	  		} else {
// 	    // We'll never get here, as the page will redirect on success.
// 	  		}
// 		});
//  	});
//  });
   
var Twitter = require('twitter-node-client').Twitter;


 // $(function() {
 //                $(&quot;#sign-in-with-twitter&quot;).on(&quot;click&quot;, function() {
 //                    window.location.href = &quot;<some domain>/request-token&quot;;
 //                });
 //            });