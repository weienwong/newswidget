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
	subString[1] = subString[1].substr(10, 6); // to remove "posted on" and "</p>"
      
      	if (subString[1] === "hours "){
      		subString[1] = "hours ago";
      	}
      
     	var newNews = new newsItem(subString[0], subString[1], "http://uwimprint.ca/", "Imprint");
     	var panelTemplate = "<div class=\"panel panel-default\"><div class=\"panel-body\"><b>"+newNews.article+"</b><br><br><div class=\"publishInfo\">Tweeted "+newNews.date+"<br> by: <a href=\"http://uwimprint.ca\">"+newNews.author+"</a></div><br></div></div></div>"
      	var newsPanel = Mustache.to_html(panelTemplate);
		$("#newsApp_f14_thirdTab").append(newsPanel);
     
    }
   
}

	//Uses Twitter Fetcher
	
	var imprintfeed = {
  		"id": '538765938683052032',
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
