// This is to grab data from the UW Chevron's Twitter
// not working until can figure out how to use twitter
function getChevron(){

function handleTweets(tweets){
    var x = tweets.length;
    var n = 0;
    var element = document.getElementById('chevron');
    var html = '';
    console.log(tweets);
    
    while(n < x) {
      html = tweets[n];
      var panelTemplate = "<div class=\"panel panel-default\"><div class=\"panel-body\"><a target=\"_blank\" href=\"\"><b>"+html+"</b></a><br><br></div></div>"
      var newsPanel = Mustache.to_html(panelTemplate, tweets[n]);
		$("#newsApp_f14_fourthTab").append(newsPanel);
      n++;
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
