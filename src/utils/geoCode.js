

const request = require('request');

const geoCode = (address,callback)=>{
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibmlzYXJnODMiLCJhIjoiY2p4Zjh4b3VpMGh0YjN1cGczajd0NnA3YyJ9.rNzMGewxYMcdZxWWxnlJPA';
    
    request({url:geoCodeUrl,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location',undefined);
        }else if(response.body.features.length === 0){
            callback('Unableto find location',undefined);
        }else{
            callback(undefined,{
                latitude : response.body.features[0].center[0],
                longitude : response.body.features[0].center[1],
                location : response.body.features[0].place_name
            })
        }
           
    })
}

module.exports= geoCode ;