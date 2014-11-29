// This is to grab data from the UW Chevron's Twitter
// not working until can figure out how to use twitter
function getChevron(){

// gets a list of html strings for each tweet
function handleTweets(tweets){
    var tweetNum = tweets.length;
    var element = document.getElementById('chevron');
    //console.log(tweets);
    
   
    for (var i = 0; i < tweetNum; i++){
      //console.log(tweets[i]);
    // var newsList = breakUpNews(tweets[i]);
     //console.log("the length is " + newsList.length);
      //console.log(newsList[0]);
      
      var subString = tweets[i].split('</p><p class="timePosted">');
  	// this returns a list of strings similar to:
  	// ["<p class="tweet">Look for new articles soon!", "Posted on 14 Nov</p>"]
  
  	subString[0] = subString[0].substr(17); // to remove the "P class tweet" tag
	 subString[1] = subString[1].substr(10, 6); // to remove "posted on" and "</p>"
      
      
      var newNews = new newsItem(subString[0], subString[1], "http://uwchevron.wordpress.com/", "The UW Chevron");
     var panelTemplate = "<div class=\"panel panel-default\"><div class=\"panel-body\"><b>"+newNews.article+"</b><br><br><div class=\"publishInfo\">Published on "+newNews.date+"<br> by: <a href=\"http://uwchevron.wordpress.com\">"+newNews.author+"</a></div><br></div></div></div>"
      var newsPanel = Mustache.to_html(panelTemplate);
		$("#newsApp_f14_fourthTab").append(newsPanel);
     
    }
    //html += '</ul>';
    //element.innerHTML = html;
}


	
	//attemtping to use Twitter Fetcher
	
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

	
	/*var TwitterAPIKey = "nugk4CM3hmyMnQWNjnTYSg0H5";
	OAuth.initialize(TwitterAPIKey);
	
    
    	OAuth.popup('twitter')
	.done(function(result) {
  		//use result.access_token in your API request 
		//or use result.get|post|put|del|patch|me methods (see below)
		result.get('/statuses/user_timeline.json?screen_name=TheUWChevron')
    		.done(function (response) {
        		console.log(response.name);
    		})
    		.fail(function (err) {
        		console.log("Failure fetching Twitter UW Chevron data: result.get");
        		console.log(err);
    		});
	})
	.fail(function (err) {
  		console.log("Failure fetching Twitter UW Chevron data: OAuth.redirect");
  		console.log(err);
	});*/
}
