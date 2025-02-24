const express = require("express");
const { createMovie, getMovies } = require("../controllers/movieController");
const router = express.Router();

router.get("/movies", (req, res) => {
    res.send("Lista de películas");
});

router.post("/movies", createMovie);
router.get("/movies", getMovies);

module.exports = router;
