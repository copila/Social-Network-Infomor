// Your API Key: UVTZMTHARGEDWUD3W 

// Your Consumer Key: 11a365de0a868cacfcb4e2fa4e9dcf5a 

// Your Shared Secret: xpHsJX7ZSyKkng10pCkDWQ


var APIKEY = "UVTZMTHARGEDWUD3W";
var url = "http://developer.echonest.com/api/v4/artist/search?api_key="
var artist;

$('#search').on('click', buttonClick);


function buttonClick() {
	console.log("search button clicked");
	artist = document.getElementById('artiste').value;
	console.log("artist serached is: " + artist);
	url2 = url+APIKEY+"&name="+artist;
	console.log("url is: " + url2);
	getURL(url2);

}

function getURL(url2){
	$.ajax(url2, {
		dataType: "jsonp",
		success: function (results) {

			console.log("the results are: " +results);

		}
	});
}





// $(document).ready(function() {
						
// 						var echonest = new EchoNest("UVTZMTHARGEDWUD3W"); 
						
// 						// get a set of "Hybrid" audio and output as HTML5 audio tags to the page
// 						echonest.artist("Hybrid").audio( function(audioCollection) {
// 							$("#artistAudio").append( audioCollection.to_html('<p>${artist} - ${length} long<br /><audio src="${url}" controls preload="none"></audio></p>') );
// 						});
						
// 						// get a single audio url
// 						echonest.artist("Prince").audio( function(audioCollection) {
// 							$('#artistAudioURL').append(audioCollection.data.audio[0].url);
// 						});
						
// 						// get the second Radiohead biography by artist id and output it onto the page, also output the site it came from and the license used. Nested items are available through a prefix. E.g. "license_type"
// 						echonest.artist("ARH6W4X1187B99274F").biographies( function(biographyCollection) {
// 							$("#artistBiography").append( biographyCollection.at(1).to_html('<p>${text} <br/>by: <strong>${site} - <span class="license">${license_type}</span></strong></p>') );
// 						});
						
// 						// get a summary of the booka shade blogs plus a count of the available items on the server, where we started from and how many items in our local collection.
// 						echonest.artist("Booka Shade").blogs( function(blogCollection) {
// 							$("#artistBlogs").append( blogCollection.to_html('<p>${summary}<br/><span class="total">Total: </span> | <span class="started_at">Started At: </span> | <span class="size">Size of Collection: </span></p>') );
// 							$("#artistBlogs .total").append( blogCollection.total() );
// 							$("#artistBlogs .started_at").append( blogCollection.start() );
// 							$("#artistBlogs .size").append( blogCollection.size() );
// 						});
						
// 						// how well do people know Trentemøller?
// 						echonest.artist("Trentemøller").familiarity( function(familiarity) {
// 							$('#artistFamiliarity').append( familiarity.to_html('<p>"${familiarity}"</p>') );
// 						});
						
// 						// how hot are The Glitch Mob?
// 						echonest.artist("The Glitch Mob").hotttnesss( function(hotttnesss) {
// 							$('#artistHotttnesss').append( hotttnesss.to_html('<p>"${hotttnesss}"</p>') );
// 						});

// 						// get a set of "Radiohead" artist images and output as a bunch of images to the page (limited to first five results)
// 						echonest.artist("Radiohead").images( function(imageCollection) {
// 							$('#artistImages').append( imageCollection.to_html('<img src="${url}">') );
// 						}, {results: 5});
						
// 						// catching up with Depeche Mode (a.k.a what's news)
// 						echonest.artist("Depeche Mode").news( function(newsCollection) {
// 							$('#artistNews').append( newsCollection.to_html('<p>${summary}<br/><strong>Posted on:</strong> ${date_posted}</p>') );
// 						});
						
// 						// get a profile on The Cure, including artist id and foreign catalog id
// 						echonest.artist("The Cure").profile( function(profile) {
// 							$('#artistProfile').append( profile.to_html('<dl><dt>Artist Id</dt><dd>${id}</dd><dt>Foreign Catalog Id</dt><dd>${foreign_ids_catalog}</dd></dl>') );
// 						});
						
// 						// get reviews about Radiohead
// 						echonest.artist("Radiohead").reviews( function(reviewCollection) {
// 							$('#artistReviews').append( reviewCollection.to_html('<p>${summary}</p>') );
// 						});
						
// 						// perform an artist search using a search options hash
// 						searchOptions = {
// 							name: 'The',
// 							fuzzy_match: true,
// 							bucket: 'id:7digital'
// 						};
						
// 						echonest.artist().search( function(searchResultsCollection) {
// 							$('#artistSearchResults').append( searchResultsCollection.to_html('${name} - <strong>${foreign_ids_0_foreign_id}</strong><br/>') );
// 						}, searchOptions);
						
// 						// what songs did Depeche Mode write?
// 						echonest.artist("Depeche Mode").songs( function(songsCollection) {
// 							$('#artistSongs').append( songsCollection.to_html('${id} - ${title}<br/>') );
// 						});
						
						
// 						// which artists are similar to Muse?
// 						echonest.artist("Muse").similar( function(similarCollection) {
// 							$('#artistSimilar').append( similarCollection.to_html('${name} - ${id}<br/>') );
// 						});
						
						
// 						// what terms are used to descript the artist David Bowie?
// 						echonest.artist("David Bowie").terms( function(termsCollection) {
// 							$('#artistTerms').append( termsCollection.to_html('<strong>${name}</strong> - ${frequency}<br/>') );
// 						});
						
// 						// what artists are currently "hottt"? (this should return a hotttnesss value but doesn't)
// 						echonest.artist().top_hottt( function(topHotttCollection) {
// 							$('#artistTopHottt').append( topHotttCollection.to_html('<strong>${name}</strong> - ${hotttnesss}<br/>') );
// 						});
						
// 						// what artists are currently "hottt"? (this should return a hotttnesss value but doesn't)
// 						echonest.artist().top_terms( function(topTermsCollection) {
// 							$('#artistTopTerms').append( topTermsCollection.to_html('<strong>${name}</strong> - ${frequency}<br/>') );
// 						});
						
// 						// give me the amazon.com link for Pink Floyd
// 						echonest.artist("Pink Floyd").urls( function(urlsCollection) {
// 							$('#artistUrls').append( urlsCollection.to_html('<a href="${amazon_url}">${amazon_url}</a>') );
// 						});
						
// 						// give me videos featuring Calexico
// 						echonest.artist("Calexico").video( function(videoCollection) {
// 							$('#artistVideos').append( videoCollection.to_html('${title} (${site} : ${url})<br/>') );
// 						});
						
// 					});
// 					