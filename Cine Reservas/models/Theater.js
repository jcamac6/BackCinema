const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    capacidad: { type: Number, required: true },
    ubicacion: { type: String, required: true }
});

const Theater = mongoose.model("Theater", theaterSchema);
module.exports = Theater;
