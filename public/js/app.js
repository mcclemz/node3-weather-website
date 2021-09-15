console.log('Client side javascript file is loaded!')

constWeatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent 'From JavaScript'

//to make an http request from client side javascript. you can't use it in a backend script.

fetch('http://puzzle.mead.io.puzzle').then((response) => {
  response.json().then((data) => {
    console.log(data)  //dump data to the console.
  })
})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {   // e is for addEventListener
  e.preventDefault()

  const location = search.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast

      }
    })
  })
})
