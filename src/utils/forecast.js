const request = require('request') 

// const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/37.8267,-122.4233'
// const apikey='f93007b2836020e331948973747829b5'
// const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=10.8505&lon=76.2711&units=metric&exclude={part}&appid=f93007b2836020e331948973747829b5'


const forecast = (latitude,longitude,callback)=>{
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude={part}&appid=f93007b2836020e331948973747829b5`

    request({url, json:true},(error, {body} )=>{
        if(error){
            callback("Unable to connect to weather service!",undefined)
        }
        else if(body.cod){
            callback("Unable to find location",undefined)
        }
        else{
            callback(undefined,`It is currently ${body.current.feels_like} degrees out`)
        }
    })
}
module.exports = forecast