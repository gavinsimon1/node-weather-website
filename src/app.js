const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


// App handlers
app.get('', (req, res) => {
   res.render('index', {
       title: 'Weather',
       name: 'Gavin'
   })

})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'We believe in you.  You can do it!',
        title: 'Help',
        name: 'Gavin'
    })
})

app.get('/about', (req, res) => {
res.render('about', {
    title: 'About',
    name: 'Gavin'
})
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
        
    }
 
geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
    if(error){
        return res.send({ error })
    } 
    forecast(latitude, longitude, (error, forecastData) => {
        if(error){
            return res.send({ error })
        }

        console.log('Forecast is ' + forecastData)
       
   

        res.send({
            forecast: forecastData,
            location, 
            address: req.query.address,
          
            
        })
 
    })
})
})




app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term.'
        })
    }
    //console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help Article Not Found',
        name: 'Gavin'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page Not Found',
        name: 'Gavin'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})
