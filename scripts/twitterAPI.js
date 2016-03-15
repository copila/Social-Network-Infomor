// $('#twitterAuth').on('click', authTwitter);

var cb = new Codebird;
cb.setConsumerKey("myMJ6eT51X95q7ksmPrHfS5tI", "Ldp8SM2SVQ6lx4AP6qGL8QAYYct3DXGGgubhIGkYbfp1Z6NJBB");

var twitterToken = "";
var twitterSecret = "";

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

}

function getTwitterAccessToken(){
    console.log(document.getElementById("PINFIELD").value);
    cb.__call(
        "oauth_accessToken",
        {oauth_verifier: document.getElementById("PINFIELD").value},
        function (reply) {
            // store the authenticated token, which may be different from the request token (!) 
            cb.setToken(reply.oauth_token, reply.oauth_token_secret);
            console.log(reply)
            // if you need to persist the login after page reload, 
            // consider storing the token in a cookie or HTML5 local storage 
        }
    );
}