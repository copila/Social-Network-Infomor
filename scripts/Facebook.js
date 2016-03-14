// $(document).ready(function() {

var userToken; 
var friendMusic;
var APIKEY = "UVTZMTHARGEDWUD3W";
var url = "https://developer.echonest.com/api/v4/";
var urlSpotify = "https://api.spotify.com";
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
var artistInfo = [];
// var name;
var hotnessArray1 = [];
var friendMusicArray = [];
var name;
var object = [];
var topTenArtists = [];
var twitterHandles = [];

// $(document).ready(function() {
//   $('#queryFB4').on('click', queryFireBase);
//   $('.queryFB5').on('click', queryFireBase);
// });
// var echonest = new Echonest(APIKEY);




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
    // console.log("userId is: " + userId);
    // console.log("userToken is: " + userToken);
    testAPI();
    //calls beloq functions to get a list of your music and friends 
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
    name1 = response.name;
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + name1 + '!';
    //get the name of the logged in user, and save it to firebase
    
    //remove spaces in the name
    name  = name1.split(' ').join('_');
    myFirebaseRef.update({
      name
    });

  });
  
}

function returnFriend(userToken, userId){
  //takes the userToken and userID of the current logged in user
  var userFBRef = new Firebase("https://social-informor.firebaseio.com/"+name);
  console.log("returnFriendcalled");
  console.log("userToken is: " + userToken);
  console.log("userId is: " + userId);
  
  //makes a call to the FB graph api to get a list of your friends limited to 5
  FB.api(userId+'?fields=name,friends{music}', 'get', function(response) {
    console.log(' friends returned: ' + JSON.stringify(response));
    // var name = response.name;
    var friends = response.friends;
    var data = response.friends.data;
    // console.log("name in friend function is: " + name);
    // console.log('friends in friend function is:  ' + JSON.stringify(friends));
    console.log('data in friend function is:  ' + JSON.stringify(data));
    userFBRef.update({
      "Friends Music": data
    });
    var next = response.friends.paging.next;
    getHotness(data);
    console.log("paging.next is: " + next);
  //   if (next != undefined){
  //     saveMusicDataToFB(next);
  //   }
  });
}

function returnMusic(userToken, userId){
  //takes in the user id  and token of the current user
  // var musicFBRef = new Firebase("https://social-informor.firebaseio.com/Music")

  var userFBRef = new Firebase("https://social-informor.firebaseio.com/"+name);
  console.log("returnMusic called");
  // console.log("userToken is: " + userToken);
  // console.log("userId is: " + userId);

  //uses the user id to query this user's music likes 
  FB.api(userId+'?fields=music', 'get', function(response) {
    // console.log('Music ' + JSON.stringify(response));
    var music = response.music;
    // console.log('music in music function is:  ' + JSON.stringify(music));
    // console.log('data in music function is:  ' + JSON.stringify(response));
    var musicArr = response.music.data;
    //saves this music as a json object to Firebase
     userFBRef.update({
      Music: music
    });
   
    // var next = response.friends.paging.next;
    // console.log("paging.next is: " + next);
    // if (next != undefined){
    //   saveMusicDataToFB(next);
    // }
  });
}



