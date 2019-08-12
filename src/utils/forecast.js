const request = require('request');

const forecast = (latitude,longitude,callback)=>{

    const url = 'https://api.darksky.net/forecast/f9b4ded20c0ff573ecd032f5c839b7cf/'+latitude +','+longitude;

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Weather Service is not available !',undefined);
        }else if(response.body.error){
            callback('Unable to find location',undefined);
        }else{
            callback(undefined,response.body.daily.data[0].summary +' It is currently '+response.body.currently.temperature+' Out and '
                     +response.body.currently.precipProbability +'% chance of rain .')
        }
    })

}

module.exports = forecast;

