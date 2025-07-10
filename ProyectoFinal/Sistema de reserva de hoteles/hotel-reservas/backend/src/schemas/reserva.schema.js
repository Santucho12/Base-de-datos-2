const Joi = require('joi');

const reservaSchema = Joi.object({
  habitacion: Joi.string().required(), // Debe ser un ObjectId válido
  huesped: Joi.string().required(),    // Debe ser un ObjectId válido
  fechaIngreso: Joi.date().iso().required(),
  fechaEgreso: Joi.date().iso().required(),
  estado: Joi.string().valid('activa', 'finalizada', 'cancelada').default('activa')
});

module.exports = reservaSchema;
