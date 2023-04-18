const searchForm = document.querySelector('#searchForm')
const linkForm = document.querySelector('#linkForm')
const taskForm = document.querySelector('#taskForm')
const searchInput = document.querySelector('#searchInput')
const linkInput = document.querySelector('#linkInput')
const taskInput = document.querySelector('#taskInput')
const searchToggle = document.querySelector('#searchBtn')
const linksToggle = document.querySelector('#linkBtn')
const taskToggle = document.querySelector('#taskBtn')
const toggleButton = document.querySelectorAll('.svgBtn')
const tasks = document.querySelector('.tasks')

//Save Tasks in Local Storage
const LS_TASK_KEY = 'TASKS'
let saveTask = JSON.parse(localStorage.getItem(LS_TASK_KEY)) || []

//Save Links in Local Storage
const LS_LINK_KEY = 'LINKS'
const LS_LINKHEAD_KEY = 'LINKS.SECTION.ID'
let saveLinks = JSON.parse(localStorage.getItem(LS_LINK_KEY)) || []
let selectedLinkId = localStorage.getItem(LS_LINKHEAD_KEY)


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
  //since there are no seconds being tracked, the clock is only updated every 20sec instead of 1sec for slight performance increase
  setTimeout(currentTime, 20000)
}

currentTime()



// |-----------------------------------|
// | * * PAGE AND FORM STATE BEGIN * * | * * * * * * * * * * * * * * *
// |-----------------------------------|



// Select a specific button to set it as the currently active, run inputState() to get the function for the current form
toggleButton.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    toggleButton.forEach((b) => b.classList.remove('active'))
    btn.classList.add('active')
    inputState()
  })
})

// Save current state of selected button above form and save to localStorage
// e.g. click Tasks -> add 'active' to Tasks class -> display Tasks form to input data
function inputState() {
  switch(true) {
    // CONTROLS SEARCH TO INTERNET
    case searchToggle.classList.contains('active'):
      searchFunc()
      break;

    // CONTROLS ADDING LINKS TO PAGE
    case linksToggle.classList.contains('active'):
      addLinks()
      break;

    // CONTROLS ADDING TASKS TO TASKLIST
    case taskToggle.classList.contains('active'):
      addTasks()
    break;
  }
}



// |----------------------------|
// | * * SEARCH STATE BEGIN * * | * * * * * * * * * * * * * * * * * * *
// |----------------------------|



// On search form load (inline JS for default behavior), allow input shortcuts to search directly to a site
// e.g. click Search -> type /y Rick Astley -> you are taken directly to youtube results
function searchFunc() {
  searchForm.style.display = 'block' 
  linkForm.style.display = 'none'
  taskForm.style.display = 'none'

  const command = searchInput.value.slice(0, 3).toLowerCase()
  const actionInput = searchInput.value.slice(3)
  const joinStr = actionInput.split(' ').join('') // make input into one word if it has spaces

  switch (command) {
    case '/r ': //reddit
      searchForm.action = `https://reddit.com/r/${joinStr}`
      searchInput.name = ''
      break;

    case '/y ': //youtube
      searchForm.action = `https://www.youtube.com/results?search_query=${actionInput}`
      searchForm.method = 'POST'
      break;

    case '/t ': //twitter -- search hashtags specifically or just a general search for the keyword
      searchForm.action = (actionInput.includes('#'))
                    ? `https://twitter.com/hashtag/${joinStr.slice(1)}` 
                    : `https://twitter.com/search/${actionInput}`
      searchInput.name = ''
      break;

    case '/s ': //stack overflow
      searchForm.action = `https://stackoverflow.com/search?q=${actionInput}`
      searchForm.method = 'POST'
      searchInput.name = ''
      break;

    case '/d ': //duck duck go
      searchForm.action = `https://duckduckgo.com/${actionInput}`
      searchInput.name = ''
      break;
    
    // TODO : allow user to choose their default search

    default: // by default we are set to google on the html form
      searchForm.action = `https://google.com/search?${actionInput}`
      searchInput.name = 'q'
  }
}



