//canvas
const canvas = document.querySelector(".my-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

//1. Paint a circle
ctx.fillStyle = 'rgb(0, 0, 255)';
ctx.beginPath();
ctx.arc(150, 106, 50, 0, 360, false); //x,y,radius,start angle, end angle, false = clockwise true = anticlockwise
ctx.fill();

//2. Class creation time
class Circle {
    constructor(x, y, r, startAngle, endAngle, fillColor) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.fillColor = fillColor;
    }

    draw() {
        ctx.fillStyle = this.fillColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, this.startAngle, this.endAngle, false); //x,y,radius,start angle, end angle, false = clockwise true = anticlockwise
        ctx.fill();
    }
}

const c1 = new Circle(50, 50, 20, 0, 2 * Math.PI, "#000000");
//c1.draw();

const c2 = new Circle(200, 250, 50, 0, 2 * Math.PI, "#012345");
//c2.draw();

const c3 = new Circle(300, 50, 20, 0, 1 * Math.PI, "#012345");
//c3.draw();

const c4 = new Circle(50, 200, 20, 1 * Math.PI, 2 * Math.PI, "#f2aa");
//c4.draw();

//3. Lets make art

const circValues = {};

function getColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomValues() {
    circValues.x = Math.floor(Math.random() * window.innerWidth);
    circValues.y = Math.floor(Math.random() * window.innerHeight);
    circValues.r = Math.floor(Math.random() * (window.innerWidth / 10));
    circValues.color = getColor();
    return circValues;
}

function doCircleArt() {
    setInterval(() => {
        getRandomValues();
        const randomCircle = new Circle(circValues.x, circValues.y, circValues.r, 0, 2 * Math.PI, circValues.color);
        randomCircle.draw();
    }, 100);
}

//doCircleArt();

//4. Follow the mouse

document.addEventListener('mousemove', (event) => {
    const xMouse = event.clientX;
    const yMouse = event.clientY;
    const color = getColor();
    const mouseCircle = new Circle(xMouse, yMouse, 50, 0, 2 * Math.PI, color)
    mouseCircle.draw();
})




