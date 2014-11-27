
// formatNewsJson(JSON object)
// this function formats the data retreived from a JSON Object 
// via the UW Open API into a Bootstrap panel component.
// It uses a mustache template to format and extract the URL of the 
// news article, the news article title, time of publishing and who 
// it was published by

function formatUwNewsJson(jsonObj){
	var newsArticles = jsonObj.data;
	var headlines = "";

	console.log(jsonObj);

	var panelTemplate = "<div class=\"panel panel-default\"><div class=\"panel-body\"><b><a target=\"_blank\" href={{link}}>{{title}}</a></b><br><br><div class=\"publishInfo\">Published on {{published}}<br> by: {{site}}</div><br></div></div></div>";

	for (var i = 0; i < newsArticles.length; i++){
		var newsPanel = Mustache.to_html(panelTemplate, newsArticles[i]);
		$("#newsApp_f14_firstTab").append(newsPanel);
	}
}

// getNews()
// makes an AJAX call to the UW Open API 
function getNews(){
	var APIKey = "2d45f032cc37128113db2689f19067ee";
	var newsAPI = "https://api.uwaterloo.ca/v2/news.json?key=";

	$.ajax({
		url: newsAPI + APIKey,
		data: {
			format: 'json'
		},
		error: function(){
			alert("Failed to retreieve data");
		},
		success: function(data){
			formatUwNewsJson(data);
		},
		type: 'GET'

	});
}

