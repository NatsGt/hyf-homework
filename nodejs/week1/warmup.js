console.log("inside warmup file");

class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    getDiamater() {
        return this.radius * 2;
    }

    getCircumference() {
        return this.radius * 2 * Math.PI
    }

    getArea() {
        return Math.pow(this.radius, 2) * Math.PI
    }
}

const circle1 = new Circle(10);
const diamater1 = circle1.getDiamater();
console.log(diamater1)
const circumference1 = circle1.getCircumference();
console.log(circumference1);
const area1 = circle1.getArea();
console.log(area1);
