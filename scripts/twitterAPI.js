$('#twitterAuth').on('click', authTwitter);

function authTwitter(){
  cb.__call(
      "oauth_requestToken",
      {oauth_callback: "oob"},
      function (reply) {
          // stores it 
          cb.setToken(reply.oauth_token, reply.oauth_token_secret);
   
          // gets the authorize screen URL 
          cb.__call(
              "oauth_authorize",
              {},
              function (auth_url) {
                  window.codebird_auth = window.open(auth_url);
              }
          );
      }
  );

  cb.__call(
    "oauth_accessToken",
    {oauth_verifier: document.getElementById("PINFIELD").value},
    function (reply) {
        // store the authenticated token, which may be different from the request token (!) 
        cb.setToken(reply.oauth_token, reply.oauth_token_secret);
 
        // if you need to persist the login after page reload, 
        // consider storing the token in a cookie or HTML5 local storage 
    }
);
}