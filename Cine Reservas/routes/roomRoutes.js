const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController"); // Verifica que esta línea está bien

router.post("/", roomController.createRoom); // Crea una sala
router.get("/", roomController.getRooms); // Obtiene todas las salas

module.exports = router;