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
            const weatherIcon = weatherData.weather[0].icon;
            const weatherImage = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`

            res.write(`<p>The forecast is currently ${weatherDescription}.</p>`);
            res.write(`<h1>The temperature in Washington is ${temp} degrees Fahrenheit</h1>`);
            res.write(`<img src=${weatherImage} alt="weather image icon">`);
            res.send();
        });
    });
})

app.listen(port, function () {
    console.log(`Weather App listening at port:${port}`);
});