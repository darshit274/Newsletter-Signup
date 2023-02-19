const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static("public"));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', function(req, res) {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_field: {
                    FNAME: firstname,
                    LNAME: lastname,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/386cdc421a";

    const options = {
        method: "POST",
        auth: "darshit12:45527f429ce1f52dfc5b3224595c054d-us14",
    }


    const request = https.request(url, options, function(response){

        if (response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html');
        
        } else {
            res.sendFile(__dirname + '/failure.html');
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
    //res.send("the firstname is " + firstname + ", the lastname is " + lastname + " and email is " + email); 
});


app.post('/failure', function(req, res) {
    res.redirect("/")
});


app.listen(process.env.PORT || 3000, function () {
    console.log('server listening on port 3000');
});
