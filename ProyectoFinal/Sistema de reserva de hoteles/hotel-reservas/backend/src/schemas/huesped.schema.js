const Joi = require('joi');

const huespedSchema = Joi.object({
  nombre: Joi.string().required(),
  apellido: Joi.string().required(),
  email: Joi.string().email().required(),
  telefono: Joi.string().allow(''),
  documento: Joi.string().allow(''),
  fechaNacimiento: Joi.date().iso().allow(null)
});

module.exports = huespedSchema;
