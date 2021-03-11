//Global variable
let submitButton = document.getElementById("submit");
let userSearch = document.getElementById("giph-search");
let giphLimit = document.getElementById("giph-limit");
let giphContainer = document.querySelector(".giphs-container");
let apiKey = "LdnkOiyC9ZNEs31lQgQyfUWR34FAhid6";


//functions
function showGiph(source,) {
    let giphImg = document.createElement("img");
    giphImg.src = source;
    giphContainer.appendChild(giphImg);
}

function displayNChild(element, limit, total) {
    for (let i = 0; i < total; i++) {
        if (i < limit) {
            element.item(i).style.display = "block"
        } else {
            element.item(i).style.display = "none"
        }
    }
}

submitButton.addEventListener("click", () => {
    let querySearch = userSearch.value;
    let divImgs = giphContainer.childElementCount;
    //check if there are items from previous search
    if (divImgs > 0) {
        while (giphContainer.firstChild) {
            giphContainer.removeChild(giphContainer.lastChild);
        }
    }
    //check for text in input
    if (!querySearch) {
        return alert("Write in search!");
    }
    //Gif API
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${querySearch}&limit=&offset=0&rating=g&lang=en`)
        .then(response => response.json())
        .then(giphData => {
            let giphsNum = giphData.data.length;
            console.log(giphsNum);
            giphData.data.forEach(giph => {
                let thisSource = giph.images.original.url;
                showGiph(thisSource)
            });
        });
})

giphLimit.addEventListener("keyup", () => {
    let divImgs = giphContainer.childElementCount;
    let querySearch = userSearch.value;
    let limitNum = giphLimit.value;
    let giph = giphContainer.children;
    //check for text in input
    if (!querySearch) {
        return alert("Write in search!");
        //check for empty input    
    } else if (!limitNum) {
        limitNum = divImgs;
        displayNChild(giph, limitNum, divImgs);
    } else {
        displayNChild(giph, limitNum, divImgs);
    }
})



