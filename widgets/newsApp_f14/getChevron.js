// This is to grab data from the UW Chevron's Twitter
// not working until can figure out how to use twitter


function getChevron(){
	var TwitterAPIKey = "GET&https%3A%2F%2Fapi.twitter.com%2F1.1%2Fstatuses%2Fuser_timeline.json&oauth_consumer_key%3Dnugk4CM3hmyMnQWNjnTYSg0H5%26oauth_nonce%3D3806e62fc6c942c94883010941ad1f6f%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1417206146%26oauth_version%3D1.0%26screen_name%3DTheUWChevron";
	OAuth.initialize(TwitterAPIKey);
    
    	OAuth.popup('twitter')
	.done(function(result) {
  		//use result.access_token in your API request 
		//or use result.get|post|put|del|patch|me methods (see below)
		result.get('/1.1/statuses/user_timeline.json?screen_name=TheUWChevron')
    		.done(function (response) {
        		console.log(response.name);
    		})
    		.fail(function (err) {
        		console.log("Failure fetching Twitter UW Chevron data: result.get");
        		console.log(err);
    		});
	})
	.fail(function (err) {
  		console.log("Failure fetching Twitter UW Chevron data: OAuth.popup");
  		console.log(err);
	});
}
