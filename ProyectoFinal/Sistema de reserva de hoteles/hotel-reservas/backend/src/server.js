const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

const rutaHabitacion = require('./routes/habitacion.route');
const rutaHuesped = require('./routes/huesped.route');
const rutaReserva = require('./routes/reserva.route');

dotenv.config()

class Server{
    constructor(template = process.env.TEMPLATE || "ejs") {
        this.app = express();
        this.port = process.env.PORT || 4000;
        this.app.use(cors({
          origin: '*',
          methods: ['GET','POST','PUT','DELETE','OPTIONS'],
          allowedHeaders: ['Content-Type', 'Authorization'],
        }));
        this.app.use(express.json())
        this.rutas();
        // Añadir el middleware de manejo de errores al final de todos los middlewares y rutas
        this.app.use(errorHandler);
    }

    rutas() {
        this.app.use("/api/v1/habitaciones", rutaHabitacion);
        this.app.use("/api/v1/huespedes", rutaHuesped);
        this.app.use("/api/v1/reservas", rutaReserva);
        // Ruta de prueba para healthcheck
        this.app.get('/api/v1/health', (req, res) => res.json({status:'ok'}));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(
            `Server running on port ${this.port}, host: ${process.env.HOST || 'localhost'}:${this.port}`
            );
        });
        };
    }


module.exports = Server