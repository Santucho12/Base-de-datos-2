const Habitacion = require('../models/habitacion.model');
const habitacionSchema = require('../schemas/habitacion.schema');

// Obtener todas las habitaciones
const getHabitaciones = async (req, res) => {
    try {
        const habitaciones = await Habitacion.find();
        res.json(habitaciones);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener habitaciones', error: err.message });
    }
};

// Obtener una habitación por ID
const getHabitacionById = async (req, res) => {
    try {
        const habitacion = await Habitacion.findById(req.params.id);
        if (!habitacion) return res.status(404).json({ message: 'Habitación no encontrada' });
        res.json(habitacion);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener la habitación', error: err.message });
    }
};

// Crear una nueva habitación
const createHabitacion = async (req, res) => {
    const { error } = habitacionSchema.validate(req.body);
    if (error) return res.status(400).json({ message: 'Datos inválidos', errors: error.details });
    try {
        const nuevaHabitacion = new Habitacion(req.body);
        await nuevaHabitacion.save();
        res.status(201).json(nuevaHabitacion);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear la habitación', error: err.message });
    }
};

// Actualizar una habitación
const updateHabitacion = async (req, res) => {
    const { error } = habitacionSchema.validate(req.body);
    if (error) return res.status(400).json({ message: 'Datos inválidos', errors: error.details });
    try {
        const habitacionActualizada = await Habitacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!habitacionActualizada) return res.status(404).json({ message: 'Habitación no encontrada' });
        res.json(habitacionActualizada);
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar la habitación', error: err.message });
    }
};

// Eliminar una habitación
const deleteHabitacion = async (req, res) => {
    try {
        const habitacionEliminada = await Habitacion.findByIdAndDelete(req.params.id);
        if (!habitacionEliminada) return res.status(404).json({ message: 'Habitación no encontrada' });
        res.json({ message: 'Habitación eliminada correctamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar la habitación', error: err.message });
    }
};

module.exports = {
    getHabitaciones,
    getHabitacionById,
    createHabitacion,
    updateHabitacion,
    deleteHabitacion
};
