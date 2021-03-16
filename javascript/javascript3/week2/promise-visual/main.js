//CIRCLES
const redCircle = document.querySelector(".marks li:nth-child(1)");
const blueCircle = document.querySelector(".marks li:nth-child(2)");
const greenCircle = document.querySelector(".marks li:nth-child(3)");
//TARGETS
const redTarget = document.querySelector(".targets li:nth-child(1)");
const blueTarget = document.querySelector(".targets li:nth-child(2)");
const greenTarget = document.querySelector(".targets li:nth-child(3)");
//MOVE
const redWalkY = redTarget.getBoundingClientRect().top - redCircle.getBoundingClientRect().top;
const redWalkX = redTarget.getBoundingClientRect().left - redCircle.getBoundingClientRect().left;
const blueWalkY = blueTarget.getBoundingClientRect().top - blueCircle.getBoundingClientRect().top;
const blueWalkX = blueTarget.getBoundingClientRect().left - blueCircle.getBoundingClientRect().left;
const greenWalkY = greenTarget.getBoundingClientRect().top - greenCircle.getBoundingClientRect().top;
const greenWalkX = greenTarget.getBoundingClientRect().left - greenCircle.getBoundingClientRect().left;

//One by one
async function translateOneByOne() {
    await moveElement(redCircle, { x: redWalkX, y: redWalkY }).then(() => {
        console.log("Red moved")
    });
    await moveElement(blueCircle, { x: blueWalkX, y: blueWalkY }).then(() => {
        console.log("Blue moved")
    });
    moveElement(greenCircle, { x: greenWalkX, y: greenWalkY }).then(() => {
        console.log("Green moved")
    })
}

//translateOneByOne();


//All at once

function translateAllAtOnce() {
    Promise.all(
        [moveElement(redCircle, { x: redWalkX, y: redWalkY }),
        moveElement(blueCircle, { x: blueWalkX, y: blueWalkY }),
        moveElement(greenCircle, { x: greenWalkX, y: greenWalkY })])
        .then(() => {
            console.log("All circles have moved!");
        })
}

translateAllAtOnce();