const Reserva = require('../models/reserva.model');
const reservaSchema = require('../schemas/reserva.schema');

// Obtener todas las reservas
const getReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find().populate('habitacion').populate('huesped');
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener reservas', error: err.message });
  }
};

// Obtener una reserva por ID
const getReservaById = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id).populate('habitacion').populate('huesped');
    if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json(reserva);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener la reserva', error: err.message });
  }
};

// Crear una nueva reserva
const createReserva = async (req, res) => {
  const { error } = reservaSchema.validate(req.body);
  if (error) return res.status(400).json({ message: 'Datos inválidos', errors: error.details });
  try {
    const nuevaReserva = new Reserva(req.body);
    await nuevaReserva.save();
    res.status(201).json(nuevaReserva);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la reserva', error: err.message });
  }
};

// Actualizar una reserva
const updateReserva = async (req, res) => {
  const { error } = reservaSchema.validate(req.body);
  if (error) return res.status(400).json({ message: 'Datos inválidos', errors: error.details });
  try {
    const reservaActualizada = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reservaActualizada) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json(reservaActualizada);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar la reserva', error: err.message });
  }
};

// Eliminar una reserva
const deleteReserva = async (req, res) => {
  try {
    const reservaEliminada = await Reserva.findByIdAndDelete(req.params.id);
    if (!reservaEliminada) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json({ message: 'Reserva eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar la reserva', error: err.message });
  }
};

module.exports = {
  getReservas,
  getReservaById,
  createReserva,
  updateReserva,
  deleteReserva
};
