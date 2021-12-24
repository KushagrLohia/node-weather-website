const path = require('path')
const express = require('express')
const hbs= require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// console.log(__dirname)
// console.log(__filename)
//Defining path for Express config
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath =path.join(__dirname,'../templates/partials')

//Setup handlerbar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))


app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"John Doe"
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"John Deo"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name:"John Deo",
        helpText:"This is some helpful text."
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address!"
        })
    }

    geocode(req.query.address,(error,{latitude, longitude, location} = {} )=>{
        if(error){
            return res.send({
                error:error
            })
        }
    
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast:forecastdata,
                location:location,
                address:req.query.address
            })
          })
    })
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }

    console.log(req.query)

    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"John Deo",
        errormsg:"Help article not found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:"John Deo",
        errormsg:"Page not found"
    })
})

// to start the server we use listen method on our app
app.listen(3000,()=>{
    console.log("Server is up at port 3000")
})