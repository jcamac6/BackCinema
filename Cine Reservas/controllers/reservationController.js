const Reserva = require("../models/Reservation");

const crearReserva = async (req, res) => {
    try {
        const { nombre, fecha, asientos } = req.body;

        // Verificar si ya existe una reserva con el mismo nombre y fecha
        const reservaExistente = await Reserva.findOne({ nombre, fecha });

        if (reservaExistente) {
            return res.status(400).json({ error: "Ya existe una reserva para esta película en esa fecha" });
        }

        // Crear una nueva reserva si no existe
        const nuevaReserva = new Reserva({ nombre, fecha, asientos });
        await nuevaReserva.save();

        res.status(201).json({ message: "Reserva creada con éxito", reservation: nuevaReserva });
    } catch (error) {
        res.status(500).json({ error: "Error al crear reserva" });
    }
};
