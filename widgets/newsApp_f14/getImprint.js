// Using Facebook API to get links Imprint has posted
function formatImprintJson(jsonObj){
	var newsArticles = jsonObj.data;
	var headlines = "";

	console.log(jsonObj);

	var panelTemplate = "<div class=\"panel panel-default\"><div class=\"panel-body\"><b><a target=\"_blank\" href={{link}}>{{title}}</a></b><br><br><div class=\"publishInfo\">Published on {{published}}<br> by: {{site}}</div><br></div></div></div>";

	for (var i = 0; i < newsArticles.length; i++){
		var newsPanel = Mustache.to_html(panelTemplate, newsArticles[i]);
		$("#newsApp_f14_thirdTab").append(newsPanel);
	}
}


function getImprint(){

$.ajax({ 
   //var FBkey = 'f699059732366ffacbe5968da892c991';
    
    type: 'GET',
    url : 'https://graph.facebook.com/v2.2/UWImprint/feed?access_token='+ FBkey,
    dataType: 'json',
    error : function (){
        alert("grabbing FB data did not work");
    },
    success : function (data){ 
        alert("grabbing FB data worked");
    }
});
}
