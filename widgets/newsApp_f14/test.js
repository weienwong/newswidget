$.ajax({ 
    type: 'GET',
    url : 'http://uwchevron.wordpress.com/feed/',
    dataType: 'xml',
    success : function (xml){ 
        $(xml).find("item").each(function() {
           var title = $(this).find("title").text();
           $("#firstTab").append("hello");
      });
}
});
