//jshint esversion

const express = require ("express"); 

const app = express();

app.get("/", function(req , res){
    res.send("<h1>hello world</h1>");

});

app.get("/contact",function(req, res){
    res.send("contact:junukvk143@gmail.com")
})

app.get("/about", function(req , res){
    res.send("<p>Iam junaid, iam the crater of this page</p>");
});

app.listen(3000, function(){
    console.log("server started on port 3000");

});

