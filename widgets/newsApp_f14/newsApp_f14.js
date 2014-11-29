// creates tabs based on the news headings
// also creates content pane on the main widget area
// and populates it with corresponding news content from various
// sources / web services

function showTabs(){ 
	
	var title = "Student News Center"
	
	// News heading sources, add news sources as needed
	var newsHeadings = {
		newsApp_f14_firstTab: "UW News",
		newsApp_f14_secondTab: "UW Subreddit",
		newsApp_f14_thirdTab: "UW Imprint",
		newsApp_f14_fourthTab: "Chevron",
		newsApp_f14_fifthTab: "Daily Bulletin",
		newsApp_f14_aboutUsTab: "About Us",

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
				+ key + "\" aria-controls=\"home\" role=\"tab\" data-toggle=\"tab\">" 
				+ newsHeadings[key] + "</a></li>";
			tabContentLines = tabContentLines
				+ "<div role=\"tabpanel\" class=\"tab-pane\" id=" + key + ">"
				+ "</div>"
		}
	}

	headingsTemplate = openingUL + headingsTemplate + closingUL;
	tabContentLines = openTabContent + tabContentLines + closeTabContent;
	
	// makes function calls to grab and display news content from sources
	getNews();
	getImprint();
	getChevron();
	getSubreddit();
	//testit();

	// populates the news tabs
	$("#newsApp_f14_panelList").html(headingsTemplate);
	$("#newsApp_f14_panelList").append(tabContentLines);

	// set first tab to be active be default
	$("#newsApp_f14_firstTab").addClass("active");

} 


