const express = require("express");
const router = express.Router();

const reviews = require("../data/reviews.json");

router.get("/", (req, res) => {
    res.send(reviews);
});

router.get("/:id", (req, res) => {
    const reviewsID = parseInt(req.params.id);
    if (isNaN(reviewsID)) {
        res.status(400).send({ error: "Id must be a number" });
        return
    }
    const reviewsByID = reviews.find(review => review.id === reviewsID);
    if (reviewsByID) {
        res.send(reviewsByID);
    } else {
        res.send({ error: "Id not found" })
    }


})

module.exports = router;