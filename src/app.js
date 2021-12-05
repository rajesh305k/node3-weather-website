const path = require("path");
const express = require("express");
const hbs = require('hbs');
const request = require("postman-request");
const chalk = require("chalk");

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const port = process.env.PORT || 3000;

// console.log("hello")
console.log(path.join(__dirname));

//define paths for express config, partials
const viewsPath = path.join(__dirname,'../templates/views');
const pulbicDirectoryPath = path.join(__dirname,'../public');
const partialsPath = path.join(__dirname,'../templates/partials');

//setup handle bars engine and view location 
app.set("view engine", "hbs");
app.set("views",viewsPath)
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(pulbicDirectoryPath));

app.get("", (req, res) => {
  res.render("index",{
      title:"Weather App",
      name:"Rajesh"
  });
});

app.get('/about', (req, res) => {
    res.render("about",{
        title:"About App",
        name:"Suneel"
    });
})

app.get('/help', (req, res) => {
    res.render("help",{
        title:"Help App to Get Help",
        name:"Raviraj parab"
    })
})

app.get("/weather", (req, res) => {

    if(!req.query.address){
        return res.send({
            error: "Please use the search term Address"
        })
    }


    geocode(req.query.address,(error,{ latitude, longitude, location}={})=>{
        if(error){
            return res.send({error});
        }
    

    forecast(latitude,longitude,function(error,forecastData){
            if(error){
                return res.send({error});
            }

            res.send({ 
                forecast:forecastData,
                location,
                address:req.query.address
            });
    });
});


});

//error pages for all and help 

app.get("/help/*",(req, res)=>{
    res.render("error",{
        title:"404",
        name:"Anonymous",
        error:"help article not found-"
    });
}) 

app.get("*",(req, res)=>{
    res.render("error",{
        title:"404",
        name:"Unknown",
        error:"Page not found"
    })
})

app.listen(port, () => {
  console.log("server is up and running");
});


