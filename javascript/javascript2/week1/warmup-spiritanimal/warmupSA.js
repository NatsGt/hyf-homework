//WARMUP

//FIND THE SHORTEST WORD

const danishWords = ["bil", "plante", "kaffe", "bog", "ø", "planetarium"];

function countLetters(words) {
    let shortest = words[0];
    for (let i = 1; i < words.length; i++) {
        if (words[i].length < shortest.length) {
            shortest = words[i];
        }
    }
    return shortest;
}

console.log(countLetters(danishWords));

//FIND AND COUNT DANISH LETTERS

let danishLetters = ["å", "æ", "ø", "Å", "Æ", "Ø"];

function countDanishLetters(sentence) {
    let letters = sentence.split("");
    let sum = 0;
    let dkResult = {
    };

    for (let i = 0; i < letters.length; i++) {
        //check match
        if (danishLetters.includes(letters[i])) {
            sum++;
            dkResult.total = sum;
            //check if its repeated 
            if (dkResult[letters[i]]) {
                dkResult[letters[i]] += 1;
            } else {
                dkResult[letters[i]] = 1;
            }
        }
    }
    console.log(dkResult);
    return dkResult;
}

const danishString = "Jeg har en blå bil";
countDanishLetters(danishString); // returns {total: 1, å: 1}

const danishString2 = "Blå grød med røde bær";
countDanishLetters(danishString2); // returns {total: 4, æ: 1, ø: 2, å: 1}

//SPIRIT ANIMAL
const spiritAnimals = ["lazy sloth", "princess kitty", "wise owl", "loyal dog", "flying penguin", "annoying frog", "foxy fox", "hopping rabbit", "happy hippo", "exploding unicorn"];
let count = 0;
let myName;
const names = { CLICK: "press button", HOVERBUT: "hover button", HOVERINPUT: "hover input", WRITE: "write input" };

//Functions to event listeners
function myFunction(option) {
    if (option != selectRadio()) {
        return
    }
    if (count > 0) {
        alert('For a new spirit animal press "Try Again!"');
    } else {
        myName = document.getElementById("name").value;
        if (myName) {
            let randomValue = Math.floor(Math.random() * spiritAnimals.length);
            let randomAnimal = spiritAnimals[randomValue]
            let myText = myName + " - " + randomAnimal;
            document.getElementById("displayAnimal").innerHTML = myText;
            count++;
        } else {
            alert("Insert a name");
        }
    }
}

function tryAgain(option) {
    if (option != selectRadio()) {
        return
    }
    count = 0;
    if (myName) {
        myFunction(option);
    } else {
        alert('Insert a name and press "Submit"');
    }

}

function activateInput(option) {
    if (option != selectRadio()) {
        return
    }
    if (count === 0) {
        myFunction(option);
    } else {
        tryAgain(option);
    }
}


//radio selector

function selectRadio() {
    var option = document.querySelector('input[name="option"]:checked').value;
    return option;

}

//click button
document.querySelector("#submit").addEventListener("click", function () {
    myFunction(names.CLICK);
});
document.querySelector(".tryAgain").addEventListener("click", function () {
    tryAgain(names.CLICK);
});

//hover button
document.querySelector("#submit").addEventListener("mouseenter", function () {
    myFunction(names.HOVERBUT);
});
document.querySelector(".tryAgain").addEventListener("mouseenter", function () {
    tryAgain(names.HOVERBUT);
});

//hover input
document.querySelector("#name").addEventListener("mouseenter", function () {
    activateInput(names.HOVERINPUT);
});

//write input
document.querySelector("#name").addEventListener("keyup", function () {
    activateInput(names.WRITE);
});






