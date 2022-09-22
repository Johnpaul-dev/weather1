const stated = document.getElementById("header");
const locationName = document.getElementById("location-name");
const currentDay = document.getElementById('date');
const weatherDescription = document.getElementById("description");
const airPressure = document.getElementById("air-pressure");
const windSpeed = document.getElementById("wind");
const weatherHumidity = document.getElementById("humidity");
const temperature = document.getElementById("temperature-degree");
const weatherIcon = document.getElementById("weather-icon");
let latitude = "";
let longitude = "";

const currentDate = () =>{
    const day = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    let date = new Date();
    currentDay.innerText = 'Today, ' + date.getDate() + ' ' + day[date.getDay()] ;
}

currentDate();

const weather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f24baf01aff33594366c6279cff93512`)
    .then(res => res.json())
    .then((data => {
        weatherDescription.textContent = data.weather[0].description
        airPressure.textContent = data.main.pressure + " hPa"
        windSpeed.textContent = data.wind.speed + " m/s"
        weatherHumidity.textContent = data.main.humidity + " %"
        temperature.textContent =  Math.round(data.main.temp -  273.15)
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        }
        ))
} 

const weatherLocation = () => {
    fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=f24baf01aff33594366c6279cff93512
    `)
    .then(res => res.json())
    .then(data => locationName.innerText = data[0].name)
}

const getLocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
//if successful get weather data
const onSuccess = (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.latitude;
    weather()
    weatherLocation()
}

const onError = () => {
    console.log("error");
}

//userlocation
getLocation();

