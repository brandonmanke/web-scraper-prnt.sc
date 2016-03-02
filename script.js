// Name: Brandon Manke
// Thanks to https://github.com/bnned
// Web Scraper using node, cheerio, and phantom to scrape prnt.sc
// Licenses: Cheerio (MIT), Phantom (ISC)

var phantom = require('phantom')
var cheerio = require('cheerio')

function generateRandomURL () {
  var url = 'http://prnt.sc/'
  var randomURL = '0123456789abcdefghijklmnopqrstuvwxyz'

  // from 0 to 5-6 characters in length
  for (var i = 0; i < Math.floor(Math.random() * (6 - 5 + 1)) + 5; i++) {
    url += randomURL.charAt(Math.floor(Math.random() * randomURL.length))
  }
  return url
}

function filterURL (url) {
  var filter = '8tdUI8N.png'
  var imageShackFilter = 'http://img' // might need to specify this more or change it

  // filters out images that are removed/do not exist
  if (url.substring(19, 30).valueOf() === filter || url.substring(0, 10).valueOf() === imageShackFilter) {
    return false
  } else {
    return true
  }
}

// Uses headless webkit Phantom to load the entire non-static page
function parseUrl () {
  var randURL = generateRandomURL()
  phantom.create().then(function (ph) {
    ph.createPage().then(function (page) {
      page.open(randURL).then(function (status) {
        page.property('content').then(function (content) {
          // cheerio parsing html once page is loaded
          var $ = cheerio.load(content)
          var img = $('#screenshot-image').attr('src')
          // filtering image
          if (filterURL(img)) {
            console.log(img)
          } else {
            console.log('Image not found. Please wait while next url is parsed.. \n')
          }
          ph.exit()
          parseUrl()
        })
      })
    })
  })
}

console.log('Starting scraper, please wait while page is being loaded. (Ctrl+C to terminate)')
parseUrl()
