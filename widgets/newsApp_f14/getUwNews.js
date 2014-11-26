
function formatNewsJson(jsonObj){
	var newsArticles = jsonObj.data;
	var headlines = "";

	console.log(jsonObj);

	
	// $("#firstTab").append("<img class=\"blackBg\" src=\"images/UniversityOfWaterloo_logo_horiz_rev_rgb.png\">");
	for (var i = 0; i < newsArticles.length; i++){
		$("#firstTab").append(
			"<div class=\"panel panel-default\">"
			+ "<div class=\"panel-heading\">"
			+ "<a target=\"_blank\" href=" 
			+ newsArticles[i].link 
			+ ">" 
			+ "<b>" + newsArticles[i].title + "</b>" + "</a><br></div>"
			+ "<div class=\"panel-body\">"
			+ "Published by: " + newsArticles[i].site + "<br>"
			+ "Published on: " + newsArticles[i].published.substring(0,9)
			+ "</div>"
			);			
	}
}

function getNews(){
	var APIKey = "2d45f032cc37128113db2689f19067ee";
	var newsAPI = "https://api.uwaterloo.ca/v2/news.json?key=";

	$.ajax({
		url: newsAPI + APIKey,
		data: {
			format: 'json'
		},
		error: function(){
			console.log("Failed to retreieve data");
		},
		success: function(data){
			formatNewsJson(data);
		},
		type: 'GET'

	});
}

