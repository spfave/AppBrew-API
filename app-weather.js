require("dotenv").config();

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT;
const apiWeather = process.env.APIWEATHER;
app.use(bodyParser.urlencoded({ extended: true }));

// 
app.get("/", function (req, res) {
    res.sendFile(`${__dirname}/index.html`);
})

app.post("/", function (req, res) {
    // console.log(req.body.cityName);


    const query = req.body.cityName;
    const units = "imperial";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${apiWeather}`;
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const weatherImage = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`

            res.write(`<p>The forecast is currently ${weatherDescription}.</p>`);
            res.write(`<h1>The temperature in ${query} is ${temp} degrees Fahrenheit</h1>`);
            res.write(`<img src=${weatherImage} alt="weather image icon">`);
            res.send();
        });
    });
});

app.listen(port, function () {
    console.log(`Weather App listening at port:${port}`);
});