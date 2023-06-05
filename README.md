# Boxy Startpage

A startpage is intended to replace the main "new tab" page within your browser.
 
The goal of this project is to allow the user to simply click a button to add new sections which can then have links added into them, allowing the customization of your page to what you find most important front and center. No need to open code editors.

In addition, the startpage comes with a TODO/Task list that stays local to your machine to keep yourself organized

<hr></hr>

## Using the Search Bar
The search bar will allow you to quickly type anything you'd like and send you to google searches as a result. Currently there are shortcut commands to a few sites to search more than just google. To use the shortcuts you simply type the command before your search. e.g. "/r startpages" will redirect you to the subreddit for startpages.

These commands include:

**/d** *... DuckDuckGo*

**/r** *... Reddit*

**/y** *... YouTube*

**/t** *... Twitter*

**/s** *... Stack Overflow*

>For Reddit results, it is sending you directly to subreddits and not actually using the Reddit search. This feature may come in the future if it's asked for, otherwise I'm intentionally leaving it as a redirect to a subreddit. If you do search with it, you can choose to use spaces or not. Searching for "/r start pages" will return the same result as "/r startpages"

>For Twitter results, you can specifically choose to look for hashtags only or just a regular keyword search. For hashtags simply add a # like you would on twitter. "/t #doom" will get only the doom hashtag posts while "/t doom" will get any posts including the word doom.

<hr></hr>

### TODO:
* setup demo site example
* ~~build layout~~ :heavy_check_mark:
* style with both dark and light mode
* ~~save options, links, and tasks to localstorage to keep current state of page~~ :heavy_check_mark:
* ~~add a clock~~ :heavy_check_mark:
* ~~*build search bar*~~ :heavy_check_mark:
	* choose default search engine
	* ~~add ability to toggle between search/add links/add tasks~~ :heavy_check_mark:

* build settings menu
	* popout menu
	* lightmode / darkmode toggle
	* stylized text options
	* favicon enable/disable
	* edit main links area
	
* build main section for links
	* ~~dropdown menu to choose where to save links~~ :heavy_check_mark:
	* ~~add new containers~~ :heavy_check_mark:
	* ~~add links within section~~ :heavy_check_mark:
	* delete links within selected section
	* edit links within selected section

	
* ~~build task list~~ :heavy_check_mark:
	* ~~add tasks~~ :heavy_check_mark:
	* ~~delete tasks~~ :heavy_check_mark:
	* ~~edit tasks~~ :heavy_check_mark:
	* ~~mark task complete~~ :heavy_check_mark:
	* add ability to track multiple types of tasks (weekly goals / daily goals)
