# 🏨 Sistema de Reservas de Hotel

**Dificultad**: ⭐⭐⭐

## 📋 Descripción
Plataforma para gestionar habitaciones, huéspedes y reservas de un hotel.

## 🎯 Requerimientos
- ✅ Catálogo de habitaciones con diferentes tipos y precios
- ✅ Sistema de reservas con fechas de entrada y salida
- ✅ Gestión de huéspedes y su historial
- ✅ Control de disponibilidad de habitaciones

## 🏗️ Estructura del Proyecto

```
ProyectoFinalBD/
├── README.md
├── javascript/
│   ├── package.json
│   ├── src/
│   │   ├── database/
│   │   │   └── connection.js
│   │   ├── models/
│   │   │   ├── habitacion.js
│   │   │   └── reserva.js
│   │   ├── services/
│   │   │   └── hotelService.js
│   │   └── app.js
│   └── tests/
└── python/
    ├── requirements.txt
    ├── src/
    │   ├── database/
    │   │   └── connection.py
    │   ├── models/
    │   │   ├── habitacion.py
    │   │   └── reserva.py
    │   ├── services/
    │   │   └── hotel_service.py
    │   └── main.py
    └── tests/
```

## 📊 Estructura de Datos

### Colección: habitaciones
```javascript
{
  _id: ObjectId,
  numero: "101",
  tipo: "Suite",
  capacidad: 4,
  precioPorNoche: 150.00,
  amenidades: ["WiFi", "TV", "Minibar", "Balcón"],
  disponible: true
}
```

### Colección: reservas
```javascript
{
  _id: ObjectId,
  habitacionId: ObjectId,
  huesped: {
    nombre: "María López",
    email: "maria@email.com",
    telefono: "+1234567890"
  },
  fechaEntrada: ISODate,
  fechaSalida: ISODate,
  noches: 3,
  precioTotal: 450.00,
  estado: "confirmada", // "pendiente", "confirmada", "cancelada"
  fechaReserva: ISODate
}
```

## 🚀 Funciones a Implementar

1. **consultarDisponibilidad(fechaEntrada, fechaSalida, tipo)** - Ver habitaciones disponibles
2. **crearReserva(reserva)** - Crear nueva reserva
3. **cancelarReserva(reservaId)** - Cancelar reserva existente
4. **checkIn(reservaId)** - Registrar entrada del huésped
5. **reporteOcupacion(mes, año)** - Reporte de ocupación mensual

## 📚 Tecnologías
- **Base de Datos**: MongoDB
- **Backend**: JavaScript (Node.js) y Python
- **Driver MongoDB**: mongoose (JS) y pymongo (Python)

## 🎓 Plan de Desarrollo

### Fase 1: Configuración inicial
- [x] Configurar estructura de proyecto
- [ ] Configurar conexión a MongoDB
- [ ] Instalar dependencias

### Fase 2: Modelos y datos iniciales
- [ ] Crear modelos de habitaciones y reservas
- [ ] Insertar datos de prueba
- [ ] Validar estructura de datos

### Fase 3: Funciones principales
- [ ] Implementar consulta de disponibilidad
- [ ] Implementar creación de reservas
- [ ] Implementar cancelación de reservas

### Fase 4: Funciones avanzadas
- [ ] Implementar check-in
- [ ] Implementar reportes de ocupación
- [ ] Testing y validaciones

¡Empezamos! 🚀