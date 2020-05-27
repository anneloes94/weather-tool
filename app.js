const express = require("express")
const app = express();
const https = require("https")

const apiKey = process.env.WEATHER_API_KEY

const port = process.env.PORT ||3000

app.get("/", function(req, res){

  const cityName = "London"
  const url = `api.openweathermap.org/data/2.5/weather?q={${cityName}}&appid={${apiKey}}`

  https.get(url, function(response){
    console.log(response)
  })

  res.send("Hello!")
})

app.listen(port, function(){
  console.log(`Server is running on port ${port}`)
})