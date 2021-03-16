//MOVIES

const moviesApi = new Promise((resolve) => {
    const movies = fetch("https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json")
    resolve(movies);
});

moviesApi.then(data => data.json())
    .then(movies => {
        const badMovies = movies.filter(movie => movie.rating < 7);
        console.log(badMovies);
        return badMovies;
    }).then(movies => {
        const newBadMovies = movies.filter(movie => movie.year >= 2000);
        console.log(newBadMovies);
        return newBadMovies;
    })

//AFTER SET TIME
const setTimer = (resolveAfter) => new Promise(resolve => {
    setTimeout(resolve, resolveAfter * 1000);
})

setTimer(8).then(() => {
    console.log("I am called asynchronously.");
})

async function setTimer2(resolveAfter) {
    const timer = await setTimeout(() => {
        console.log("I am also called asynchronously.");
    }, resolveAfter * 1000);
    return timer;
}
setTimer2(10);

//REWRITE TIME

const setTimeoutPromise = (wait) => new Promise(resolve => {
    setTimeout(resolve, wait * 1000);
})

setTimeoutPromise(15).then(() => {
    console.log("Called after 15 seconds");
})

const getCurrentLocation = new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
        alert("Navigation not available in this browser");
    } else {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }
})

getCurrentLocation.then(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log("Your position is: " + latitude + " " + longitude);
}).catch(error => console.log(error.message));

//FETCHING AND WAITING

//Using promises

const promiseTimer = new Promise((resolve) => {
    setTimeout(() => {
        const pokemons = fetch('https://pokeapi.co/api/v2/generation/1/');
        resolve(pokemons);
    }, 3000);
});

promiseTimer.then(data => data.json())
    .then(data => {
        console.log(data);
    });

//Using asyng/await


async function getPokemons() {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    const fetchApi = await fetch('https://pokeapi.co/api/v2/generation/2/');
    const dataObj = await fetchApi.json();
    console.log(dataObj);
}
getPokemons();



