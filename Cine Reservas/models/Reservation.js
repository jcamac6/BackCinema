const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    fecha: { type: Date, required: true },
    asientos: { type: Number, required: true }
});

const Reserva = mongoose.model('Reserva', reservaSchema);
module.exports = Reserva;