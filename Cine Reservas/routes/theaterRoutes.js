const express = require("express");
const Theater = require("../models/Theater");

const router = express.Router();

// 📌 Crear una nueva sala
router.post("/salas", async (req, res) => {
    try {
        const { nombre, capacidad, ubicacion } = req.body;

        if (!nombre || !capacidad || !ubicacion) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const nuevaSala = new Theater({ nombre, capacidad, ubicacion });
        const salaGuardada = await nuevaSala.save();

        res.status(201).json({ message: "Sala creada con éxito", sala: salaGuardada });
    } catch (error) {
        console.error("Error al crear sala:", error);
        res.status(500).json({ error: "Error al crear la sala" });
    }
});

// 📌 Obtener todas las salas
router.get("/salas", async (req, res) => {
    try {
        const salas = await Theater.find();
        res.json(salas);
    } catch (error) {
        console.error("Error al obtener salas:", error);
        res.status(500).json({ error: "Error al obtener salas" });
    }
});

// 📌 Obtener una sala por ID
router.get("/salas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const sala = await Theater.findById(id);

        if (!sala) {
            return res.status(404).json({ error: "Sala no encontrada" });
        }

        res.json(sala);
    } catch (error) {
        console.error("Error al obtener la sala:", error);
        res.status(500).json({ error: "Error al obtener la sala" });
    }
});

// 📌 Actualizar una sala
router.put("/salas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, capacidad, ubicacion } = req.body;

        const salaActualizada = await Theater.findByIdAndUpdate(
            id,
            { nombre, capacidad, ubicacion },
            { new: true }
        );

        if (!salaActualizada) {
            return res.status(404).json({ error: "Sala no encontrada" });
        }

        res.json({ message: "Sala actualizada con éxito", sala: salaActualizada });
    } catch (error) {
        console.error("Error al actualizar la sala:", error);
        res.status(500).json({ error: "Error al actualizar la sala" });
    }
});

// 📌 Eliminar una sala
router.delete("/salas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const salaEliminada = await Theater.findByIdAndDelete(id);

        if (!salaEliminada) {
            return res.status(404).json({ error: "Sala no encontrada" });
        }

        res.json({ message: "Sala eliminada con éxito", sala: salaEliminada });
    } catch (error) {
        console.error("Error al eliminar la sala:", error);
        res.status(500).json({ error: "Error al eliminar la sala" });
    }
});

module.exports = router;