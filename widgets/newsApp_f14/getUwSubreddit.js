
function formatJson(jsonObj){
	// store an array of reddit posts 
	var redditPosts = jsonObj.data.children;
	// get number of posts
	// console.log(redditPosts);
	var numOfChildren = redditPosts.length;
	console.log(jsonObj);

	for (var i = 0; i < numOfChildren; i++){
		postTitle = redditPosts[i].data.title;
		postUrl = redditPosts[i].data.url;
		$("#secondTab").append(
			"<br>"
			+ "<a target=\"_blank\" href=" 
			+ "\"" + postUrl + "\"" + ">" 
			+ postTitle  
			+ "</a>"
			+ "<br>"
			);

	}

}

function getSubreddit(){
	var uwSubredditJson = "https://www.reddit.com/r/uwaterloo/new.json?sort=new";
	$.ajax({
		url: uwSubredditJson,
		data: {
			format: 'json'
		},
		error: function(){
			console.log("Failed to retreieve data");
		},
		success: function(data){
			formatJson(data);
		},
		type: 'GET'

	});
}