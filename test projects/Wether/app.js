const { log } = require("console");
const express = require("express");
const https = require("https");
const bodyParser= require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get ("/", function(req,res){

    res.sendFile(__dirname + "/index.html") 
        });
        app.post("/", function(req, res){     
            
    const query = req.body.cityName ;
    const apiKey = "f0f1f107480346ce6c000882800f6b3e";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"%20&appid=" + apiKey + "&units=" + unit ;
    https.get(url, function(response){
            
        response.on("data", function(data){
           const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" +icon + "@2x.png"
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperatour in "+ query +" is "+ temp + " degrees Celcius.</h1>");
            res.write("<img src="+imageURL+ ">")
            res.send()   
        });
    }) ;
        });

   

 
 


app.listen(3000, function(){
    console.log("Your server is running on port 3000")
});