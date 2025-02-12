//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt =require("mongoose-encryption");

const app = express();

// console.log(process.env.API_KEY);


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));

mongoose.connect("mongodb://localhost:27017/userDB");


const userSchema = new mongoose.Schema({
    email:String,
    password:String
});


userSchema.plugin(encrypt, { secret: process.env.SECRET,encryptedFields:["password"] });


const User = new mongoose.model("User",userSchema);

app.get("/",function(req,res){
    res.render("home");
});


app.get("/login",function(req,res){
    res.render("login");
});

app.get("/register",function(req,res){
    res.render("register");
});

app.post("/register",function(req,res) {
    const newUser = new User ({
        email: req.body.username,
        password: req.body.password
    });

    async function saveUser(newUser, res) {
        try {
            await newUser.save();
            res.render("secrets");
           
            
        } catch (err) {
            console.log(err);
        }
    }
    saveUser(newUser, res);    
});

app.post("/login",async function(req,res){
    const username = req.body.username;
    const password= req.body.password;

    try{
        const foundUser = await User.findOne({email:username});

        if (foundUser){
            if(foundUser.password===password){
                res.render("secrets");
            }else{
                res.send("Incorrected Password");
            }
        }else{
            res.send("User not found");
        }
    }catch(err){
        console.log(err);
        res.send("An error occured during login"); 
        
    }

}); 









app.listen(3000, function () {
    console.log("Server started on port 3000");
});

