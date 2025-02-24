require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Reserva = require('./models/Reservation');
const movieRoutes = require("./routes/movieRoutes");
const theaterRoutes = require("./routes/theaterRoutes"); // 📌 Importamos las rutas de salas



const app = express();
const PORT = 5001;


// src/app.js

const roomRoutes = require('./routes/roomRoutes'); // Importa las rutas para las salas

// Usa las rutas de las salas
app.use('/api/rooms', roomRoutes);


const cors = require("cors");
app.use(cors());


app.use(express.json());

mongoose.connect('mongodb://localhost:27017/cine-reservas', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error al conectar a MongoDB", err));

app.post('/reservas', async (req, res) => {
    try {
        const { nombre, fecha, asientos } = req.body;
        if (!nombre || !fecha || !asientos) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const nuevaReserva = new Reserva({ nombre, fecha, asientos });
        const reservaGuardada = await nuevaReserva.save();

        res.status(201).json({ message: "Reserva creada con éxito", reservation: reservaGuardada });
    } catch (error) {
        console.error("Error en el POST /reservas:", error);
        res.status(500).json({ error: "Error al crear reserva" });
    }
});

app.get('/reservas', async (req, res) => {
    try {
        const reservas = await Reserva.find();
        res.json(reservas);
    } catch (error) {
        console.error("Error en el GET /reservas:", error);
        res.status(500).json({ error: "Error al obtener reservas" });
    }
});

app.delete('/reservas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const reservaEliminada = await Reserva.findByIdAndDelete(id);

        if (!reservaEliminada) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }

        res.json({ message: "Reserva eliminada con éxito", reservaEliminada });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar reserva" });
    }
});

// 📌 Agregamos las rutas de películas y salas
app.use("/api", movieRoutes);
app.use("/api", theaterRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});