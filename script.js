/**
 * @author Brandon Manke
 * @license MIT
 *
 * This webscraper headless chrome instance to pull images from the screenshot site prnt.sc
 * It generates a random url then pulls an image if it exists at that url. Images may be NSFW.
 * Be sure to have a local version of chrome running in headless mode, before you run this script.
 */
const { Chromeless } = require('chromeless');

/**
 * Generates a random url for prnt.sc domain, 5 to 7 characters in length past the '/'
 * @return {string} randomly generated url
 */
function generateRandomURL() {
  let url = 'http://prnt.sc/';
  const randomURL = '0123456789abcdefghijklmnopqrstuvwxyz';

  // from 0 to 5-7 characters in length
  for (let i = 0; i < Math.floor(Math.random() * (7 - 5 + 1)) + 5; i++) {
    url += randomURL.charAt(Math.floor(Math.random() * randomURL.length));
  }
  return url;
}

/**
 * Filters url that scraper pulls from page.
 * @param {string} url that is passed into the filter. In this case it is always passed by generateRandomURL()
 * @return {boolean} false if image does not exist
 * @return {boolean} true if image exists
 */
function isValidURL(url) {
  const filter = '8tdUI8N.png';
  const newFilter = 'https://st.prntscr.com/2017/07/03/0920/img/0_173a7b_211be8ff.png';
  const imageShackFilter = 'http://img'; // might need to specify this more or change it

  // filters out images that are removed/do not exist
  if ((url.substring(19, 30).valueOf() === filter) 
    || url.substring(0, 10).valueOf() === imageShackFilter
    || url === newFilter
    || url === '') {
    return false;
  } else {
    return true;
  }
}

/**
 * Using the chromeless to visit random page and find the users screen shot src
 * @return {string} url of image if it passes the url filter
 * @return {null} null if image does not bypass filter (i.e. doesn't exist or was removed)
 */
async function scraper() {
  const chromeless = new Chromeless();
  const randomURL = generateRandomURL();

  const randomImage = await chromeless
    .goto(randomURL)
    .wait('#screenshot-image')
    .evaluate(() => {
      const img = document.querySelector('#screenshot-image').src;
      return img;
    });

  console.log('image:', randomImage);
  await chromeless.end();

  if (isValidURL(randomImage)) {
    return randomImage;
  } else {
    return null;
  }
}

/**
 * Our main asynchronous runtime logic. It will run until the scraper finds an image that exists. 
 * (i.e. When scraper() doesn't return null)
 */
async function run() {
  try {
    const result = await scraper();
    if (!result) {
      run();
    }
  } catch (error) {
    console.log(error);
  }
}

// canary --remote-debugging-port=9222 --disable-gpu --headless
run();
