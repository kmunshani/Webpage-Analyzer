
var main = function(){

	$(document).keypress(function(e){
    	if (e.which == 13){
			console.log("enter hit");
        	$("#submitBtn").click();
    	}
	});



	$('#submitBtn').click(function(){

	


	var inputURL = $("#inputBar").val();
	console.log("the url is" + inputURL);
	var validURL = false;
	if(inputURL.length > 8){
		var isHttp = inputURL.substring(0, 7) == "http://";
		var isHttps = inputURL.substring(0, 8) == "https://";
		// This method is incomplete
		validURL = isHttp || isHttps;
	}
	if(!validURL){
		alert("This url doesn't start with http:// or https:// please reenter your url so that it is valid");
		return;
	}

	$.ajaxSetup({
	    scriptCharset: "utf-8", //or "ISO-8859-1"
	    contentType: "application/json; charset=utf-8"
	});

	// Uses whateverorigin to get around CORS 
	$.getJSON('http://whateverorigin.org/get?url=' + 
    	encodeURIComponent(inputURL) + '&callback=?', 
	    function (data) {

			var newDoc = document.createElement( 'html' );

			newDoc.innerHTML = data.contents; //Get a failed to load images error here I'm thinking maybe it's simpler to parse out img tags(using regex) before 
			
			//Filling in the text are with the retrieved source code.
			$("#retrievedPg").val(newDoc.innerHTML);


			// This Doens't Work. Need to fix it.

			var all = newDoc.getElementsByTagName("*"); //  NodeList of all the elements
			// console.log(all.length);



			// var curEle;
			// var curTag;
			// var counter = 0;
			// for(var i = 0; i< all.length; i++){
			// 	if(i === 0){
			// 		curTag = all[0];
			// 		counter++;
			// 	}
			// 	else{
			// 		curEle = all[i];
			// 		if(!curEle.isEqualNode(curTag)){
			// 			console.log(curTag.toString());
			// 			console.log(counter);

			// 			counter = 0;	
			// 			// gotta put in dictionary with number
			// 			// also here can modify tag's attributes(give them a common class) so when we click on one of the tags in the dictionary it changes all of these.
			// 		}
			// 			counter++;
			// 	}
			// }
			// 	console.log(curTag.toString());
			// 	console.log(counter);

			// 			// Final type ot tag - have to take car of outside the for loop 
			// 			// also have to put in dictionary with number
			// 			// also here can modify tag's attributes so when we click on one of the tags in the dictionary it changes all of these.

			// 	console.log(newDoc);
			// 	console.log(newDoc);
		});

	});

}

$(document).ready(main);
