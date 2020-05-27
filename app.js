const express = require("express")
require('dotenv').config()
const bodyParser = require("body-parser")
const https = require("https")

const app = express();

const apiKey = process.env.WEATHER_API_KEY
const port = process.env.PORT || 3000

app.get("/", function(req, res){

  const cityName = "London"
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`

  https.get(url, response => {
    console.log(`statuscode is ${response.statusCode}`)

    response.on("data", data => {
      const weatherData = JSON.parse(data)
      const temperature = Math.round(weatherData.main.temp - 273.15).toFixed(1)
      const description = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const iconImageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`

      res.write(`<p>The weather is currently ${description}</p>`)
      res.write(`<h1>The temperature in ${cityName} is ${temperature} &degC </h1>`)
      res.write(`<img src="${iconImageURL}" alt="weather-icon">`)
      res.send()
    })
  })


})

app.listen(port, function(){
  console.log(`Server is running on port ${port}`)
})