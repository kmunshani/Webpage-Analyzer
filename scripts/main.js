var tagSet = {};
var tagCounts = {};
var tagArry = [];
var main = function(){

	$(document).keypress(function(e){
    	if (e.which == 13){
        	$("#submitBtn").click();
    	}
	});

	$('#submitBtn').click(function(){

		// reseting the tag stuff so it doesn't carry over tags from website to website.
		tagSet = {};
		tagCounts = {};
		tagArry = [];
		$("#tagsList").empty();

		var inputURL = $("#inputBar").val();
		// Checking to make sure the url starts with http:// or https://
		var validURL = false;
		if(inputURL.length > 8){
			var isHttp = inputURL.substring(0, 7) == "http://";
			var isHttps = inputURL.substring(0, 8) == "https://";
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

			var $newDoc = $("<div id='test'/>");

			$newDoc.html(data.contents); 
			
			//Filling in the text area with the retrieved source code.
			$("#retrievedPg").val($newDoc.html());


			var all = $newDoc.children(); //  NodeList of all the elements
			traverseDom(all);
		
			for(var i = 0; i<tagArry.length; i++){
				$("#tagsList").append("<li class=\"list-group-item\">" +  tagArry[i] + " : " + tagCounts[tagArry[i]].length + "</li>");
			}
		});
	});
}

// This setup of traverseDom and updateTagTracking does not cover everything, need to get more familiar with setup of children/how HTML documents are organized

var traverseDom = function(eleNodes){
	for(var i = 0; i< eleNodes.length; i++){
		updateTagTracking(eleNodes[i]);
	}
	if(eleNodes.children.length > 2){//I don't think this is where I should end the length but this I need to stop recursively getting prevobject - to Fix
		traverseDom(eleNodes.children());
	}
}

var updateTagTracking = function(curNode){
	var name = curNode.nodeName;
	if(name in tagSet){
		var oldArray = tagCounts[name];
		oldArray.push(curNode);
		tagCounts[name] = oldArray;
	}
	else{
		tagArry.push(name);
		tagSet[name] = true;
		tagCounts[name] = [curNode];
	}
}

	$(document).ready(main);
