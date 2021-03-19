//Global variable
const submitButton = document.getElementById("submit");
const userSearch = document.getElementById("giph-search");
const giphLimit = document.getElementById("giph-limit");
const giphContainer = document.querySelector(".giphs-container");
const apiInputs = {
    apiKey: "LdnkOiyC9ZNEs31lQgQyfUWR34FAhid6",
    apiLimit: "",
}

//functions
function showGiph(source,) {
    const giphImg = document.createElement("img");
    giphImg.src = source;
    giphContainer.appendChild(giphImg);
}

/* function displayNChild(element, limit, total) {
    for (let i = 0; i < total; i++) {
        if (i < limit) {
            element.item(i).style.display = "block"
        } else {
            element.item(i).style.display = "none"
        }
    }
} */

function fetchApi(search, limit) {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiInputs.apiKey}&q=${search}&limit=${limit}&offset=0&rating=g&lang=en`)
        .then(response => response.json())
        .then(giphData => {
            giphData.data.forEach(giph => {
                let thisSource = giph.images.original.url;
                showGiph(thisSource)
            });
        });
}

function checkInputs() {
    apiInputs.querySearch = userSearch.value;
    //check for text in input
    if (!userSearch.value) {
        return alert("Write in search!");
    }
    //check for numbers in the limit input
    if (giphLimit.value) {
        apiInputs.apiLimit = giphLimit.value;
    } else {
        apiInputs.apiLimit = "";
    }
    return apiInputs;
}

function erasePreviousSearch() {
    const divImgs = giphContainer.childElementCount;
    //check if there are items from previous search
    if (divImgs > 0) {
        while (giphContainer.firstChild) {
            giphContainer.removeChild(giphContainer.lastChild);
        }
    }
}

submitButton.addEventListener("click", () => {
    erasePreviousSearch()
    checkInputs()
    //Gif API
    fetchApi(apiInputs.querySearch, apiInputs.apiLimit);
})

giphLimit.addEventListener("keyup", () => {
    erasePreviousSearch()
    checkInputs()
    //Gif API
    fetchApi(apiInputs.querySearch, apiInputs.apiLimit);
})

userSearch.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        erasePreviousSearch()
        checkInputs()
        //Gif API
        fetchApi(apiInputs.querySearch, apiInputs.apiLimit);
    }
})




