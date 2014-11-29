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
