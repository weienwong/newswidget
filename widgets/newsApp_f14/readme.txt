==========================================
University of Waterloo News Widget

By: Rebecca Thomson, Wei-En Wong
    (20287188)       (20437270)
==========================================

This widget is designed to pull information and news items from several different websites.
It was created because we found for uWaterloo students, or possibly even staff and faculty, 
it was easy to become "out of the loop" when it comes to knowing information about what is going on 
around the university. We thought keeping all of the information in one place would be a convenient 
way for people involved with uWaterloo to stay informed.

The sources we chose to pull information from are: news items from uWaterloo websites,
the UW subreddit from reddit.com, The Imprint, The UW Chevron, The Daily Bulletin, and the official
University of Waterloo twitter feed. We chose these sources because we felt they are a good mix of
official news articles, as well as real-time information about current events.

Some of the other sources we considered were: MathNews, the Iron Warrior, and The Record. However,
due to the space constraints of the widget and the fact we wanted the information to be helpful
to as wide of an audience at uWaterloo as possible, we excluded these. We also considered pulling items 
from www.omguw.com, however we found these entries contain more opinion and less fact, and what might be
news-related are usually posted on the UW subreddit anyway.

The news items from the uWaterloo websites and the subreddit postings are both done with APIs, 
the UW open API and the Reddit API respectively. We had initially intended to pull from the
Imprint's, Chevron's and Daily Bulletin's RSS feeds, but ran into issues with same origin
restrictions, so we decided to use their Twitter feeds instead. We also ran into issues using
Twitter's newer API, so we found code on GitHub that allows us to get around this by pulling information
from a custom-made widget on the Twitter website. We are using this code with the original developer's
permission, and you can view more information about it if you look at TwitterFetcher.js.

The API sources are using JSON attributes formatted through mustache. The other sources are similar
but since the information is given in an html formatted string instead of a JSON object, 
these strings are parsed and processed prior to being passed through mustache.

The icons at the top show which feed you are looking at, it is defaulted on the first (news from the
uWaterloo web sites). If you aren't sure which icon belongs to which feed, you can also hover over the icon
to see the name of that source. Each feed is located in it's own "tab", and each item is located in its own "panel".
Links to individual news articles or postings are present where appropriate. Along with each posting title or tweet
is author information and date information where it was made available to us. Tweets do not contain a URL to each
individual tweet, however, there is a link to their respective Twitter feed.

We had played with the idea of also including an "all" tab, which would contain a feed from all of the sources, 
however we found that since every source returned information in a different way, and the Reddit source 
does not even include dates, this would be very cumbersome to implement given the restrictions of the assignment.

We hope that by using our widget you will see how it might be useful to people at uWaterloo. Enjoy!
