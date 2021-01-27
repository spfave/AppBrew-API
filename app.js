require("dotenv").config();

const express = require("express");
const https = require("https");

const app = express();
const port = process.env.PORT;
const apiWeather = process.env.APIWEATHER;


// 
app.get("/", function (req, res) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Washington&units=imperial&appid=${apiWeather}`;
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            console.log(temp);
            console.log(weatherDescription);
        });
    });

    res.send("server running");
})

app.listen(port, function () {
    console.log(`Weather App listening at port:${port}`);
});