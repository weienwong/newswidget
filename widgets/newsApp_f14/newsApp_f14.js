function showTabs(){ 
	
	var title = "Student News Center"
	// var newsHeadings = ["UW News", "UW Subreddit"];

	var newsHeadings = {
		firstTab: "UW News",
		secondTab: "UW Subreddit",
		thirdTab: "UW Imprint",
		fourthTab: "Chevron",
		fifthTab: "Daily Bulletin"
	};

	var openingUL = "<ul class=\"nav nav-tabs\" role=\"tablist\" position=\"fixed\">";
	var closingUL = "</ul>";

	var openTabContent = "<div class=\"tab-content\">";
	var closeTabContent = "</div>";

	var headingsTemplate = "";
	var tabContentLines = "";

	var newsHeadingKeys = Object.keys(newsHeadings);

	for (var key in newsHeadings){

		if (newsHeadings.hasOwnProperty(key)){
			headingsTemplate = headingsTemplate + "<li role=\"presentation\"><a href=\"#" 
				+ key + "\" aria-controls=\"home\" role=\"tab\" data-toggle=\"tab\" style=\"padding: 5px 5px\">" 
				+ newsHeadings[key] + "</a></li>";

			tabContentLines = tabContentLines
				+ "<div role=\"tabpanel\" class=\"tab-pane\" id=" + key + ">"
				+ "</div>"

		}


	}

	headingsTemplate = openingUL + headingsTemplate + closingUL;
	tabContentLines = openTabContent + tabContentLines + closeTabContent;
	getNews();

	$("#panelList").html(headingsTemplate);
	$("#panelList").append(tabContentLines);

} 


