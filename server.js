'use strict'
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT;
const app = express();
console.log(app);
app.use(cors());


app.get('/', (request, response) => {
    response.status(200).send("u did a great job");
    console.log(request);
});
//
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);

function locationHandler(request, response) {
    console.log(request.query);
    let locationData = getLocation(request.query.data);
    response.status(200).json(locationData);
};

function getLocation(city) {
    let data = require('./data/geo.json');
    return new Location(city, data);
}

function Location(city, data) {
    this.search_query = city;
    this.formatted_query = data.results[0].formatted_address;
    this.latitude = data.results[0].geometry.location.lat;
    this.longitude = data.results[0].geometry.location.lng;
}

// ---------------weather-----------------------------

function weatherHandler(request, response) {
    console.log(request.query);
    let weatherData = getweather(request.query.data);
    response.status(200).json(weatherData);
};

function getWeather(city) {
    let data = require('./data/darksky.json');
    return data.daily.data.map((day) => {
        return new Weather(day);
    });
}

function Weather(day) {
    this.forecast = day.summary;
    this.time = new Date(day.time * 1000).toDateString();

}





// function weatherHandler(req, res) {
//             let weatherData = getWeather(req.query.data);
//             res.status(200).json(weatherData);
//         }
// function getWeather(city) {
//             let data = require('./data/darksky.json');
//             return data.daily.data.map((day) => {
//                 return new Weather(day);
//             })
//         };




app.get('/boo', (request, response) => {
    throw new Error('whoops');
});
app.use('*', (request, response) => {
    response.status(404).send("Not Found");
});
app.use((error, request, response) => {
    response.status(500).send("error");
});
app.listen(PORT, () => console.log(`app listening on ${PORT}`));