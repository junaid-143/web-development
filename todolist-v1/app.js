const bodyParser = require("body-parser");

const express= require("express");


const app= express();

let items = ["Buy food","Cook food"];
let work = [];


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.set("view engine","ejs");

app.get("/",function(req,res){

    let today = new Date(); 
     

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);


 
    res.render("list",{listTitle: day, newListItems:items});
});


app.post("/" , function(req,res){

    var item = req.body.newItem;

    if (req.body.item === "work") {
     workItems.push(item);   
     res.redirect("/work");
    }
    else{
       item.push(item);
       res.redirect("/"); 
    }


    items.push(item); 

    console.log(item);
    res.redirect("/");
    
});

app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work List",newListItems:items});
});

app.post("/work", function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});



app.listen(3000, function(){
    console.log("Server started on port 3000");

});