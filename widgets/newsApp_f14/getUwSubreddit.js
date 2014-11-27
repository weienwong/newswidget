// formatUwSubredditJson(JSON object)
// this function retreieves the first 25 posts from the UW Subreddit
// (limit was set by the web service)
// formats the data retreived from a JSON Object 
// via the Reddit's API into a Bootstrap panel component.
// It uses a mustache template to format and extract the URL of the 
// post, the post's title and who it was posted by

function formatUwSubredditJson(jsonObj){
	// store an array of reddit posts 
	var redditPosts = jsonObj.data.children;
	// get number of posts
	var numOfChildren = redditPosts.length;
	console.log(jsonObj);

	var panelTemplate = "<div class=\"panel panel-default\"><div class=\"panel-body\"><a target=\"_blank\" href=\"{{url}}\"><b>{{title}}</b></a><br><br><div class=\"publishInfo\">Posted by: {{author}}</div></div></div>"

	for (var i = 0; i < numOfChildren; i++){

		redditPost = redditPosts[i].data; 
		var redditPanelPost = Mustache.to_html(panelTemplate, redditPost);
		$("#newsApp_f14_secondTab").append(redditPanelPost);
	}

}

// getSubreddit()
// makes an AJAX call to the UW Subreddit 
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
			formatUwSubredditJson(data);
		},
		type: 'GET'

	});
}