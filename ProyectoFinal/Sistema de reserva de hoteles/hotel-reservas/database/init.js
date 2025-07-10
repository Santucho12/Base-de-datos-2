const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/../backend/.env" });

// Función que espera a que la conexión esté lista
async function waitForConnection() {
  return new Promise((resolve, reject) => {
    if (mongoose.connection.readyState === 1) return resolve(); // Ya está conectada
    mongoose.connection.once("open", resolve); // Esperar a que se abra
    mongoose.connection.once("error", reject); // O capturar error
  });
}

// Función principal
async function init() {
  try {
    console.log("🔌 Conectando a MongoDB...");

    // Conexión a la base de datos con tiempos de espera configurados
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 20000,
      connectTimeoutMS: 20000,
    });

    await waitForConnection();
    console.log(
      "✅ Conexión establecida con MongoDB. Estado:",
      mongoose.connection.readyState
    );

    // 🛏️ Definimos el esquema de una habitación
    const habitacionSchema = new mongoose.Schema(
      {
        numero: { type: Number, required: true, unique: true },
        tipo: {
          type: String,
          required: true,
          enum: ["simple", "doble", "suite", "familiar"],
        },
        precio: { type: Number, required: true },
        capacidad: { type: Number, required: true },
        descripcion: { type: String },
        estado: {
          type: String,
          enum: ["disponible", "ocupada", "mantenimiento"],
          default: "disponible",
        },
      },
      { timestamps: true }
    );

    const Habitacion = mongoose.model("Habitacion", habitacionSchema);

    // 👤 Esquema para los huéspedes
    const huespedSchema = new mongoose.Schema(
      {
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        telefono: { type: String, required: true },
        documento: { type: String, required: true, unique: true },
        fechaNacimiento: { type: Date, required: true },
      },
      { timestamps: true }
    );

    const Huesped = mongoose.model("Huesped", huespedSchema);

    // 📆 Esquema para las reservas
    const reservaSchema = new mongoose.Schema(
      {
        habitacion: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Habitacion",
          required: true,
        },
        huesped: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Huesped",
          required: true,
        },
        fechaIngreso: { type: Date, required: true },
        fechaEgreso: { type: Date, required: true },
        estado: {
          type: String,
          enum: ["activa", "finalizada", "cancelada"],
          default: "activa",
        },
      },
      { timestamps: true }
    );

    const Reserva = mongoose.model("Reserva", reservaSchema);

    // 🧹 Limpiar las colecciones antes de insertar nuevos datos
    console.log("🧹 Eliminando datos previos...");
    await Habitacion.deleteMany({});
    await Huesped.deleteMany({});
    await Reserva.deleteMany({});
    console.log("✔️ Colecciones limpias.");

    // 🏨 Insertar habitaciones de prueba
    const habitaciones = await Habitacion.insertMany([
      {
        numero: 101,
        tipo: "doble",
        precio: 1500,
        capacidad: 2,
        descripcion: "Doble con vista",
        estado: "disponible",
      },
      {
        numero: 102,
        tipo: "suite",
        precio: 2500,
        capacidad: 4,
        descripcion: "Suite familiar",
        estado: "disponible",
      },
    ]);

    // 🙋‍♂️ Insertar huéspedes de prueba
    const huespedes = await Huesped.insertMany([
      {
        nombre: "Juan",
        apellido: "Pérez",
        email: "juan@email.com",
        telefono: "123456789",
        documento: "12345678",
        fechaNacimiento: "1990-05-10",
      },
      {
        nombre: "Ana",
        apellido: "García",
        email: "ana@email.com",
        telefono: "987654321",
        documento: "87654321",
        fechaNacimiento: "1985-08-20",
      },
    ]);

    // 📅 Insertar reservas de prueba
    await Reserva.insertMany([
      {
        habitacion: habitaciones[0]._id,
        huesped: huespedes[0]._id,
        fechaIngreso: "2025-07-15",
        fechaEgreso: "2025-07-18",
        estado: "activa",
      },
      {
        habitacion: habitaciones[1]._id,
        huesped: huespedes[1]._id,
        fechaIngreso: "2025-07-20",
        fechaEgreso: "2025-07-25",
        estado: "activa",
      },
    ]);

    console.log("✅ Datos de prueba cargados correctamente.");
    process.exit(0); // Finaliza el script exitosamente
  } catch (err) {
    console.error("❌ Error inicializando la base de datos:", err);
    process.exit(1); // Finaliza con error
  }
}

init();
