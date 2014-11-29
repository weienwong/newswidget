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
	subString[1] = subString[1].substr(10, 6); // to remove "posted on" and "</p>"
      
      
     	var newNews = new newsItem(subString[0], subString[1], "http://uwchevron.wordpress.com/", "The UW Chevron");
     	var panelTemplate = "<div class=\"panel panel-default\"><div class=\"panel-body\"><b>"+newNews.article+"</b><br><br><div class=\"publishInfo\">Tweeted "+newNews.date+"<br> by: <a href=\"http://uwchevron.wordpress.com\">"+newNews.author+"</a></div><br></div></div></div>"
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
