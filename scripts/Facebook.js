var userToken; 
var friendMusic;
var APIKEY = "UVTZMTHARGEDWUD3W";
var url = "https://developer.echonest.com/api/v4/";
var artistSyntax = "artist/"
var news = "news?"
var hotness = "hotttnesss?"
var APIpart = "api_key="+APIKEY;
var results= "1";
var start = "0"
var artist;
Firebase.enableLogging(true);
var myFirebaseRef = new Firebase("https://social-informor.firebaseio.com/");
var artistHotness = [];


(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/all.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {

    // Logged into your app and Facebook.
    userToken = response.authResponse.accessToken;
    var userId = response.authResponse.userID;
    console.log("userId is: " + userId);
    console.log("userToken is: " + userToken);
    myFirebaseRef.set({
      userToken: userToken,
      userId: userId,
    });
    testAPI();
    returnMusic(userToken, userId);
    returnFriend(userToken, userId);

  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
FB.init({
  appId      : '1856892061204363',
  cookie     : true,  // enable cookies to allow the server to access 
                      // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.5' // use graph api version 2.5
});

// Now that we've initialized the JavaScript SDK, we call 
// FB.getLoginStatus().  This function gets the state of the
// person visiting this page and can return one of three states to
// the callback you provide.  They can be:
//
// 1. Logged into your app ('connected')
// 2. Logged into Facebook, but not your app ('not_authorized')
// 3. Not logged into Facebook and can't tell if they are logged into
//    your app or not.
//
// These three cases are handled in the callback function.

FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
  // window.top.location = "welcome.html"
});

};

// // Load the SDK asynchronously
// (function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return;
//   js = d.createElement(s); js.id = id;
//   js.src = "//connect.facebook.net/en_US/sdk.js";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
       });
}

function returnFriend(userToken, userId){
  console.log("returnFriendcalled");
  console.log("userToken is: " + userToken);
  console.log("userId is: " + userId);
  FB.api(userId+'?fields=name,friends.limit(5)', 'get', function(response) {
    console.log(' friends returned: ' + JSON.stringify(response));
    var name = response.name;
    var friends = response.friends;
    var data = response.friends.data;
    console.log("name in friend function is: " + name);
    // console.log('friends in friend function is:  ' + JSON.stringify(friends));
    console.log('data in friend function is:  ' + JSON.stringify(data));
    returnFriendMusic(data);
    myFirebaseRef.update({
      Name: name,
      Friends: data
    });
    var next = response.friends.paging.next;
    console.log("paging.next is: " + next);
  //   if (next != undefined){
  //     saveMusicDataToFB(next);
  //   }
  });
}

function returnMusic(userToken, userId){
  var musicFBRef = new Firebase("https://social-informor.firebaseio.com/Music")
  console.log("returnMusic called");
  // console.log("userToken is: " + userToken);
  // console.log("userId is: " + userId);
  FB.api(userId+'?fields=music', 'get', function(response) {
    console.log('Music ' + JSON.stringify(response));
    var music = response.music;
    console.log('music in music function is:  ' + JSON.stringify(music));
    // console.log('data in music function is:  ' + JSON.stringify(response));
    var musicArr = response.music.data;
     myFirebaseRef.update({
      Music: music
    });
    for (i = 0; i < musicArr.length; i++) { 
      artist = musicArr[i].name;
      artistID = musicArr[i].id;
      musicFBRef.push({
        Artist: artist,
        artistID : artistID
      });
    }
   
    // var next = response.friends.paging.next;
    // console.log("paging.next is: " + next);
    // if (next != undefined){
    //   saveMusicDataToFB(next);
    // }
  });
}


function returnFriendMusic(friends){
  console.log("friends object in returnFriendMusic is: " + friends);
  for (i = 0; i < friends.length; i++) { 
      friendId = friends[i].id;
      friendName = friends[i].name;
      console.log("friendId is: " + friendId);
      FB.api(friendId+'?fields=music', 'get', function(response) {
        console.log('music for ' + friendName + "is: " + JSON.stringify(response));
        friendMusic = response.music.data;
        getHotness(friendMusic);

      });
  }
}

function getHotness(friendsArtist){
  for (i = 0; i < friendsArtist.length; i++) { 
    var artist = friendsArtist[i].name;
    if (hasWhiteSpace(artist) === true ){
      console.log("artist has whitespace " + artist);
      artist2 = artist.split(' ').join('+');
    }
    else{
      artist2 = artist;
    }
    console.log("artist name in getHotness is: " + artist2);
    url2 = url+artistSyntax+hotness+APIpart+"&name="+artist2+"&format=json";
    console.log("url is: " + url2);
    $.get(url2, function(data, status){
      console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
      artistHotness.push(data);
    });
    console.log("artistHotness array is: " + artistHotness);
  }
  // http://developer.echonest.com/api/v4/artist/hotttnesss?api_key=FILDTEOIK2HBORODV&id=ARH6W4X1187B99274F&format=json
}

function hasWhiteSpace(s) {
  return s.indexOf(' ') >= 0;
}







// function saveMusicDataToFB(nextPage){
//   var friendsFBRef = new Firebase("https://social-informor.firebaseio.com/Friends");
//   if (nextPage != undefined){
//     FB.api(nextPage, 'get', function(response) {
//       console.log("next page response: " + JSON.stringify(response));
//       var next = response.paging.next;
//       var previous = response.paging.previous;
//       console.log("paging next is: " + next);
//       console.log("paging previous is: " + next);
//       var friendData = response.data;
//       console.log ("friendData is: " + friendData);
//     });
//     friendsFBRef.update({
//       friendData
//     });
//     if (next != undefined){
//       saveMusicDataToFB(next);
//     }
//   }
// }