function getHotness(friendMusicArray){
  // console.log("gethotness called, friendMusic array is:  " + friendMusicArray);
  var userFBRef = new Firebase("https://social-informor.firebaseio.com/"+name);
  for (i = 0; i < friendMusicArray.length; i++) {
    // console.log("friendMusicArray," + "for index " + i + "is: " + JSON.stringify(friendMusicArray[i]));
    // var friendsArtist =friendMusicArray[i].music.data[0].name;
    // console.log("friendsArtist in get hotness is" + friendsArtist);
    try{
      for (x = 0; x < friendMusicArray[i].music.data.length; x++) { 
        var artist = friendMusicArray[i].music.data[x].name;
        // console.log("artist in nested for loop is: " + artist)
        if (hasWhiteSpace(artist) === true ){
          // console.log("artist has whitespace " + artist);
          artist2 = artist.split(' ').join('+');
        }
        else{
          artist2 = artist;
        }
        // console.log("artist name in getHotness is: " + artist2);
        // "https://developer.echonest.com/api/v4/artist/profile?api_key=FILDTEOIK2HBORODV&name=weezer&bucket=hotttnesss&bucket=familiarity&bucket=terms"
        // url2 = url+artistSyntax+hotness+APIpart+"&name="+artist2+"&format=json";
        url2 = url+artistSyntax+"profile?"+APIpart+"&name="+artist2+"&bucket=hotttnesss&bucket=images&bucket=artist_location&bucket=songs&format=json";
        console.log("url2 is " + url2);
        // url2 = url+artistSyntax+hotness+APIpart+"&name="+artist2+"&format=json";
        // console.log("url is: " + url2);
        $.get(url2, function(data, status){
          console.log("data get Hotness is: " + JSON.stringify(data) + "\nStatus: " + status);
          // hotnessArray1.push(data);
          try{
            if (data.response.artist != undefined) {
              var artistResponse = data.response.artist;
              // console.log("artistInfo is: " + JSON.stringify(artistsInfo));
              artistInfo.push(artistResponse);
              // userFBRef.update({
              //   artistsInfo
              // });
            }
            else {
            console.log("NOOO response for this artist: ");
            }
          }
          catch (error){
            console.log(stringify(error));
          }
          finally {
            console.log("in finally portion");
            userFBRef.update({
              artistInfo
            });
          }
        });
      //   console.log("artistHotness array is: " + artistHotness);
      }
    }
    catch(errorObject){
      console.log("no music data for that friend" + errorObject);
    }
  }
  artistHotness.sort(function(b,a) {
    return parseFloat(a.hotttnesss) - parseFloat(b.hotttnesss);
  });
  console.log("out of both for loops artistInfo in getHotness is: " + artistInfo);
  userFBRef.update({
    artistInfo
  });
  // // https://developer.echonest.com/api/v4/artist/hotttnesss?api_key=FILDTEOIK2HBORODV&id=ARH6W4X1187B99274F&format=json
  displayHotness(artistInfo);
  //get top 10 songs from artistHotness array
  // getArtistSongs(artistHotness);
  // //get twitter handles of top 10 hottest artists
  // getTwitterHandles(artistHotness);
}

function hasWhiteSpace(s) {
  return s.indexOf(' ') >= 0;
}

function sortHotness(hotnessArray){
  hotnessArray.sort(function(a, b) {
    return parseFloat(b.hotttnesss) - parseFloat(a.hotttnesss);
  });
}

function displayHotness(array){
  console.log("display hotness function called");
  for (i = 0; i < 10 ; i++) { 
      var artistName = array[i].name;
      var hotness_score = array[i].hotttnesss;
      console.log("artist name is: " + artistName + " hotness score is: " + hotness_score);
      $( "#hot_artists" ).append( "<li>" + artistName + ": " + "score: " +hotness_score + "</li>" );
  }
}






// $(document).on("click", "#hot_artists", function (){
//   console.log("hot artists button clicked");
//   window.alert("you queried firebase");
// });

