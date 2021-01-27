require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;

app.get("/", function (req, res) {
    res.send("server running");

})

app.listen(port, function () {
    console.log(`Weather App listening at port:${port}`);
});