// |------------------------------|
// | * * ADD LINKS FORM BEGIN * * | * * * * * * * * * * * * * * * * * *
// |------------------------------|



function addLinks() {
  searchForm.style.display = 'none'
  linkForm.style.display = 'block'
  taskForm.style.display = 'none'

  linkForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (linkInput.value === null || linkInput.value === '' || linkInput.value === ' ') return
    
    const links = {
      linkName: linkInput.value,
      // linkURL: linkUrl(),
      id: Date.now().toString()
    }
    
    saveLinks.push(links)
    localStorage.setItem(LS_LINK_KEY, JSON.stringify(saveLinks))
    console.log(`ADDED ${linkInput.value} TO LINK LOCALSTORAGE`)
    linkForm.reset()
  })
}



// |------------------------------|
// | * * TASK LIST FORM BEGIN * * | * * * * * * * * * * * * * * * * * *
// |------------------------------|

renderTasks()

function addTasks() {
  searchForm.style.display = 'none'
  linkForm.style.display = 'none'
  taskForm.style.display = 'block'

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (taskInput.value === null || taskInput.value === '' || taskInput.value === ' ') return
    
    const task = {
      taskName: taskInput.value,
      completed: false,
      id: Date.now().toString()
    }
    
    saveTask.push(task)
    localStorage.setItem(LS_TASK_KEY, JSON.stringify(saveTask))
    console.log(`ADDED ${taskInput.value} TO TASK LOCALSTORAGE`)
    taskForm.reset() // reset fresh form every submit so user can't spam themselves by holding down enter
    renderTasks()
  })
}

function renderTasks() {
  tasks.innerHTML = ''
  saveTask.forEach((task) => {
    const taskItem = document.createElement('div')
    taskItem.classList.add('taskItem')

    const label = document.createElement('label')
    const input = document.createElement('input')
    const span = document.createElement('span')
    const content = document.createElement('div')
    const edit = document.createElement('button')

    input.type = "checkbox"
    input.checked = task.completed
    span.classList.add('checked')
    content.classList.add('content')
    edit.classList.add('edit', 'taskBtn')

    content.innerHTML = `<input type="text" value="${task.taskName}" readonly>`
    edit.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24">
    <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3 M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"/>
    <line x1="16" y1="5" x2="19" y2="8" /></svg>`

    label.appendChild(input)
    label.appendChild(span)
    taskItem.appendChild(label)
    taskItem.appendChild(content)
    taskItem.appendChild(edit)
    tasks.appendChild(taskItem)

    if (task.completed) {
      taskItem.classList.add('completed')
    }

    input.addEventListener('click', (e) => {
      task.completed = e.target.checked
      localStorage.setItem(LS_TASK_KEY, JSON.stringify(saveTask))

      if (task.completed) {
        taskItem.classList.add('completed')
      } else {
        taskItem.classList.remove('completed')
      }
    })

		edit.addEventListener('click', (e) => {
			const taskInput = content.querySelector('input')
			taskInput.removeAttribute('readonly')
			taskInput.focus()
      taskInput.setSelectionRange(1000, 1000)
			taskInput.addEventListener('blur', (b) => {
				taskInput.setAttribute('readonly', true)
				task.taskName = b.target.value
        task.completed = false
				localStorage.setItem(LS_TASK_KEY, JSON.stringify(saveTask))
				renderTasks()
			})
		})


  })
}


// TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO 
// TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO 
// TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO 
// TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
// TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO 
// TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO 
// TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO 
// TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO 

// finish functions to render tasks from the localstorage

// write function to pull link ids from localstorage and connect them to link headers
// e.g. new header/div named "Music" -> save a bandcamp link inside the Music div to display in hero/links section

// write a menu for some defaults the user can set