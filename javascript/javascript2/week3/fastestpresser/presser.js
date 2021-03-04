//Global variables
const button = document.getElementById("submit");
const result = document.getElementById("result");
const timer = document.getElementById("timer");
let countS = 0;
let countL = 0;
const sCount = document.querySelector(".s-count");
const lCount = document.querySelector(".l-count");


//button
button.addEventListener("click", () => {
    let timer = document.getElementById("time").value;
    /*Check valid input*/
    if (timer <= 0) {
        return alert("Insert a valid time")
    }
    /*Local variables*/

    let res = "";
    result.innerHTML = "";
    /*Functions*/
    document.addEventListener("keydown", keyUser)
    restartGame();
    countdown(timer);
    setTimeout(() => {
        if (countS > countL) {
            res = "S is the winner";
        } else if (countS < countL) {
            res = "L is the winner";
        } else if (countS === 0 && countL === 0) {
            res = "None key pressed :("
        } else {
            res = "Its a tie!";
        }
        result.innerHTML = res;
        document.removeEventListener("keydown", keyUser)
    }, timer * 1000);
});

//keypressed
let keyUser = (event) => {
    let keyChar = event.key
    if (keyChar === "s") {
        countS++;
        showActive(".s-container");
        sCount.innerHTML = countS;
    } else if (keyChar === "l") {
        countL++;
        showActive(".l-container");
        lCount.innerHTML = countL;
    } else {
        console.log("Another key was pressed");
    }
}

//Restart game
function restartGame() {
    countL = 0;
    countS = 0;
    sCount.innerHTML = countS;
    lCount.innerHTML = countL;
}

//Countdown
function countdown(time) {
    result.innerHTML = time;
    let myInterval = setInterval(countInterval, 1000);
    function countInterval() {
        time--;
        if (time <= 1) {
            clearInterval(myInterval)
        }
        result.innerHTML = time;
    }
}

//Active button
function showActive(activeClass) {
    const thisSpan = document.querySelector(activeClass);
    thisSpan.classList.add("active");
    setTimeout(() => {
        thisSpan.classList.remove("active");
    }, 100);
}



