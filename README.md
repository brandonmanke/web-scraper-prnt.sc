# web-scraper-prnt.sc

This is a web scraper for the site: http://prnt.sc/ that generates a random working image url from this site, then pulls it and displays the image (currently just the url in text).
I intend on making it into an actual web page that displays these random images on refresh.
The current version uses the [Node](https://nodejs.org/) modules [Cheeriojs](https://github.com/cheeriojs/cheerio) and [Phantom](https://github.com/amir20/phantomjs-node/tree/master).

---

##How it works:

First a URL is generated using the ```generateRandomURL()``` function. Once the URL is generated it is then loaded by Phantom, a scriptable headless WebKit.
(I initially wanted to use requestjs, but it only parsed static webpages. Which caused problems generating the source URL for '#screenshot-image').
Once Phantom loads the site (this currently takes a variable amount of time (i.e. 2 seconds - 20 seconds)). Cheerio then parses the html to find the img element
with the ID "#screenshot-image" it then pulls the src attribute to find the hosted URL. Finally the Url is printed.

##How to run it:

 - Download this repository.
 - Install [Node](https://nodejs.org/).
 - Install the required modules for node ([Cheeriojs](https://github.com/cheeriojs/cheerio) & [Phantom](https://github.com/amir20/phantomjs-node/tree/master)).
 - Once everything is installed navigate to the directory script.js is in.
 - In your command line type: ```node script.js```.
 - The script should be running and pulling available urls.

##Future plans

I plan on hopefully improving the runtime of the entire program, but we will see what happens. I will mainly be focused on pulling the image and displaying it in
the browser. ~~(I plan on implementing node modules in browser with [Browserify](http://browserify.org/))~~. Until the I am completely open to suggestions of what to do
and what not to do.


##Licenses:

 - Cheerio ([MIT](https://opensource.org/licenses/MIT))
 - Phantom ([ISC](https://opensource.org/licenses/ISC))