function queryFireBase(){
  console.log("queryFireBase called!");
  window.alert("you queried firebase");
  var artistInfoRef = new Firebase("https://social-informor.firebaseio.com/"+name+"/artistInfo");
  artistInfoRef.on("value", function(snapshot) {
    object = snapshot.val();
    // snapshot.sort(function(b,a) {
    //   return parseFloat(a.hotttnesss) - parseFloat(b.hotttnesss);
    // });
    object.sort(function(b,a) {
      return parseFloat(a.hotttnesss) - parseFloat(b.hotttnesss);
    });            
    // console.log("object after sorting is " + snapshot);
    console.log("object after sorting is " + object);
    console.log(JSON.stringify(object[0]));
    console.log(JSON.stringify(object[1]));
    console.log("object length is " + object.length);
    displayFireBaseResults(object);
    console.log(snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });      
}

  function displayFireBaseResults(array){
    console.log("display FireBase Results function called");
    window.alert("display Artists");
    var numOfResults = 10;
    var tracker = 0;
    var artistName = '';
    var hotness_score;
    i = 0;
    while (tracker < 10){
      if (i > 0) {
        if (array[i].name === array[i-1].name){
          console.log("duplicate value");
        }
        else {
          tracker +=1;
          artistName = array[i].name;
          hotness_score = array[i].hotttnesss;
          song = array[i].songs[0].title; 
          console.log("artist name is: " + artistName + " hotness score is: " + hotness_score + " top song: " + song);
          $( "#hot_artists" ).append( "<li>" + artistName + ": " + "score: " +hotness_score + " top song: " +song +"</li>" );
          topTenArtists.push(array[i]);
          console.log("topTenArtists array in displayFireBaseResults is : " + topTenArtists);
        }
      }
      else {
        tracker +=1;
        topTenArtists.push(array[i]);
        artistName = array[i].name;
        hotness_score = array[i].hotttnesss;
        song = array[i].songs[0].title;
        console.log("artist name is: " + artistName + " hotness score is: " + hotness_score + " top song: " + song);
        $( "#hot_artists" ).append( "<li>" + artistName + ": " + "score: " +hotness_score + " top song: " +song +"</li>" );
      }
      i += 1;
    }
  }

  function getTwitterHandles() {
    console.log("get twitter Handles Button clicked");
    window.alert("get twitterHandles clicked");
    console.log("top ten artists array is: " + topTenArtists);
    //return twitter handles of top 10 hottest artists
  //query using aritst id
  // url = "https://developer.echonest.com/api/v4/artist/twitter?api_key=UVTZMTHARGEDWUD3W&id=ARH6W4X1187B99274F&format=json"
  // url2 = url+artistSyntax+hotness+APIpart+"&name="+artist2+"&format=json";
    for (i = 0; i < topTenArtists.length ; i++) { 
      var id = topTenArtists[i].id;
      url2 = url+artistSyntax+"twitter?"+APIpart+"&id="+id+"&format=json";
      $.get(url2, function(data, status){
        // console.log("data get Hotness is: " + JSON.stringify(data) + "\nStatus: " + status);
        console.log("twitter handle data is: " + JSON.stringify(data.response.artist));
        twitterHandles.push(data.response.artist);
      // console.log("artist name is: " + name + " hotness score is: " + hotness_score);
      // $( "#hot_artists" ).append( "<li>" + name + ": " + "score: " +hotness_score + "</li>" );
      });
    }
    console.log("twitterHandled data is " + twitterHandles);
  }

function returnTweets(){
  var twitter_url = "https://api.twitter.com/1.1/search/tweets.json?q=from%3AZedd&src=typd"
}


window.onload = function () {
  document.getElementById("queryFB4").onclick = queryFireBase;
  document.getElementById("get_twitter_handles").onclick = getTwitterHandles;
    
};










// function getArtistSongs(array){
//   //return top 10 songs, 1 of each artist in array
//   //query using artist id

//   // for (i = 0; i < 10 ; i++) { 
//   //     var name = array[i].name;
//   //     var hotness_score = array[i].hotttnesss;
//   //     var artist_id = array[i].id;
//   // //     console.log("artist name is: " + name + " hotness score is: " + hotness_score);
//   // //     $( "#hot_artists" ).append( "<li>" + name + ": " + "score: " +hotness_score + "</li>" );
//   // }

//   var songs = [];
//   for (i = 0; i < 10 ; i++) { 
//       var name = array[i].name;
//       var hotness_score = array[i].hotttnesss;
//       var artist_id = array[i].id;

//       var artist_top_songs = [];

//       echonest.artist(name).images( function(imageCollection) {
//           $('body').prepend( imageCollection.to_html('<img src="${url}">') );
//       });

//       url2 = urlSpotify + "/v1/artists/" + artist_id + "/top-tracks" + "?country=US";
//       console.log("url is: " + url2);
//       $.get(url2, function(data, status){
//         console.log("data: " + JSON.stringify(data) + "\nStatus: " + status);
//         artist_top_songs.push(data);
//         if (data.response.tracks != undefined) {
//           var artistTrack = data.response.artist;
//           console.log("Top Songs for " + name + " are: " + JSON.stringify(artistsInfo));
//           artist_top_songs.push(artistTrack);
//         }
//         else {
//           console.log("NOOO response for this artist: ");
//         }      
//       });
//   //     console.log("artist name is: " + name + " hotness score is: " + hotness_score);
//   //     $( "#hot_artists" ).append( "<li>" + name + ": " + "score: " +hotness_score + "</li>" );
//   }
// }

function getArtistSongs(array){
  var songs = [];
  for (i = 0; i < 10 ; i++) { 
      var name = array[i].name;
      var hotness_score = array[i].hotttnesss;
      var artist_id = array[i].id;

      var artist_top_songs = [];

      echonest.artist(name).images( function(imageCollection) {
          $('body').prepend( imageCollection.to_html('<img src="${url}">') );
      });

      url2 = urlSpotify + "/v1/artists/" + artist_id + "/top-tracks" + "?country=US";
      console.log("url is: " + url2);
      $.get(url2, function(data, status){
        console.log("data: " + JSON.stringify(data) + "\nStatus: " + status);
        artist_top_songs.push(data);
        if (data.response.tracks != undefined) {
          var artistTrack = data.response.artist;
           console.log("Top Songs for " + name + " are: " + JSON.stringify(artistsInfo));
          artist_top_songs.push(artistTrack);

        }
        else {
          console.log("NOOO response for this artist: ");
        }
        
      });


  //     console.log("artist name is: " + name + " hotness score is: " + hotness_score);
  //     $( "#hot_artists" ).append( "<li>" + name + ": " + "score: " +hotness_score + "</li>" );
  }
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
// });


