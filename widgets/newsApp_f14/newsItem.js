// Functions for a news item object
// use for: Imprint, Chevron, and Daily Bulletin sources
// as these don't return JSON objects


// Object constructor for newsItem
function newsItem(title, date, url, source){
  this.title = title; // the title of the news item - HTML string containing the entirety of the tweet
  this.date = date; // the date of the news item
  this.url = url;  // the url of the news item (since tweets normally do not link to individual articles, this should probably direct to the main site)
  this.source = source; // who published the article
}


// Takes in an HTML formatted tweet, and breaks it up into individual strings
// to be then passed to the newsItem constructor
// here is an example of the string format when passed into this function:
// <p class="tweet">Look for new articles soon!</p><p class="timePosted">Posted on 14 Nov</p>
function breakUpNews(string){
 
  var subString = string.split('</p><p class="timePosted">');
  // this returns a list of strings similar to:
  // ["<p class="tweet">Look for new articles soon!", "Posted on 14 Nov</p>"]
  
  subString[0] = subString[0].substr(17); // to remove the "P class tweet" tag
  substring[1] = subString[1].substr(10, 6); // to remove "posted on" and "</p>"
  
  
  console.log(subString);


}
