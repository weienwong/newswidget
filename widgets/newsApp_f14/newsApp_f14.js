function newsApp_f14(){
showTabs();

function showTabs(){ 
	
	var title = "Student News Center"
	// var newsHeadings = ["UW News", "UW Subreddit"];

	var newsHeadings = {
		newsApp_f14_firstTab: "<img src=\"https://uwaterloo.ca/favicon.ico\" alt=\"University of Waterloo logo\" title=\"UW sites news\" height=\"30\" width=\"30\">",
		newsApp_f14_secondTab: "<img src=\"https://reddit.com/favicon.ico\" alt=\"Reddit icon\" title=\"r/uwaterloo subreddit postings\" height=\"30\" width=\"30\">",
		newsApp_f14_thirdTab: "<img src=\"https://pbs.twimg.com/profile_images/3729504476/cf2cf5267cd8c1f5caeccbdf0b821941_400x400.png\" title=\"UW Imprint's tweets\" alt=\"UW Imprint Twitter icon\" height=\"30\" width=\"30\">",
		newsApp_f14_fourthTab: "<img src=\"http://uwchevron.wordpress.com/favicon.ico\" alt=\"The UW Chevron Twitter icon\" title=\"UW Chevron's tweets\" height=\"30\" width=\"30\">",
		newsApp_f14_fifthTab: "<img src=\"http://imgur.com/zeaHHct.jpg\" alt=\"UW Daily Bulletin icon\" title=\"UW Daily Bulletin's tweets\" height=\"30\" width=\"30\">",
		newsApp_f14_sixthTab: "<img src=\"https://pbs.twimg.com/profile_images/378800000863451026/FxTf9bMi_400x400.jpeg\" alt=\"University of Waterloo Twitter icon\" title=\"University Waterloo's tweets\" height=\"30\" width=\"30\">"
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

/*********************************************************************
 *  #### Twitter Post Fetcher v12.0 ####
 *  Coded by Jason Mayes 2013. A present to all the developers out there.
 *  www.jasonmayes.com
 *  Please keep this disclaimer with my code if you use it. Thanks. :-)
 *  Got feedback or questions, ask here: 
 *  http://www.jasonmayes.com/projects/twitterApi/
 *  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
 *  Updates will be posted to this site.
 *********************************************************************/
// Trying to get around Twitter's OAuth requirements...

var twitterFetcher = function() {
  var domNode = '';
  var maxTweets = 20;
  var parseLinks = true;
  var queue = [];
  var inProgress = false;
  var printTime = true;
  var printUser = true;
  var formatterFunction = null;
  var supportsClassName = true;
  var showRts = true;
  var customCallbackFunction = null;
  var showInteractionLinks = true;
  var showImages = false;
  var lang = 'en';

  function handleTweets(tweets){
    if (customCallbackFunction === null) {
      var x = tweets.length;
      var n = 0;
      var element = document.getElementById(domNode);
      var html = '<ul>';
      while(n < x) {
        html += '<li>' + tweets[n] + '</li>';
        n++;
      }
      html += '</ul>';
      element.innerHTML = html;
    } else {
      customCallbackFunction(tweets);
    }
  }

  function strip(data) {
    return data.replace(/<b[^>]*>(.*?)<\/b>/gi, function(a,s){return s;})
        .replace(/class=".*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,
        '');
  }

  function getElementsByClassName (node, classname) {
    var a = [];
    var regex = new RegExp('(^| )' + classname + '( |$)');
    var elems = node.getElementsByTagName('*');
    for (var i = 0, j = elems.length; i < j; i++) {
        if(regex.test(elems[i].className)){
          a.push(elems[i]);
        }
    }
    return a;
  }

  function extractImageUrl(image_data) {
    if (image_data !== undefined) {
      var data_src = image_data.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0];
      return decodeURIComponent(data_src).split('"')[1];
    }
  }

  return {
    fetch: function(config) {
      if (config.maxTweets === undefined) {
        config.maxTweets = 20;
      }
      if (config.enableLinks === undefined) {
        config.enableLinks = true;
      }
      if (config.showUser === undefined) {
        config.showUser = true;
      }
      if (config.showTime === undefined) {
        config.showTime = true;
      }
      if (config.dateFunction === undefined) {
        config.dateFunction = 'default';
      }
      if (config.showRetweet === undefined) {
        config.showRetweet = true;
      }
      if (config.customCallback === undefined) {
        config.customCallback = null;
      }
      if (config.showInteraction === undefined) {
        config.showInteraction = true;
      }
      if (config.showImages === undefined) {
        config.showImages = false;
      }

      if (inProgress) {
        queue.push(config);
      } else {
        inProgress = true;

        domNode = config.domId;
        maxTweets = config.maxTweets;
        parseLinks = config.enableLinks;
        printUser = config.showUser;
        printTime = config.showTime;
        showRts = config.showRetweet;
        formatterFunction = config.dateFunction;
        customCallbackFunction = config.customCallback;
        showInteractionLinks = config.showInteraction;
        showImages = config.showImages;

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//cdn.syndication.twimg.com/widgets/timelines/' +
            config.id + '?&lang=' + (config.lang || lang) + '&callback=twitterFetcher.callback&' +
            'suppress_response_codes=true&rnd=' + Math.random();
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    },

    callback: function(data) {
      var div = document.createElement('div');
      div.innerHTML = data.body;
      if (typeof(div.getElementsByClassName) === 'undefined') {
         supportsClassName = false;
      }

      var tweets = [];
      var authors = [];
      var times = [];
      var images = [];
      var rts = [];
      var tids = [];
      var x = 0;

      if (supportsClassName) {
        var tmp = div.getElementsByClassName('tweet');
        while (x < tmp.length) {
          if (tmp[x].getElementsByClassName('retweet-credit').length > 0) {
            rts.push(true);
          } else {
            rts.push(false);
          }
          if (!rts[x] || rts[x] && showRts) {
            tweets.push(tmp[x].getElementsByClassName('e-entry-title')[0]);
            tids.push(tmp[x].getAttribute('data-tweet-id'));
            authors.push(tmp[x].getElementsByClassName('p-author')[0]);
            times.push(tmp[x].getElementsByClassName('dt-updated')[0]);
            if (tmp[x].getElementsByClassName('inline-media')[0] !== undefined) {
              images.push(tmp[x].getElementsByClassName('inline-media')[0]);
            } else {
              images.push(undefined);
            }
          }
          x++;
        }
      } else {
        var tmp = getElementsByClassName(div, 'tweet');
        while (x < tmp.length) {
          tweets.push(getElementsByClassName(tmp[x], 'e-entry-title')[0]);
          tids.push(tmp[x].getAttribute('data-tweet-id'));
          authors.push(getElementsByClassName(tmp[x], 'p-author')[0]);
          times.push(getElementsByClassName(tmp[x], 'dt-updated')[0]);
          if (getElementsByClassName(tmp[x], 'inline-media')[0] !== undefined) {
            images.push(getElementsByClassName(tmp[x], 'inline-media')[0]);
          } else {
            images.push(undefined);
          }

          if (getElementsByClassName(tmp[x], 'retweet-credit').length > 0) {
            rts.push(true);
          } else {
            rts.push(false);
          }
          x++;
        }
      }

      if (tweets.length > maxTweets) {
        tweets.splice(maxTweets, (tweets.length - maxTweets));
        authors.splice(maxTweets, (authors.length - maxTweets));
        times.splice(maxTweets, (times.length - maxTweets));
        rts.splice(maxTweets, (rts.length - maxTweets));
        images.splice(maxTweets, (images.length - maxTweets));
      }

      var arrayTweets = [];
      var x = tweets.length;
      var n = 0;
      while(n < x) {
        if (typeof(formatterFunction) !== 'string') {
          var datetimeText = times[n].getAttribute('datetime');
          var newDate = new Date(times[n].getAttribute('datetime')
              .replace(/-/g,'/').replace('T', ' ').split('+')[0]);
          var dateString = formatterFunction(newDate, datetimeText);
          times[n].setAttribute('aria-label', dateString);

          if (tweets[n].innerText) {
            // IE hack.
            if (supportsClassName) {
              times[n].innerText = dateString;
            } else {
              var h = document.createElement('p');
              var t = document.createTextNode(dateString);
              h.appendChild(t);
              h.setAttribute('aria-label', dateString);
              times[n] = h;
            }
          } else {
            times[n].textContent = dateString;
          }
        }
        var op = '';
        if (parseLinks) {
          if (printUser) {
            op += '<div class="user">' + strip(authors[n].innerHTML) +
                '</div>';
          }
          op += '<p class="tweet">' + strip(tweets[n].innerHTML) + '</p>';
          if (printTime) {
            op += '<p class="timePosted">' +
                times[n].getAttribute('aria-label') + '</p>';
          }
        } else {
          if (tweets[n].innerText) {
            if (printUser) {
              op += '<p class="user">' + authors[n].innerText + '</p>';
            }
            op += '<p class="tweet">' +  tweets[n].innerText + '</p>';
            if (printTime) {
              op += '<p class="timePosted">' + times[n].innerText + '</p>';
            }

          } else {
            if (printUser) {
              op += '<p class="user">' + authors[n].textContent + '</p>';
            }
            op += '<p class="tweet">' +  tweets[n].textContent + '</p>';
            if (printTime) {
              op += '<p class="timePosted">' + times[n].textContent + '</p>';
            }
          }
        }
        if (showInteractionLinks) {
          op += '<p class="interact"><a href="https://twitter.com/intent/' +
              'tweet?in_reply_to=' + tids[n] + '" class="twitter_reply_icon">' +
              'Reply</a><a href="https://twitter.com/intent/retweet?tweet_id=' +
              tids[n] + '" class="twitter_retweet_icon">Retweet</a>' +
              '<a href="https://twitter.com/intent/favorite?tweet_id=' +
              tids[n] + '" class="twitter_fav_icon">Favorite</a></p>';
        }

        if (showImages && images[n] !== undefined) {
          op += '<div class="media">' +
              '<img src="' + extractImageUrl(images[n]) + '" alt="Image from tweet" />' +
              '</div>';
        }

        arrayTweets.push(op);
        n++;
      }
      handleTweets(arrayTweets);
      inProgress = false;

      if (queue.length > 0) {
        twitterFetcher.fetch(queue[0]);
        queue.splice(0,1);
      }
    }
  };
}();

// This is to grab data from the UW Chevron's Twitter
// using TwitterFetcher.js, please see that file for any relevant information 
function getChevron(){

// gets a list of html strings for each tweet
function handleTweets(tweets){
    var tweetNum = tweets.length;
    var element = document.getElementById('chevron');
   
    for (var i = 0; i < tweetNum; i++){
    
      	var subString = tweets[i].split('</p><p class="timePosted">');
  	// this returns a list of strings similar to:
  	// ["<p class="tweet">Look for new articles soon!", "Posted on 14 Nov</p>"]
  
  	subString[0] = subString[0].substr(17); // to remove the "P class tweet" tag
	subString[1] = subString[1].replace("Posted on", "Tweeted");
        subString[1] = subString[1].replace("Posted", "Tweeted"); // if the tweet is too recent, "on" is not there
      	subString[1] = subString[1].replace("</p>", "");
      
     	var newNews = new newsItem(subString[0], subString[1], "http://uwchevron.wordpress.com/", "@TheUWChevron");
     	var panelTemplate = "<div class=\"panel panel-default\"><div class=\"panel-body\"><b>"+newNews.article+"</b><br><br><div class=\"publishInfo\">"+newNews.date+"<br> <a href=\"https://twitter.com/uwchevron\">"+newNews.author+"</a></div><br></div></div></div>"
      	var newsPanel = Mustache.to_html(panelTemplate);
		$("#newsApp_f14_fourthTab").append(newsPanel);
     
    }
   
}

	//Uses Twitter Fetcher
	
	var chevronfeed = {
  		"id": '538441455971631104',
  		"domId": 'chevron',
  		"maxTweets": 100,
  		"enableLinks": true,
  		"showUser": false,
  		"showTime": true,
  		"lang": 'en',
  		"showInteraction": false,
  		"customCallback": handleTweets,
  		"showRetweet": false
	};
	twitterFetcher.fetch(chevronfeed);

}

// This is to grab data from the UW Daily Bulletin's Twitter
// using TwitterFetcher.js, please see that file for any relevant information 
function getDB(){

// gets a list of html strings for each tweet
function handleTweets(tweets){
    var tweetNum = tweets.length;
    var element = document.getElementById('db');
   
    for (var i = 0; i < tweetNum; i++){
    
      	var subString = tweets[i].split('</p><p class="timePosted">');
  	// this returns a list of strings similar to:
  	// ["<p class="tweet">Look for new articles soon!", "Posted on 14 Nov</p>"]
  
  	subString[0] = subString[0].substr(17); // to remove the "P class tweet" tag
	subString[1] = subString[1].replace("Posted on", "Tweeted");
        subString[1] = subString[1].replace("Posted", "Tweeted"); // if the tweet is too recent, "on" is not there
      	subString[1] = subString[1].replace("</p>", "");
      
     	var newNews = new newsItem(subString[0], subString[1], "http://bulletin.uwaterloo.ca/", "@UWBulletin");
     	var panelTemplate = "<div class=\"panel panel-default\"><div class=\"panel-body\"><b>"+newNews.article+"</b><br><br><div class=\"publishInfo\">"+newNews.date+"<br><a href=\"https://twitter.com/uwdailybulletin\">"+newNews.author+"</a></div><br></div></div></div>"
      	var newsPanel = Mustache.to_html(panelTemplate);
		    $("#newsApp_f14_fifthTab").append(newsPanel);
     
    }
   
}

	//Uses Twitter Fetcher
	
	var dbfeed = {
  		"id": '538759924164362240',
  		"domId": 'db',
  		"maxTweets": 100,
  		"enableLinks": true,
  		"showUser": false,
  		"showTime": true,
  		"lang": 'en',
  		"showInteraction": false,
  		"customCallback": handleTweets,
  		"showRetweet": false
	};
	twitterFetcher.fetch(dbfeed);

}

// This is to grab data from the UW Imprint's Twitter
// using TwitterFetcher.js, please see that file for any relevant information 

function getImprint() {
// gets a list of html strings for each tweet
function handleTweets(tweets){
	console.log(tweets);
    var tweetNum = tweets.length;
    var element = document.getElementById('imprint');
   
    for (var i = 0; i < tweetNum; i++){
    
      	var subString = tweets[i].split('</p><p class="timePosted">');
  	// this returns a list of strings similar to:
  	// ["<p class="tweet">Look for new articles soon!", "Posted on 14 Nov</p>"]
  
  	subString[0] = subString[0].substr(17); // to remove the "P class tweet" tag
	 subString[1] = subString[1].replace("Posted on", "Tweeted");
        subString[1] = subString[1].replace("Posted", "Tweeted"); // if the tweet is too recent, "on" is not there
      	subString[1] = subString[1].replace("</p>", "");
      
     	var newNews = new newsItem(subString[0], subString[1], "http://uwimprint.ca/", "@uwimprint");
     	var panelTemplate = "<div class=\"panel panel-default\"><div class=\"panel-body\"><b>"+newNews.article+"</b><br><br><div class=\"publishInfo\"> "+newNews.date+"<br> <a href=\"https://twitter.com/uwimprint\">"+newNews.author+"</a></div><br></div></div></div>"
      	var newsPanel = Mustache.to_html(panelTemplate);
		$("#newsApp_f14_thirdTab").append(newsPanel);
     
    }
   
}

	//Uses Twitter Fetcher
	
	var imprintfeed = {
  		"id": '538801870098419712',
  		"domId": 'imprint',
  		"maxTweets": 100,
  		"enableLinks": true,
  		"showUser": false,
  		"showTime": true,
  		"lang": 'en',
  		"showInteraction": false,
  		"customCallback": handleTweets,
  		"showRetweet": true
	};
	twitterFetcher.fetch(imprintfeed);


}

// This is to grab data from the University of Waterloo's main Twitter feed
// using TwitterFetcher.js, please see that file for any relevant information 

function getUWtwitter() {
// gets a list of html strings for each tweet
function handleTweets(tweets){
	console.log(tweets);
    var tweetNum = tweets.length;
    var element = document.getElementById('imprint');
   
    for (var i = 0; i < tweetNum; i++){
    
      	var subString = tweets[i].split('</p><p class="timePosted">');
  	// this returns a list of strings similar to:
  	// ["<p class="tweet">Look for new articles soon!", "Posted on 14 Nov</p>"]
  
  	subString[0] = subString[0].substr(17); // to remove the "P class tweet" tag
	//subString[1] = subString[1].substr(10, 6); // to remove "posted on" and "</p>"
        subString[1] = subString[1].replace("Posted on", "Tweeted");
        subString[1] = subString[1].replace("Posted", "Tweeted"); // if the tweet is too recent, "on" is not there
      	subString[1] = subString[1].replace("</p>", "");
      
    	if (subString[1] === "hours "){
      		subString[1] = "hours ago";
    	}
      
    	var newNews = new newsItem(subString[0], subString[1], "http://uwimprint.ca/", "@UWaterloo");
    	var panelTemplate = "<div class=\"panel panel-default\"><div class=\"panel-body\"><b>"+newNews.article+"</b><br><br><div class=\"publishInfo\"> "+newNews.date+"<br><a href=\"https://twitter.com/UWaterloo\">"+newNews.author+"</a></div><br></div></div></div>"
    	var newsPanel = Mustache.to_html(panelTemplate);
		$("#newsApp_f14_sixthTab").append(newsPanel);
     
    }
   
}

	//Uses Twitter Fetcher
	
	var uwtwitterfeed = {
  		"id": '538765938683052032',
  		"domId": 'uwtwitter',
  		"maxTweets": 100,
  		"enableLinks": true,
  		"showUser": false,
  		"showTime": true,
  		"lang": 'en',
  		"showInteraction": false,
  		"customCallback": handleTweets,
  		"showRetweet": false
	};
	twitterFetcher.fetch(uwtwitterfeed);


}

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

// Functions for a news item object
// use for: Imprint, Chevron, and Daily Bulletin sources
// as these don't return JSON objects


// Object constructor for newsItem
function newsItem(title, date, url, source){
  this.article = title; // the title of the news item - HTML string containing the entirety of the tweet
  this.date = date; // the date of the news item
  this.url = url;  // the url of the news item (since tweets normally do not link to individual articles, this should probably direct to the main site)
  this.author = source; // who published the article
}


// Takes in an HTML formatted tweet, and breaks it up into individual strings
// to be then passed to the newsItem constructor
// here is an example of the string format when passed into this function:
// <p class="tweet">Look for new articles soon!</p><p class="timePosted">Posted on 14 Nov</p>
function breakUpNews(string){
 
  var subString = string.split('</p><p class="timePosted">');
  // this returns a list of strings similar to:
  // ["<p class="tweet">Look for new articles soon!", "Posted on 14 Nov</p>"]
  
  subString[0] = subString[0].substr(17); // to remove the "P class tweet" tag
  subString[1] = subString[1].substr(10, 6); // to remove "posted on" and "</p>"
  
  
  //console.log(subString);


}

// This is to grab data from the UW Imprint's Twitter
// using TwitterFetcher.js, please see that file for any relevant information 

function getImprint() {
// gets a list of html strings for each tweet
function handleTweets(tweets){
	console.log(tweets);
    var tweetNum = tweets.length;
    var element = document.getElementById('imprint');
   
    for (var i = 0; i < tweetNum; i++){
    
      	var subString = tweets[i].split('</p><p class="timePosted">');
  	// this returns a list of strings similar to:
  	// ["<p class="tweet">Look for new articles soon!", "Posted on 14 Nov</p>"]
  
  	subString[0] = subString[0].substr(17); // to remove the "P class tweet" tag
	 subString[1] = subString[1].replace("Posted on", "Tweeted");
        subString[1] = subString[1].replace("Posted", "Tweeted"); // if the tweet is too recent, "on" is not there
      	subString[1] = subString[1].replace("</p>", "");
      
     	var newNews = new newsItem(subString[0], subString[1], "http://uwimprint.ca/", "@uwimprint");
     	var panelTemplate = "<div class=\"panel panel-default\"><div class=\"panel-body\"><b>"+newNews.article+"</b><br><br><div class=\"publishInfo\"> "+newNews.date+"<br> <a href=\"https://twitter.com/uwimprint\">"+newNews.author+"</a></div><br></div></div></div>"
      	var newsPanel = Mustache.to_html(panelTemplate);
		$("#newsApp_f14_thirdTab").append(newsPanel);
     
    }
   
}

	//Uses Twitter Fetcher
	
	var imprintfeed = {
  		"id": '538801870098419712',
  		"domId": 'imprint',
  		"maxTweets": 100,
  		"enableLinks": true,
  		"showUser": false,
  		"showTime": true,
  		"lang": 'en',
  		"showInteraction": false,
  		"customCallback": handleTweets,
  		"showRetweet": true
	};
	twitterFetcher.fetch(imprintfeed);


}
}
