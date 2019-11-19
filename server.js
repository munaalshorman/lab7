'use strict'
require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const  PORT = process.env.PORT;
const app = express();
console.log(app);
app.use(cors());


app.get('/', (request,response)=>{
    response.status(200).send("u did a great job");
    console.log(request);
});

app.get('/location', (request, response) => {
    const locationData = require('./data/geo.json');
    const location = new Location(locationData);
    response.status(200).json(location);
  });
function Location( data ) {
    this.search_query = 'lynnwood';
    this.formatted_query = data.results[0].formatted_address;
    this.latitude = data.results[0].geometry.location.lat;
    this.longitude = data.results[0].geometry.location.lng;
  }

//   [
//     {
//       "forecast": "Partly cloudy until afternoon.",
//       "time": "Mon Jan 01 2001"
//     },
//     {
//       "forecast": "Mostly cloudy in the morning.",
//       "time": "Tue Jan 02 2001"
//     },
//     ...
//   ]


//  function weatherHandler (request,response) {
  //     let weatherData = getWeather(require.query.data);
  //     // const weather = new Weather(weatherData);
  //     response.status(200).json(weatherData);
  //   };
  
  // function getWeather (city){
    //   let data = require('./data/darksky.json');
    //   return data.daily.map((day)=> {
      //     return new Weather(day);
      //   });
      // }
      
      
      // function Weather(day) {
        //     this.forecast = day.summary;
        //     this.time = new Date(day.time *1000).toString();  
        
        
        // }
        
        app.get('/weather', weatherHandler);
function weatherHandler(req,res) {
  let weatherData = getWeather(req.query.data);
  res.status(200).json(weatherData);
}
function getWeather (city) {
  let data = require('./data/darksky.json');
  return data.daily.data.map( (day) => {
      return new Weather(day);
  })
};
function Weather( day ) {
    this.forecast = day.summary;
    this.time = new Date(day.time * 1000).toDateString();
        // this.latitude = data.latitude
        // this.longitude = data.longitude
      }



app.get('/boo', (request,response)=>{
throw new Error('whoops');
});
app.use('*',(request,response)=> {
    response.status(404).send("Not Found");
});
app.use((error, request, response)=>{
    response.status(500).send("error");
});
app.listen( PORT, ()=> console.log(`app listening on ${PORT}`));
