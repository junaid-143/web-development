

const express = require("express");
const bodyParser =require ("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended:true})); 

app.get("/bmicalculator" , function(req, res){
    res.sendFile(__dirname + "/bmicalculator.html");
});

app.post("/" , function(req, res){

    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);

    var result = weight/(height*height) ;
    
    res.send( "your BMI result is :  " + result);
});


