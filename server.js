'use strict'

//-----------------dependencies-------------------
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const superagent=require('superagent');
const PORT = process.env.PORT || 3000 ;
const app = express();
app.use(cors());


//test
app.get('/', (request, response) => {
    response.status(200).send("u did a great job");
    console.log(request);
});
//----------------Functions-------------------------
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);

//----------------------------------------------------

function locationHandler(request, response) {
   
    getLocation(request.query.data) //city from user
    .then( locationData => response.status(200).json(locationData) );
}

function getLocation(city) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.GEOCODE_API_KEY}`
    // console.log(url);
    return superagent.get(url)
    .then( data => {
      return new Location(city, data.body);
    })
   
}

function Location(city, data) {
    this.search_query = city;
    this.formatted_query = data.results[0].formatted_address;
    this.latitude = data.results[0].geometry.location.lat;
    this.longitude = data.results[0].geometry.location.lng;
}
//---------------------------------------------------------

// ---------------weather-----------------------------

function weatherHandler(request, response) {
    getWeather(request.query.data)
    .then( weatherData => response.status(200).json(weatherData) );

} 
  
  
function getWeather(city) {
    const url=`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${query.latitude},${query.longitude}`;
    return superagent.get(url)
   .then (data =>{
       console.log(data.body);  //data from super agent exist in body
       let weather = data.body;
       return weather.daily.data.map( (day) => {
         return new Weather(day);
       });
   });

}

function Weather(day) {
    this.forecast = day.summary;
    this.time = new Date(day.time * 1000).toDateString();

}


//----------------------errors----------------------------
app.get('/boo', (request, response) => {
    throw new Error('whoops');
});
app.use('*', (request, response) => {
    response.status(404).send("Not Found");
});
app.use((error, request, response) => {
    response.status(500).send("error");
});

//-----------------------app listenning------------------

app.listen(PORT, () => console.log(`App is listening on ${PORT}`) );