const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("nodejs week2 homework"));

app.get("/numbers/add", (req, res) => {
    const firstNumber = parseFloat(req.query.first);
    const secondNumber = parseFloat(req.query.second);
    const sum = firstNumber + secondNumber;
    res.send(sum.toString());
})

app.get("/numbers/multiply/:first/:second", (req, res) => {
    2
    const firstNumber = parseFloat(req.params.first);
    const secondNumber = parseFloat(req.params.second);
    const product = firstNumber * secondNumber;
    res.send(product.toString());
})

app.listen(3000, () => console.log(`Calculator:listening on port 3000`));


