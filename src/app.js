const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000 //heroku sets this for the environment
// 3000 will be the default/fallback in heroku port is not working.

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve assets
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Clem Chinyani'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Clem Chinyani'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Clem Chinyani'
    })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {           //<<<--- if the address is not provided by the searcher in the browser
    return res.send ({
      error: 'You must provide the city'
    })
  }

  //use the address to geocode
  geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {  // two inputs for geocode, one search query and the other a destructured callback which sends a json back.
    if (error) {
      return res.send ({ error: error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
    }

    res.send ({
        forecast: forecastData,
        location,
        address: req.query.address
        })

    })
  })
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Germantown',
    //     address: req.query.address       // <<<--- from the client/browser input
    // })
})

app.get('/products', () => {
  res.send({
    products: []
  })
})

// notice the difference between res.send above and res.render from views below.

//for help on the help page- anything coming after help on the page

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404' ,
    name: 'Clem Chinyani',
    errorMessage: 'Help article not found.'
  })
})

// when the app can't find any of the above paths...help...about..index etc
app.get('*', (req, res) => {
    res.render('404', {
      title: '404',
      name: 'Clem Chinyani',
      errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.' + port)
})
