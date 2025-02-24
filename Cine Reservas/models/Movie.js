const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    genero: { type: String, required: true },
    duracion: { type: Number, required: true }, // Duración en minutos
    clasificacion: { type: String, required: true } // Ejemplo: PG-13, R
});

module.exports = mongoose.model("Movie", MovieSchema);