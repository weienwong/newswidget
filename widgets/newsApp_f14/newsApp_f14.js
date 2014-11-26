function showTabs(){ 
	
	var title = "Student News Center"
	
	// News heading sources, add news sources as needed
	var newsHeadings = {
		firstTab: "UW News",
		secondTab: "UW Subreddit",

		aboutUsTab: "About Us",

	};

	var openingUL = "<ul class=\"nav nav-tabs\" role=\"tablist\" position=\"fixed\">";
	var closingUL = "</ul>";

	var openTabContent = "<div class=\"tab-content\">";
	var closeTabContent = "</div>";

	var headingsTemplate = "";
	var tabContentLines = "";

	var newsHeadingKeys = Object.keys(newsHeadings);

	// creates a new tab everytime
	for (var key in newsHeadings){

		if (newsHeadings.hasOwnProperty(key)){
			headingsTemplate = headingsTemplate + "<li role=\"presentation\"><a href=\"#" 
				+ key + "\" aria-controls=\"home\" role=\"tab\" data-toggle=\"tab\">" 
				+ newsHeadings[key] + "</a></li>";

			tabContentLines = tabContentLines
				+ "<div role=\"tabpanel\" class=\"tab-pane\" id=" + key + ">"
				+ "</div>"
		}
	}

	headingsTemplate = openingUL + headingsTemplate + closingUL;
	tabContentLines = openTabContent + tabContentLines + closeTabContent;
	
	// get news content
	getNews();
	getSubreddit();


	$("#panelList").html(headingsTemplate);
	$("#panelList").append(tabContentLines);

	// set first tab to be active be default
	$("#firstTab").addClass("active");

} 


