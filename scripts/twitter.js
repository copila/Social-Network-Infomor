var ref = new Firebase("https://social-informor.firebaseio.com");

$('#get_twitter_handles').on('click', ref.authWithOAuthPopup);

ref.authWithOAuthPopup("twitter", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});