const mongoose = require('mongoose');

const habitacionModel = new mongoose.Schema({
  numero: {
    type: Number,
    required: true,
    unique: true
  },
  tipo: {
    type: String,
    required: true,
    enum: ['simple', 'doble', 'suite', 'familiar']
  },
  precio: {
    type: Number,
    required: true
  },
  capacidad: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String
  },
  estado: {
    type: String,
    enum: ['disponible', 'ocupada', 'mantenimiento'],
    default: 'disponible'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Habitacion',habitacionModel);
