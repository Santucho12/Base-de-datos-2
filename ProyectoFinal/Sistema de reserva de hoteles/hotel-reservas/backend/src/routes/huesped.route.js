const express = require('express');
const router = express.Router();
const huespedController = require('../controllers/huesped.controller');

// Obtener todos los huéspedes
router.get('/', huespedController.getHuespedes);

// Obtener un huésped por ID
router.get('/:id', huespedController.getHuespedById);

// Crear un nuevo huésped
router.post('/', huespedController.createHuesped);

// Actualizar un huésped
router.put('/:id', huespedController.updateHuesped);

// Eliminar un huésped
router.delete('/:id', huespedController.deleteHuesped);

module.exports = router;
