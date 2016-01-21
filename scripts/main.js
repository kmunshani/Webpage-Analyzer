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
			// $("body").append($newDoc);//so the browser formats newDoc for us so we indeed have a dom

			
			//Filling in the text area with the retrieved source code.
			$("#retrievedPg").val($newDoc.html());


			// This Doens't Work. Need to fix it.
			var all = $newDoc.children(); //  NodeList of all the elements
			for(var i = 0; i<all.length; i++){

			}

			var allChildred = all.children();
			var metaForOne = all.get(0);
			var entireTag = [all.get(0), all.get(1), all.get(2)];
			
			//So I know how to navigate through a dom and 
			console.log(metaForOne);
			console.log(metaForOne.nodeName);
			console.log(metaForOne.children);

			// console.log(entireTag); 
			// console.log(all.length);
			console.log(all);
			// console.log($newDoc);
			console.log(all.children());
			// console.log(all.get(0));//So this is how you get a particular tag

			// var chldNds = all.childNodes;//Need to figure out the difference between this and all.children() - ok so children is what we want according to : http://stackoverflow.com/questions/7935689/what-is-the-difference-between-children-and-childnodes-in-javascript

			// for(var i = 0; i<chldNds.length; i++){

			// }
			console.log(all.nodeName);

			traverseDom(all);
			console.log(tagCounts);
			console.log(tagSet);
			for(var i = 0; i<tagArry.length; i++){
				$("#tagsList").append("<li class=\"list-group-item\">" +  tagArry[i] + " : " + tagCounts[tagArry[i]].length + "</li>");
				// console.log("making progress adding: " + tagArry[i] + " and more " + tagCounts[tagArry[i]].length);
			}
		



			console.log("out progress adding: " + tagArry.length);




		});
	});
}

// Not sure this setup of traverseDom and updateTagTracking covers everything, need to get more familiar with setup of children

var traverseDom = function(eleNodes){
	for(var i = 0; i< eleNodes.length; i++){
		updateTagTracking(eleNodes[i]);
	}
	// console.log(eleNodes.children());
	if(eleNodes.children.length > 2){//I don't think this is where I should end the length but this I need to stop recursively getting prevobject
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
// 	if(curNode.children.length > 0){
// 		var chldNds = curNode.children;//Need to figure out the difference between childNodes and all.children()

// 		for(var i = 0; i<chldNds.length; i++){
// 			traverseDom(chldNds[i]);
// 			console.log("Logginf the ith chldNd" + i + " here's the nd " + chldNds[i]);
// 		}
// 	}

}

	$(document).ready(main);
