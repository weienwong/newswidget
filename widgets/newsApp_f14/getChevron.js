// This is to grab data from the UW Chevron's Twitter
// not working until can figure out how to use twitter
function handleTweets(tweets){
    var x = tweets.length;
    var n = 0;
    var element = document.getElementById('chevron');
    var html = '<ul>';
    while(n < x) {
      html += '<li>' + tweets[n] + '</li>';
      var newsPanel = Mustache.to_html(panelTemplate, tweets[n]);
		$("#newsApp_f14_thirdTab").append(newsPanel);
      n++;
    }
    html += '</ul>';
    element.innerHTML = html;
}

function getChevron(){
	
	//attemtping to use Twitter Fetcher
	
	var chevronfeed {
  		"id": '347099293930377217',
  		"domId": 'chevron',
  		"maxTweets": 5,
  		"enableLinks": true,
  		"showUser": true,
  		"showTime": true,
  		"lang": 'en',
  		"customCallback": handleTweets
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
