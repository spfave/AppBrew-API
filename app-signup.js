require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");


// 
const port = process.env.PORT;
const apiMailC = process.env.APIMAILCHIMP;
const audIDMailC = process.env.AUDIENCEID;

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


// 
app.get("/", function (req, res) {
    res.sendFile(`${__dirname}/signup.html`);
});

app.post("/", function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                },
            }
        ]
    };
    let jsonData = JSON.stringify(data);

    const url = `https://us7.api.mailchimp.com/3.0/lists/${audIDMailC}`;
    const options = {
        method: "POST",
        auth: `sebastinpf:${apiMailC}`,
    };

    const request = https.request(url, options, function (response) {
        console.log(response.statusCode);
        if (response.statusCode === 200) {
            res.sendFile(`${__dirname}/success.html`);
        } else {
            res.sendFile(`${__dirname}/failure.html`);
        }


        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.post("/failure", function (req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT || port, function () {
    console.log(`Server listening on port ${port}`);
});