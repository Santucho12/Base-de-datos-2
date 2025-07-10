const mongoose = require('mongoose');

const huespedSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  telefono: {
    type: String
  },
  documento: {
    type: String,
    unique: true
  },
  fechaNacimiento: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Huesped', huespedSchema);
