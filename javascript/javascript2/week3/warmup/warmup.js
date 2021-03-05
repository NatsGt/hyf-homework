//1

setTimeout(() => console.log("Called after 2.5 seconds"), 2500);

//2

function setDelay(delay, stringToLog) {
    setTimeout(() => {
        console.log(stringToLog);
    }, delay * 1000);
}

setDelay(5, "This string is logged after 5 seconds");
setDelay(8, "This string is logged after 8 seconds");
setDelay(3, "This string is logged after 3 seconds");

//3

let clickButton = document.querySelector(".exercise-3");
clickButton.addEventListener("click", function () {
    setDelay(5, "Button called after 5 seconds")
});

//4

let earthLogger = () => console.log("Earth");
let saturnLogger = () => console.log("Saturn");
let planetLogFunction = (yourFunction) => {
    if (typeof yourFunction === "function") {
        yourFunction();
    } else {
        console.log("Enter a valid function");
    }

}

planetLogFunction(earthLogger);
planetLogFunction(saturnLogger);
planetLogFunction("Hello");

//5

let latitude = "";
let longitude = "";

function findLocation() {
    const locationResult1 = document.querySelector(".location-result1");
    const locationResult2 = document.querySelector(".location-result2");
    function giveLocation(location) {
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;
        locationResult1.textContent = `This is the latitude: ${latitude}.`
        locationResult2.textContent = `This is the longitude: ${longitude}.`
    }
    function failure() {
        locationResult1.textContent = "Something went wrong :("
    }
    if (!navigator.geolocation) {
        locationResult1.textContent = "Your browser does not support Geolocation"
    } else {
        navigator.geolocation.getCurrentPosition(giveLocation, failure);
    }
}

document.querySelector(".location-button").addEventListener("click", findLocation);

//6

let map;

function initMap(lat = 14.615911250742752, long = -90.52346271264102) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lat, lng: long },
        zoom: 10,
    })
}

document.querySelector(".google-button").addEventListener("click", function () {
    if (latitude === "" || longitude === "") {
        alert("Press first Location.")
    }
    initMap(latitude, longitude);
});

//7
function runAfterDelay(delay, callback) {
    if (typeof callback === "function" && delay >= 0) {
        setTimeout(() => {
            callback();
        }, delay * 1000);
    } else {
        console.log("Enter valid values.");
    }
}

runAfterDelay(10, function () {
    console.log("This string took 10 seconds to print");
});

//8
document.addEventListener("dblclick", function () {
    console.log("double click!");
});

//9

function jokeCreator(shouldTellFunnyJoke = true, logFunnyJoke, logBadJoke) {
    if (typeof logFunnyJoke !== "function" && typeof logBadJoke !== "function") {
        return console.log("Insert a valid function");
    }
    if (shouldTellFunnyJoke) {
        return logFunnyJoke()
    } else {
        return logBadJoke()
    }
}

function logFunnyJoke() {
    const funnyJokes = [
        "In order to understand recursion you must first understand recursion.",
        "Why did the geek add body { padding-top: 1000px; } to his Facebook profile? He wanted to keep a low profile.",
        'A programmer is going out shopping and his wife says "While you are out, get eggs" He never returned !!',
        "When Chuck Norris throws exceptions, it’s across the room.",
        "Chuck Norris’s keyboard doesn’t have a Ctrl key because nothing controls Chuck Norris."
    ];
    let random = Math.floor(Math.random() * funnyJokes.length);
    return funnyJokes[random];
}

function logBadJoke() {
    const badJokes = [
        "Did you hear about the monkeys who shared an Amazon account? They were Prime mates.",
        "Autocorrect can go straight to he’ll.",
        "There's a band called 1023MB. They haven't had any gigs yet.",
        "My three favorite things are eating my family and not using commas.",
        "There are only 10 types of people in the world: those who understand binary, and those who don't."
    ];
    let random = Math.floor(Math.random() * badJokes.length);
    return badJokes[random];
}

let funny = jokeCreator(true, logFunnyJoke, logBadJoke);
console.log(funny);
let bad = jokeCreator(false, logFunnyJoke, logBadJoke);
console.log(bad);

//FUNCTION AS A VARIABLE

//1

const functions = [
    function firstFunction() {
        console.log("This is the first item of the array.");
    },
    function secondFunction() {
        console.log("This is the second item of the array.");
    },
    function thirdFunction() {
        console.log("This is the third item of the array.");
    }]

functions.forEach(item => item());

//2

const functionAsVariable = () => console.log("This function was declared as a variable");

function functionAsFunction() {
    console.log("This function was declared as a function");
}

functionAsVariable();
functionAsFunction();

//3

const objectWithFunction = {
    function: function functionInObject() {
        console.log("This function is inside an object.");
    }
}

objectWithFunction.function();



