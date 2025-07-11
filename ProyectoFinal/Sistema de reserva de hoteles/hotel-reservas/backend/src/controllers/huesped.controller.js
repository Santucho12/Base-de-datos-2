const Huesped = require('../models/huesped.model');
const huespedSchema = require('../schemas/huesped.schema');

// Obtener todos los huéspedes
const getHuespedes = async (req, res, next) => {
  try {
    const huespedes = await Huesped.find();
    res.json(huespedes);
  } catch (err) {
    next(err);
  }
};

// Obtener un huésped por ID
const getHuespedById = async (req, res, next) => {
  try {
    const huesped = await Huesped.findById(req.params.id);
    if (!huesped) return res.status(404).json({ message: 'Huésped no encontrado' });
    res.json(huesped);
  } catch (err) {
    next(err);
  }
};

// Crear un nuevo huésped
const createHuesped = async (req, res, next) => {
  const { error } = huespedSchema.validate(req.body);
  if (error) return res.status(400).json({ message: 'Datos inválidos', errors: error.details });
  try {
    const nuevoHuesped = new Huesped(req.body);
    await nuevoHuesped.save();
    res.status(201).json(nuevoHuesped);
  } catch (err) {
    next(err);
  }
};

// Actualizar un huésped
const updateHuesped = async (req, res, next) => {
  const { error } = huespedSchema.validate(req.body);
  if (error) return res.status(400).json({ message: 'Datos inválidos', errors: error.details });
  try {
    const huespedActualizado = await Huesped.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!huespedActualizado) return res.status(404).json({ message: 'Huésped no encontrado' });
    res.json(huespedActualizado);
  } catch (err) {
    next(err);
  }
};

// Eliminar un huésped
const deleteHuesped = async (req, res, next) => {
  try {
    const huespedEliminado = await Huesped.findByIdAndDelete(req.params.id);
    if (!huespedEliminado) return res.status(404).json({ message: 'Huésped no encontrado' });
    res.json({ message: 'Huésped eliminado correctamente' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getHuespedes,
  getHuespedById,
  createHuesped,
  updateHuesped,
  deleteHuesped
};
