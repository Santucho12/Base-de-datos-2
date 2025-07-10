const Joi = require('joi');

const habitacionSchema = Joi.object({
  numero: Joi.number().integer().required(),
  tipo: Joi.string().valid('simple', 'doble', 'suite', 'familiar').required(),
  precio: Joi.number().required(),
  capacidad: Joi.number().integer().required(),
  descripcion: Joi.string().allow(''),
  estado: Joi.string().valid('disponible', 'ocupada', 'mantenimiento').default('disponible')
});

module.exports = habitacionSchema;
