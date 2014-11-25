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

$.ajax({
url: "http://uwimprint.ca/feeds/all",
cache: false
})
.done(function( html ) {
$( "#thirdTab" ).append( html );
});



}
