const Movie = require("../models/Movie");

// Crear una nueva película
exports.createMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las películas
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una película por ID
exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: "Película no encontrada" });
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una película
exports.updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!movie) return res.status(404).json({ message: "Película no encontrada" });
        res.json(movie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una película
exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) return res.status(404).json({ message: "Película no encontrada" });
        res.json({ message: "Película eliminada" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
