// TODO :
// function to create a new div in order to add a new "container" to the hero section
// function to ask user input to add links within the new containers
// function to add tasks to the task list
// function to save current state of selected button/form
// function to save to localstorage for links, forms, and tasks
// -----------------------

const form = document.getElementById('formInput')
const search = document.getElementById('searchInput')
const searchToggle = document.querySelector('#searchBtn')
const linksToggle = document.querySelector('#linksBtn')
const todoToggle = document.querySelector('#todoBtn')
const toggleButton = document.querySelectorAll('.svgBtn')
const todos = document.querySelector('#todos')


// Clock
function currentTime() {
  let date = new Date()
  let hh = date.getHours()
  let mm = date.getMinutes()
  let ampm = "AM"
  
  mm = (mm < 10) ? "0" + mm : mm
  if (hh == 0) {hh = 12}
  if (hh > 12) {
      hh = hh - 12
      ampm = "PM"
   }

  let time = `${hh}:${mm} ${ampm}`
  document.getElementById("clock").innerText = time
  //since there are no seconds being tracked, the clock is only updated every 20sec instead of 1sec for slight performance
  setTimeout(currentTime, 20000)
}

currentTime() // call

//using commands such as /r /y /t ...etc the user can search directly on a given site
function searchFunc() {
  const command = search.value.slice(0, 3).toLowerCase()
  const actionInput = search.value.slice(3)
  const joinStr = actionInput.split(' ').join('') // make input into one word if it has spaces

  switch (command) {
    case '/r ': //reddit
      form.action = `https://reddit.com/r/${joinStr}`
      break;

    case '/y ': //youtube
      form.action = `https://www.youtube.com/results?search_query=${actionInput}`
      form.method = 'POST'
      break;

    case '/t ': //twitter -- search hashtags specifically or just a general search for the keyword
      form.action = (actionInput.includes('#'))
                    ? `https://twitter.com/hashtag/${joinStr.slice(1)}` 
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
      form.action = `https://google.com/search?${actionInput}`
      search.name = 'q'
  }
}


// |-----------------------------------|
// | * * PAGE AND FORM STATE BEGIN * * |
// |-----------------------------------|

// Set active to last clicked button, call inputSaveState() and get data from localStorage
toggleButton.forEach((btn) => {
  btn.addEventListener('click', e => {
    toggleButton.forEach((b) => b.classList.remove('active'))
    btn.classList.add('active')
    inputSaveState()
  })
})

function inputSaveState() {
  // Save current state of selected button above form and save to localStorage
  // e.g. click search -> add 'active' to search class -> change form state to 'search' parameters
  const LOCAL_STORAGE_SAVESTATE_KEY = 'current.activeForm'
  let activeForm = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SAVESTATE_KEY)) || []

  switch(true) {
    // CONTROLS SEARCH TO INTERNET
    case searchToggle.classList.contains('active'):
      console.log('search active') // remove later
      search.placeholder = 'Searchin...'
      break;

    // CONTROLS ADDING LINKS TO PAGE
    case linksToggle.classList.contains('active'):
      console.log('links active') // remove later
      search.placeholder = 'Add a Link...'
      break;

    // CONTROLS ADDING TASKS TO TASKLIST
    case todoToggle.classList.contains('active'):
      console.log('todo active') // remove later
      search.placeholder = 'Add a Task...'
    break;
  }
}

// |---------------------------------|
// | * * PAGE AND FORM STATE END * * |
// |---------------------------------|