// This is to grab data from the UW Chevron's Twitter
// not working until can figure out how to use twitter


function getChevron(){
	var TwitterAPIKey = "nugk4CM3hmyMnQWNjnTYSg0H5";
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
        		//handle error with err
    		});
	})
	.fail(function (err) {
  		//handle error with err
	});
}
