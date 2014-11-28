// This is to grab data from the UW Chevron's Twitter
// not working until can figure out how to use twitter


function getChevron(){
	var TwitterAPIKey = "nugk4CM3hmyMnQWNjnTYSg0H5";
	
	 $.ajax({
     type: "GET",
     dataType: "json",
     url: "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=TheUWChevron?key="+TwitterAPIKey,
     error: function(){
			alert("Failed to retreieve data");
		},
     success: function(data){
        $("#tweet_result").text(data.results[0].text);
     }
   });
}
