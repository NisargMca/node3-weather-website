const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geoCode = require('./utils/geoCode');

const app = express();

//Defines path for Express Config
const publicDir = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

//Set Up Handlebars engine and views locaion
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

//Set up static directory to serve
app.use(express.static(publicDir));

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name : 'Nisarg Mehta'
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Me',
        name:'Nisarg Mehta'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help',
        helpMessage:'This is the Wheather Help Page',
        name:'Nisarg Mehta'
    })
})

app.get('/weather',(req,res)=>{    
    if(!req.query.address){
        return res.send({
            error:'Address must be provided'
        })
    }    
    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
            return res.send({error});

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({        
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })      

    })
    
})
app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must Provide a Search Term'
        })
        
    }
    console.log(req.query.search);
    res.send({
        products:{}
     });
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        data:'Artical Not Found'
    })
    
})
app.get('*',(req,res)=>{
    res.render('404',{
        data:'Page Not Found'
    })
    
})
app.listen(3000,()=>{
    console.log('App has started on port 3000');
})