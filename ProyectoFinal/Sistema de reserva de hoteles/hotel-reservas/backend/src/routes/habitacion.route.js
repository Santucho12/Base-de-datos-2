const express = require('express');
const router = express.Router();
const habitacionController = require('../controllers/habitacion.controller');

// Obtener todas las habitaciones
router.get('/', habitacionController.getHabitaciones);

// Obtener una habitación por ID
router.get('/:id', habitacionController.getHabitacionById);

// Crear una nueva habitación
router.post('/', habitacionController.createHabitacion);

// Actualizar una habitación
router.put('/:id', habitacionController.updateHabitacion);

// Eliminar una habitación
router.delete('/:id', habitacionController.deleteHabitacion);

module.exports = router;
