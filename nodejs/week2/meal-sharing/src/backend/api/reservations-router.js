const express = require("express");
const router = express.Router();

const reservations = require("../data/reservations.json");

router.get("/", (req, res) => {
    res.send(reservations);
});

router.get("/:id", (req, res) => {
    const reservationID = parseInt(req.params.id);
    if (isNaN(reservationID)) {
        res.status(400).send({ error: "Id must be a number" });
        return
    }
    const reservationByID = reservations.find(reservation => reservation.id === reservationID);
    if (reservationByID) {
        res.send(reservationByID)
    } else {
        res.send({ error: "Id not found" })
    }


})

module.exports = router;