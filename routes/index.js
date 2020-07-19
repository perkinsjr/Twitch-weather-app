const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const request = require("request");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/weather", function (req, res) {
  let zipcode = req.body.location;
  let apiKey = process.env.API_KEY;
  let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&units=imperial&appid=${apiKey}`;

  request(url, function (err, response, body) {
    if (err) {
      res.render("weather", {
        weather: null,
        error: "error, please try again, nothing was returned.",
      });
    } else {
      let weather = JSON.parse(body);
      if (weather.main == undefined) {
        res.render("weather", {
          weather: null,
          error: "error, please try again, the weather was undefined.",
        });
      } else {
        res.render("weather", {
          name: weather.name,
          temp: weather.main.temp,
          humidity: weather.main.humidity,
          feels_like: weather.main.feels_like,
          wind: weather.wind.speed,
          icon: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`,
          description: weather.weather[0].description,
          error: null,
        });
      }
    }
  });
});

module.exports = router;
