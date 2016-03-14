$(document).ready(function() {


	var name = "Claire_Opila";

	$('#hot_artists').on('click', 'input', function() { queryFireBase()});


	function queryFireBase(){
	  console.log("queryFireBase called!");
	  window.alert("you queried firebase");
	  // var artistHotnessRef = new Firebase("https://social-informor.firebaseio.com/"+name+"artistHotness");
	  // artistHotnessRef.orderByChild("hotttnesss").limitToLast(10).on("child_added", function(snapshot) {
	  //   var object = snapshot.val();
	  //   console.log("snapshot value is: ", JSON.stringify(object));
	  // });
	}

});