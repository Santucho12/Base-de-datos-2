const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  habitacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habitacion',
    required: true
  },
  huesped: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Huesped',
    required: true
  },
  fechaIngreso: {
    type: Date,
    required: true
  },
  fechaEgreso: {
    type: Date,
    required: true
  },
  estado: {
    type: String,
    enum: ['activa', 'finalizada', 'cancelada'],
    default: 'activa'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reserva', reservaSchema);
