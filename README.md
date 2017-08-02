# web-scraper-prnt.sc

This is a web scraper for the site: http://prnt.sc/ that generates a random working image url from this site, then pulls it and displays the image (currently just the url in text).
I intend on making it into an actual web page that displays these random images on refresh.
The current version uses the [Node](https://nodejs.org/) module/API [Chromeless](https://github.com/graphcool/chromeless) , which basically makes it easier to configure chrome in headless mode to scrape/crawl webpages.

---

## How it works:

TODO

## How to run it:

 - [Download](https://github.com/brandonmanke/web-scraper-prnt.sc/archive/master.zip) or clone this repository. 
 - Install [Node](https://nodejs.org/).
 - Install the required modules for node (in this case it's just [Chromeless](https://github.com/graphcool/chromeless)).
 - Set up a headless instance of chrome locally.
 - Once everything is installed navigate to the directory script.js is in.
 - In your command line type: `node script.js`.
 - The script will find one valid url/image and then stop. (I am planning on using this with AWS lamda and don't want it to be a continous loop).

## Future plans

Configuring this remotely with something like AWS Lambda so I set up a webpage that displays these images.

## Licenses:

 - Chromeless ([MIT](https://opensource.org/licenses/MIT))
