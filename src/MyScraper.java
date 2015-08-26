/* Github: brandonmanke.github.io
 * Date: 08/04/2015 US
 * 
 * GOAL:
 * Use JSoup to scrape an image off of prnt.sc (print screen tool)
 * website. Just random url generator: ex. http://prntscr.com/123456 
 * 
 * JSoup API:
 * http://jsoup.org/apidocs/org/jsoup/Jsoup.html
 * 
 * ISSUES:
 * Will throw errors sometimes during loop, for unknown reason at this time.
 * Image urls will be image shack 100% of this time (I think).
 */

import java.io.IOException;
//JSoup imports
import org.jsoup.Jsoup;
import org.jsoup.nodes.*;

public class MyScraper {
	
	//Generates random 6 character string from 0-z and adds it to the url string.
	//First working image ever pulled: http://prntscr.com/4tncah **(NSFW) South Park**
	private static String generateRandomURL() {
		String url = "http://prntscr.com/";
		String randomURL = "0123456789abcdefghijklmnopqrstuvwxyz";
		
		
		//decided to only generate 5-6 spaces of characters because almost everything in 2 character places is removed.
		for (int i = 0; i <= 5 + (int)(Math.random() * ((6 - 5))); i++) {
			//adds a random 6 character string with characters (0-z) from randomURL (i.e a1s3qd)
			url += randomURL.charAt((int)(Math.random() * randomURL.length() - 1));
		}
		return url;
	}
	
	private static boolean filterURLs(String url) {
		//filter: http://i.imgur.com/8tdUI8N.png (image removed screenshot)
		//take out specific part divide at "8tdUI8N"
		String filter = "8tdUI8N.png";
		//all image shack links start with "http://img" so I compare all the links with this:
		String imageshackFilter = "http://img";
		
		// if the substring of the imgur link equals filter OR the substring equals imageshack url 
		// then return false.
		//(filter.substring(20) is past https://i.imgur.com"/"xxxxx.
		if (url.substring(19,30).equals(filter) || url.substring(0, 10).equals(imageshackFilter)) {
			return false;
		} else {
			return true;
		}
	}
	
	/*public static String removeLastCharacter(String string) {
	*	Will try to fix/use this later.
	*	Removed last character of string.
	*	This helps with remove the extra ' " ' at the end of 5 space urls.
	*	return string.substring(0, string.length() - 1);
	*}
	*/

	public static void main(String[] args) throws IOException, Exception {
		//TODO: Improve runtime efficiency
		//		Make program loop and make sure to use thread.sleep(1000) OR
		//		Try to add this to a web page and display the picture every refresh/button.
		//		When the program returns false automatically loop it until it returns true.
		
		//added boolean repeat to allow program to loop until it finds a usable link.
		boolean repeat = false;
		
		try {
			do {
			
				//prints entire HTML page of connect("url")	
				Document doc = Jsoup.connect(generateRandomURL()).get();
	
				//screenshot-image id EX TEST: 731501
				Element image = doc.getElementById("screenshot-image");
	
				//cuts Element to substring of src="|IMGUR LINK|"
				//might change this later for more efficient things
				String srcURL = image.toString().substring(42, 72);

				if (filterURLs(srcURL)) {
					System.out.println(srcURL);
					repeat = false;
				} else {
					repeat = true;
				}
			} while(repeat); // only repeats if link is filtered out
		} catch (Exception error) {
			System.err.println("Error fetching url please try again. Sorry :/");
		}
	}
}