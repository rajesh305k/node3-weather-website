const request = require('postman-request'); 
const chalk = require('chalk');
const geocode = (address,callback) =>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmswMDk3MDIiLCJhIjoiY2t3b3NoMnptMDV3cTJxcW9kZDk0bjY1NCJ9.zi0nc8qBr5uVaVZHiYEQdQ&limit=1';
//encodeURIComponent converts some special characters to format or coding so that url doesn't crashed
    request({ url,json:true},(error,{body})=>{
        if(error){
            callback(chalk.blue.inverse('Unable to connect to location services!'),undefined);
        }else if(body.features.length === 0){
            callback('Unable to find the location.Try another search ',undefined);
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            });

        }
    })


}
module.exports = geocode;