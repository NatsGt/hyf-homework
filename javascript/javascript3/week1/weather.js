//COOL API

/*As a Pokemon master, I chose the a API that has information
about Pokemons. When I call this specific API, I get an
object with string containing the options of 
endpoints depending on what information you want 
(generation, berries, moves, etc.). For example, if I choose 
the "generation" endpoint, I will get an object with 
information like the total generations of Pokemon (so far), 
an array with objects of the name and endpoint of each
specific generation.*/
fetch('https://pokeapi.co/api/v2/')
    .then(response => response.json())
    .then(pokemonData => {
        console.log(pokemonData);
        let generationURL = pokemonData.generation
        fetch(generationURL)
            .then(response => response.json())
            .then(pokemonData => {
                console.log(pokemonData);
            });

    });

//WEATHER API

//Global variables
let inputLocation = document.getElementById("location");
let cityButton = document.getElementById("submit-city");
let locationButton = document.getElementById("user-location");
let clearButton = document.getElementById("clear-history")
let map;
const weatherContainer = document.querySelector(".container");
const weatherInfo = document.querySelector(".weather");
const locationCoord = {};
const key = "eddd7f800fda12675b1f4959191b6548";

//local storage
let citySaved = localStorage.getItem("name");

//Created elements
const myLocation = document.createElement("h2");
const myTemperature = document.createElement("p");
const myIcon = document.createElement("img");
const myWind = document.createElement("p");
const myCloud = document.createElement("p");
const mySunrise = document.createElement("p");
const mySunset = document.createElement("p");

//Classes
myLocation.className = "title";
myTemperature.className = "temperature";
myIcon.className = "icon";
myWind.className = "wind";
myCloud.className = "cloud";
mySunrise.className = "sunrise";
mySunset.className = "sunset";

//FUNCTIONS
function initMap(la = 14.615911250742752, lo = -90.52346271264102) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: la, lng: lo },
        zoom: 12,
    });
}

function assignInfo(element, data) {
    element.innerHTML = data;
    weatherInfo.appendChild(element);
}

function unixConvert(unixTime, timezone) {
    const time = unixTime + timezone;
    const formatTime = new Date(time * 1000).toLocaleTimeString("en-US", { timeZone: 'UTC' });
    return formatTime;
}

function showWeather(dataFromApi) {
    //City
    assignInfo(myLocation, dataFromApi.name);
    //Temperature
    assignInfo(myTemperature, dataFromApi.main.temp + "°");
    //Icon
    const iconAddress = `http://openweathermap.org/img/wn/${dataFromApi.weather[0].icon}@2x.png`
    myIcon.src = iconAddress;
    weatherInfo.appendChild(myIcon);
    //Wind speed
    assignInfo(myWind, "Wind speed: <br />" + dataFromApi.wind.speed + " m/s");
    //Clouds
    assignInfo(myCloud, "Cloudiness: <br />" + dataFromApi.clouds.all + " %");
    //Sunrise and sunset
    const sunrise = unixConvert(dataFromApi.sys.sunrise, dataFromApi.timezone);
    const sunset = unixConvert(dataFromApi.sys.sunset, dataFromApi.timezone)
    assignInfo(mySunrise, `Sunrise: <br /> ${sunrise}`);
    assignInfo(mySunset, `Sunset: <br /> ${sunset}`);
    //Map
    initMap(dataFromApi.coord.lat, dataFromApi.coord.lon);
}

function error() {
    console.log("Unable to get your location");
}
function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    locationCoord.lat = latitude;
    locationCoord.long = longitude;
    const weatherAddress = `https://api.openweathermap.org/data/2.5/weather?lat=${locationCoord.lat}&lon=${locationCoord.long}&units=metric&appid=${key}`;
    fetch(weatherAddress)
        .then(response => response.json())
        .then(weatherData => {
            localStorage.setItem('name', weatherData.name)
            showWeather(weatherData);
            weatherContainer.classList.remove("hide");
        });
}

function getLocationWeather() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}


//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", () => {
    if (citySaved !== null) {
        const weatherAddress = `https://api.openweathermap.org/data/2.5/weather?q=${citySaved}&units=metric&appid=${key}`;
        fetch(weatherAddress)
            .then(response => response.json())
            .then(weatherData => {
                showWeather(weatherData);
                weatherContainer.classList.remove("hide");
            });
    }
})


cityButton.addEventListener("click", () => {
    const userLocation = inputLocation.value.toLowerCase()
    if (!userLocation) {
        alert("Write a valid location");
        return
    }
    const weatherAddress = `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&units=metric&appid=${key}`;
    fetch(weatherAddress)
        .then(response => response.json())
        .then(weatherData => {
            console.log(weatherData);
            //Check if city exist
            if (weatherData.cod === "404") {
                alert(weatherData.message);
                return;
            }
            localStorage.setItem('name', weatherData.name)
            showWeather(weatherData);
            weatherContainer.classList.remove("hide");
        });
});

locationButton.addEventListener("click", () => {
    getLocationWeather();
})

clearButton.addEventListener("click", () => {
    localStorage.clear();
    console.log(citySaved);
    weatherContainer.classList.add("hide");
})








