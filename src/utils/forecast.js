const request = require('request') 

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
