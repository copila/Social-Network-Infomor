var ref = new Firebase("https://social-informor.firebaseio.com");
ref.authWithOAuthRedirect("twitter", function(error) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    // We'll never get here, as the page will redirect on success.
  }
});