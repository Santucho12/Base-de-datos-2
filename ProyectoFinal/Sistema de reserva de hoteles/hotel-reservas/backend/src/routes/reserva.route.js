const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reserva.controller');

// Obtener todas las reservas
router.get('/', reservaController.getReservas);

// Obtener una reserva por ID
router.get('/:id', reservaController.getReservaById);

// Crear una nueva reserva
router.post('/', reservaController.createReserva);

// Actualizar una reserva
router.put('/:id', reservaController.updateReserva);

// Eliminar una reserva
router.delete('/:id', reservaController.deleteReserva);

module.exports = router;
