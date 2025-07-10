const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const rutaHabitacion = require('./routes/habitacion.route');
const rutaHuesped = require('./routes/huesped.route');
const rutaReserva = require('./routes/reserva.route');

dotenv.config()

class Server{
    constructor(template = process.env.TEMPLATE || "ejs") {
        this.app = express();
        this.port = process.env.PORT || 3001;
        this.app.use(cors())
        this.app.use(express.json())
        //this.middleware();
        //this.engine(template);
        this.rutas();
    }

    rutas() {
        this.app.use("/api/v1/habitaciones", rutaHabitacion);
        this.app.use("/api/v1/huespedes", rutaHuesped);
        this.app.use("/api/v1/reservas", rutaReserva);
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