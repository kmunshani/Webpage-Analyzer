
var main = function(){

	$(document).keypress(function(e){
    	if (e.which == 13){
			console.log("enter hit");
        	$("#submitBtn").click();
    	}
	});



	$('#submitBtn').click(function(){

	


	var inputURL = $("#inputBar").val();
	console.log("the url is " + inputURL);
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

			var $newDoc = $("<div id='test'/>")

			$newDoc.html(data.contents); //Get a failed to load images error here I'm thinking maybe it's simpler to parse out img tags(using regex) before 

			$("body").append($newDoc);//so the browser formats newDoc for us
			
			//Filling in the text are with the retrieved source code.
			$("#retrievedPg").val($newDoc.html());


			// This Doens't Work. Need to fix it.

			var all = $newDoc.getElementsByTagName("*"); //  NodeList of all the elements
			// console.log(all.length);

			var junk = data.contents;
			// really crude way todo this is teo first remove all teh strings and comments then go over every character

			// Maybe a better method is to use nodes and node types?

			// var resultStr = "";
			// var nodeListComb = Array.from(all)[3].textContent;
			// $("#retrievedPg").val(nodeListComb);

			// Isn't working right now though.



			//So try this: when we find a "<" we try and match the following letters to a tag(check them against a set of all html tags)
				// create a new string to be fed into the textArea - composed of several subvariables
				// have a new variable everytime we get to a new tag
				// put all variables that hold the same tag into an array
				// put all the variables(which all just hold substrings) in a larger array
				// have a map from tags to all the  their relevant arrays
				// have an onclick function for each tag to change the textcolor of their tags.





			// regex to remove all the comments, doesn't use regex, credit to this SO post: http://stackoverflow.com/questions/2364601/is-it-possible-to-remove-an-html-comment-from-dom-using-jquery
			junk = stripComments(data);
			// function to remove all the javascript(not using regex), credit to this SO post: http://stackoverflow.com/questions/6659351/removing-all-script-tags-from-html-with-js-regular-expression
			junk = stripScripts(junk);
			var tagList = [];
			var newTag = "";
			for(var i = 0; i<junk.length; i++){
				console.log("The " + i + " th word is " + junk[i]);
				// Here we have the start of the tag
				if(junk[i] = "<"){
					while(junk[i] != ">"){
						newTag += junk[i];
						i++;
					}
					newTag += junk[i];
					tagList.append(newTag);
					newTag = "";
				}		
			}

			for(var i = 0; i<tagList.length; i++){
				console.log(tagList[i]);
			}

			console.log("Junk is: " + junk);
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


  function stripScripts(s) {
    var div = document.createElement('div');
    div.innerHTML = s;
    var scripts = div.getElementsByTagName('script');
    var i = scripts.length;
    while (i--) {
      scripts[i].parentNode.removeChild(scripts[i]);
    }
    return div.innerHTML;
  }

  function stripComments(s){
  	s.contents.each(function() {
    	if(this.nodeType === Node.COMMENT_NODE) {
        	$(this).remove();
    	}
	});
	return s;
  }


$(document).ready(main);
