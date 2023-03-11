const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.post('/', (req,res)=>{
    
    let fName = req.body.fName;
    let lName = req.body.lName;
    let email = req.body.email;

    const data = {
        members : [
            {
            email_address : email,
            status : "subscribed",
            merge_fields : {
                FNAME : fName,
                LNAME : lName
            }}
        ]
    }

    const jsonData = JSON.stringify(data);

    // console.log(fName, lName, email);
    const url = "https://us21.api.mailchimp.com/3.0/lists/1463d1f473";
    const options = {
        method : "POST",
        auth : "akash1:2a638244cd3ac0545e1b86851100a201-us21"
    }


    const request = https.request(url, options, function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        } else{
            res.sendFile(__dirname+"/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
            
        })

    })
    
    
    request.write(jsonData);
    request.end();

})

app.post('/failure', (req, res)=>{
    res.redirect('/');
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Listening on port http://localhost:3000/");
})


// API key - 2a638244cd3ac0545e1b86851100a201-us21
// Audience Id - 1463d1f473
// url - https://us21.api.mailchimp.com/3.0/