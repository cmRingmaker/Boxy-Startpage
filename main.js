// function to create a new div in order to add a new "container" to the hero section

// function to ask user input to add links within the new containers

// add localstorage key value pairs to save hero section info
// -----------------------

//using commands such as /r /y /t ...etc the user can search directly on a given site
function searchFunc() {
  const form = document.getElementById('formInput')
  const search = document.getElementById('searchInput')
  const command = search.value.slice(0, 3).toLowerCase()
  const actionInput = search.value.slice(3)

  switch (command) {
    case '/r ': //reddit
      // make input into one word if it has spaces. ... e.g. /r start pages = /r startpages
      const joinStr = actionInput.split(' ').join('')
      form.action = `https://reddit.com/r/${joinStr}`
      break;

    case '/y ': //youtube
      form.action = `https://www.youtube.com/results?search_query=${actionInput}`
      form.method = 'POST'
      break;

    case '/t ': //twitter
      // search hashtags specifically or just a general search for the keyword
      form.action = (actionInput.includes('#'))
                    ? `https://twitter.com/hashtag/${actionInput.slice(1)}` 
                    : `https://twitter.com/search/${actionInput}`
      break;

    case '/s ': //stack overflow
      form.action = `https://stackoverflow.com/search?q=${actionInput}`
      form.method = 'POST'
      break; 

    case '/d ': //duck duck go
    form.action = `https://duckduckgo.com/${actionInput}`
    break;
    
    // TODO : allow user to choose their default search

    default: // by default we are set to google on the html form
      search.name = 'q'
  }
}