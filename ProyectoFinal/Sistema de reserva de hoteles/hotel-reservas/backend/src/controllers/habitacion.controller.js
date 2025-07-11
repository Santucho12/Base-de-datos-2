const Habitacion = require('../models/habitacion.model');
const habitacionSchema = require('../schemas/habitacion.schema');

// Obtener todas las habitaciones
const getHabitaciones = async (req, res, next) => {
    try {
        const habitaciones = await Habitacion.find();
        res.json(habitaciones);
    } catch (err) {
        next(err);
    }
};

// Obtener una habitación por ID
const getHabitacionById = async (req, res, next) => {
    try {
        const habitacion = await Habitacion.findById(req.params.id);
        if (!habitacion) return res.status(404).json({ message: 'Habitación no encontrada' });
        res.json(habitacion);
    } catch (err) {
        next(err);
    }
};

// Crear una nueva habitación
const createHabitacion = async (req, res, next) => {
    console.log('Datos recibidos en createHabitacion:', req.body);
    const { error } = habitacionSchema.validate(req.body);
    if (error) {
        console.log('Error de validación Joi:', error.details);
        return res.status(400).json({ message: 'Datos inválidos', errors: error.details });
    }
    try {
        const nuevaHabitacion = new Habitacion(req.body);
        await nuevaHabitacion.save();
        res.status(201).json(nuevaHabitacion);
    } catch (err) {
        console.log('Error al guardar habitación:', err);
        next(err);
    }
};

// Actualizar una habitación
const updateHabitacion = async (req, res, next) => {
    const { error } = habitacionSchema.validate(req.body);
    if (error) return res.status(400).json({ message: 'Datos inválidos', errors: error.details });
    try {
        const habitacionActualizada = await Habitacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!habitacionActualizada) return res.status(404).json({ message: 'Habitación no encontrada' });
        res.json(habitacionActualizada);
    } catch (err) {
        next(err);
    }
};

// Eliminar una habitación
const deleteHabitacion = async (req, res, next) => {
    try {
        const habitacionEliminada = await Habitacion.findByIdAndDelete(req.params.id);
        if (!habitacionEliminada) return res.status(404).json({ message: 'Habitación no encontrada' });
        res.json({ message: 'Habitación eliminada correctamente' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getHabitaciones,
    getHabitacionById,
    createHabitacion,
    updateHabitacion,
    deleteHabitacion
};
