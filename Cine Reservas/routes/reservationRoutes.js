const express = require("express");
const { createReservation, getReservations } = require("../controllers/reservationController");
const router = express.Router();


router.get("/movies", (req, res) => {
    res.send("Lista de películas");
});

router.post("/reservations", createReservation);
router.get("/reservations", getReservations);

module.exports = router;
