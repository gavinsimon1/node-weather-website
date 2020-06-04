const request = require('request')



const forecast = (latitude, longitude, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=653e5687ea7d5b6d40539021f0de0cfc&query=" + latitude + "," + longitude + "&units=f"        
       
    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if(body.error) {
            callback('Unable to find location.', undefined)
        } else {
          callback(undefined, "The weather is " + body.current.weather_descriptions + ".  The temperature is " + body.current.temperature + " degrees.  It feels like " + body.current.feelslike + " degrees." )
          }
        })
    }
    


module.exports = forecast