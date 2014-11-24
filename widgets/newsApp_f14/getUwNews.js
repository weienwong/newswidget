var APIKey = "2d45f032cc37128113db2689f19067ee";
var newsAPI = "https://api.uwaterloo.ca/v2/news.json?key=";

// var newsData;

function getNews(){
	$.ajax({
		url: newsAPI + APIKey,
		data: {
			format: 'json'
		},
		error: function(){
			console.log("Failed to retreieve data");
		},
		success: function(data){
			var newsArticles = data.data;
			var headlines = "";
			for (var i = 0; i < newsArticles.length; i++){
				$("#firstTab").append("<br>" + "<a href=" 
					+ newsArticles[i].link + ">" 
					+ newsArticles[i].title + "</a><br>");
				// formatNewsHeadline(newsArticles[i]);
			}
		},
		type: 'GET'

	});
}

