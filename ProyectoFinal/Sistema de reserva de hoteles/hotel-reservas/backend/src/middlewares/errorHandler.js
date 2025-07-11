const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.stack || err);
  // Mostrar el error completo en consola para debug
  if (err) {
    console.error("Error completo:", JSON.stringify(err, null, 2));
  }

  // Error de validación de Mongoose
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      message: "Error de validación",
      errors: messages,
    });
  }

  // Error de duplicado (MongoDB)
  if (err.code === 11000) {
    return res.status(400).json({
      message: "El recurso ya existe",
      field: Object.keys(err.keyValue)[0],
    });
  }

  // Error por defecto
  res.status(err.status || 500).json({
    message: err.message || "Error interno del servidor",
    stack: err.stack, // Mostrar siempre el stack para debug
  });
};

module.exports = errorHandler;
