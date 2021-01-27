require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const port = process.env.PORT;
app = express();


// 
app.get("/", function (req, res) {
    res.send("Hello");
});

app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
})