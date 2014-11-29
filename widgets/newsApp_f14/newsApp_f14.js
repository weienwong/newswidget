// creates tabs based on the news headings
// also creates content pane on the main widget area
// and populates it with corresponding news content from various
// sources / web services

function showTabs(){ 
	
	var title = "Student News Center"
	
	// News heading sources, add news sources as needed
	var newsHeadings = {
		newsApp_f14_firstTab: "<img src=\"https://uwaterloo.ca/favicon.ico\" alt=\"UW Sites News\" height=\"30\" width=\"30\">",
		newsApp_f14_secondTab: "<img src=\"https://reddit.com/favicon.ico\" alt=\"UW Subreddit\" height=\"30\" width=\"30\">",
		newsApp_f14_thirdTab: "<img src=\"https://pbs.twimg.com/profile_images/3729504476/cf2cf5267cd8c1f5caeccbdf0b821941_400x400.png\" alt=\"UW Imprint Twitter\" height=\"30\" width=\"30\">",
		newsApp_f14_fourthTab: "<img src=\"http://uwchevron.wordpress.com/favicon.ico\" alt=\"The Chevron Twitter\" height=\"30\" width=\"30\">",
		newsApp_f14_fifthTab: "<img src=\"http://www.bulletin.uwaterloo.ca/favicon.ico\" alt=\"UW Daily Bulletin\" height=\"30\" width=\"30\">"
		//newsApp_f14_aboutUsTab: "About Us",

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
	getDB();
	//testit();

	// populates the news tabs
	$("#newsApp_f14_panelList").html(headingsTemplate);
	$("#newsApp_f14_panelList").append(tabContentLines);

	// set first tab to be active be default
	$("#newsApp_f14_firstTab").addClass("active");

} 


