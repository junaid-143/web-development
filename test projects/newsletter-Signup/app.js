 const express = require("express");
 const bodyParser = require("body-parser");
 const request = require("request");
 const https = require("https");


 const app = express();

 app.use(express.static("public"));
 app.use(bodyParser.urlencoded({extended:true}));

 app.get("/",function(req,res){
   res.sendFile(__dirname + "/signup.html")
 })

app.post("/",function(req,res){

   const firstname=req.body.fname;
   const lastname=req.body.lname;
   const email =req.body.email;

   const data = {
      members:[
         {
            email_address:email,
            status: "subscribed",
            merge_fields:{
               FNAME: firstname,
               LNAME: lastname
            }
         }
      ]
   };

   var jsonData = JSON.stringify(data);

   const url ="https://us12.api.mailchimp.com/3.0/lists/4bcf3cbb34" ;

   const options ={
      method:"POST",
      auth:"junaid1:50278cc4fb9be07dac8ac78d184b4541-us12"

   }

  const request = https.request(url,options ,function(response){

      if(response.statusCode === 200){
         res.send("Successfully subscribed ");

      }
      else{
         res.send("There was an eroor");
      }


      response.on("data",function(data){
         console.log(JSON.parse(data));
      })
   }) 

   request.write(JSON.parse(data));
   request.end();
   

}) ;

 app.listen(3000, function(){
    console.log("Server is running on port 3000");
    
 });


//  50278cc4fb9be07dac8ac78d184b4541-us12