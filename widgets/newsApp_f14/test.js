function testit(){

$.ajax({ 
    type: 'GET',
    url : 'http://uwchevron.wordpress.com/feed/',
    dataType: 'xml',
    error : function (xml){
        alert("grabbing data did not work");
    },
    success : function (xml){ 
        $(xml).find("item").each(function() {
           var title = $(this).find("title").text();
           alert("grabbing data worked");
        });
    }
});


function parseRSS(url, callback) {
  $.ajax({
    url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent("http://uwimprint.ca/feeds/all"),
    dataType: 'json',
    success: function() {
      alert("second attempt worked");
      callback(data.responseData.feed);
    },
    error : function(){
        alert("second attempt failed");
    }
  });
}


}
