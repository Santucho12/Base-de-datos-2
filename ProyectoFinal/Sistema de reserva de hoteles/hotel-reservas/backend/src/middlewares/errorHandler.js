// const errorHandler = (err, req, res, next) => {
//   console.error('Error:', err.stack);

//   // Error de validación de Mongoose
//   if (err.name === 'ValidationError') {
//     const messages = Object.values(err.errors).map(val => val.message);
//     return res.status(400).json({
//       message: 'Error de validación',
//       errors: messages
//     });
//   }

//   // Error de duplicado (MongoDB)
//   if (err.code === 11000) {
//     return res.status(400).json({
//       message: 'El recurso ya existe',
//       field: Object.keys(err.keyValue)[0]
//     });
//   }

//   // Error por defecto
//   res.status(err.status || 500).json({
//     message: err.message || 'Error interno del servidor',
//     ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
//   });
// };

// module.exports = errorHandler;