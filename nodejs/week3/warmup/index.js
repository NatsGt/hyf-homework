const express = require("express");
const app = express();

app.use(express.urlencoded({
    extended: true
}))

app.get("/", (req, res) => res.send("nodejs week3 homework"));

app.get("/calculator/:operator", (req, res) => {
    const calculatorOperator = req.params.operator;
    if (Object.keys(req.query).length > 0) {
        const digits = Object.values(req.query).flat().map(number => Number(number));
        const isDigitsNumbers = digits.every(number => !Number.isNaN(number))
        if (isDigitsNumbers) {
            let total = 0;
            if (calculatorOperator === "add") {
                total = digits.reduce((acc, value) => acc + value)
            } else if (calculatorOperator === "subtract") {
                total = digits.reduce((acc, value) => acc - value);
            } else if (calculatorOperator === "multiply") {
                total = digits.reduce((acc, value) => acc * value)
            } else if (calculatorOperator === "divide") {
                total = digits.reduce((acc, value) => acc / value);
            }
            res.send(total.toString())
            return;
        } else {
            res.status(400).send({ error: 'All values must be numbers' })
        }
    } else {
        res.send("0");
    }
});

app.post("/calculator/:operator", (req, res) => {
    const calculatorOperator = req.params.operator;
    if (Object.keys(req.body).length > 0) {
        const digits = Object.values(req.body).flat().map(number => Number(number));
        const isDigitsNumbers = digits.every(number => !Number.isNaN(number));
        if (isDigitsNumbers) {
            let total = 0;
            if (calculatorOperator === "add") {
                total = digits.reduce((acc, value) => acc + value)
            } else if (calculatorOperator === "subtract") {
                total = digits.reduce((acc, value) => acc - value);
            } else if (calculatorOperator === "multiply") {
                total = digits.reduce((acc, value) => acc * value)
            } else if (calculatorOperator === "divide") {
                total = digits.reduce((acc, value) => acc / value);
            }
            res.send(total.toString())
            return;
        } else {
            res.status(400).send({ error: 'All values must be numbers' })
        }
    } else {
        res.send("0");
    }
})

app.listen(3000, () => console.log(`Calculator:listening on port 3000`));
