# 🏨 Sistema de Reservas de Hotel

**Proyecto 5: Sistema de Reservas de Hotel**

## 📋 Descripción

Plataforma completa para gestionar habitaciones, huéspedes y reservas de un hotel. Este sistema permite administrar de manera eficiente la disponibilidad de habitaciones, procesar reservas y mantener un registro detallado de los huéspedes.

## 🎯 Requerimientos Funcionales

- ✅ **Catálogo de habitaciones** con diferentes tipos y precios
- ✅ **Sistema de reservas** con fechas de entrada y salida
- ✅ **Gestión de huéspedes** y su historial
- ✅ **Control de disponibilidad** de habitaciones en tiempo real
- ✅ **Reportes de ocupación** mensual

## 🏗️ Arquitectura del Sistema

```
hotel-reservas/
├── 🖥️ frontend/          # Frontend (React.js)
├── ⚙️ backend/           # Backend API (Node.js + Express)
├── 🐳 database/          # Configuración MongoDB
└── 🐋 docker-compose.yml # Orquestación de contenedores
```

## 📊 Estructura de Datos

### Colección: `habitaciones`
```javascript
{
  _id: ObjectId,
  numero: "101",
  tipo: "Suite",                    // "Estándar", "Superior", "Suite", "Presidencial"
  capacidad: 4,
  precioPorNoche: 150.00,
  amenidades: ["WiFi", "TV", "Minibar", "Balcón"],
  disponible: true
}
```

### Colección: `reservas`
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
  estado: "confirmada",             // "pendiente", "confirmada", "cancelada"
  fechaReserva: ISODate
}
```

### Colección: `huespedes`
```javascript
{
  _id: ObjectId,
  nombre: "María López",
  email: "maria@email.com",
  telefono: "+1234567890",
  documento: "12345678",
  fechaRegistro: ISODate,
  historialReservas: [ObjectId]     // Referencias a reservas
}
```

## 🔧 Funciones Principales

| Función | Descripción | Endpoint |
|---------|-------------|----------|
| `consultarDisponibilidad()` | Ver habitaciones disponibles por fechas y tipo | `GET /api/habitaciones/disponibles` |
| `crearReserva()` | Crear nueva reserva | `POST /api/reservas` |
| `cancelarReserva()` | Cancelar reserva existente | `PUT /api/reservas/:id/cancelar` |
| `checkIn()` | Registrar entrada del huésped | `PUT /api/reservas/:id/checkin` |
| `reporteOcupacion()` | Reporte de ocupación mensual | `GET /api/reportes/ocupacion` |

## 🛠️ Stack Tecnológico

- **Frontend:** React.js + Vite
- **Backend:** Node.js + Express.js
- **Base de Datos:** MongoDB
- **Contenedores:** Docker + Docker Compose
- **Styling:** CSS3 + Components modulares

## 🚀 Instalación y Configuración

### Prerrequisitos
- Docker y Docker Compose
- Node.js 18+ (para desarrollo local)
- MongoDB (incluido en Docker)

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd hotel-reservas
```

### 2. Ejecutar con Docker (Recomendado)
```bash
# Levantar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f
```

### 3. Instalación manual

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📡 API Endpoints

### Habitaciones
- `GET /api/habitaciones` - Listar todas las habitaciones
- `GET /api/habitaciones/:id` - Obtener habitación específica
- `GET /api/habitaciones/disponibles` - Consultar disponibilidad
- `POST /api/habitaciones` - Crear nueva habitación
- `PUT /api/habitaciones/:id` - Actualizar habitación
- `DELETE /api/habitaciones/:id` - Eliminar habitación

### Reservas
- `GET /api/reservas` - Listar todas las reservas
- `GET /api/reservas/:id` - Obtener reserva específica
- `POST /api/reservas` - Crear nueva reserva
- `PUT /api/reservas/:id` - Actualizar reserva
- `PUT /api/reservas/:id/cancelar` - Cancelar reserva
- `PUT /api/reservas/:id/checkin` - Registrar check-in
- `PUT /api/reservas/:id/checkout` - Registrar check-out

### Huéspedes
- `GET /api/huespedes` - Listar todos los huéspedes
- `GET /api/huespedes/:id` - Obtener huésped específico
- `POST /api/huespedes` - Registrar nuevo huésped
- `PUT /api/huespedes/:id` - Actualizar información del huésped
- `GET /api/huespedes/:id/historial` - Historial de reservas

### Reportes
- `GET /api/reportes/ocupacion` - Reporte de ocupación
- `GET /api/reportes/ingresos` - Reporte de ingresos
- `GET /api/reportes/habitaciones-populares` - Habitaciones más reservadas

## 🌐 URLs de Acceso

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **MongoDB:** localhost:27017

## 📝 Variables de Entorno

Crear archivo `.env` en la carpeta `backend/`:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/hotel-reservas
NODE_ENV=development
JWT_SECRET=clave_secreta
JWT_EXPIRATION=1h
```

## 🧪 Ejemplos de Uso

### Consultar Disponibilidad
```javascript
GET /api/habitaciones/disponibles?fechaEntrada=2024-07-15&fechaSalida=2024-07-18&tipo=Suite
```

### Crear Reserva
```javascript
POST /api/reservas
{
  "habitacionId": "60d5ec49f1b2c8b1f8c4e6a1",
  "huesped": {
    "nombre": "Juan Pérez",
    "email": "juan@email.com",
    "telefono": "+1234567890"
  },
  "fechaEntrada": "2024-07-15",
  "fechaSalida": "2024-07-18"
}
```

## 📊 Características del Sistema

### ✨ Funcionalidades Principales
- 🏠 **Gestión de Habitaciones:** CRUD completo con tipos y amenidades
- 📅 **Sistema de Reservas:** Booking con validación de disponibilidad
- 👤 **Gestión de Huéspedes:** Registro y historial de clientes
- 📈 **Dashboard de Reportes:** Métricas de ocupación e ingresos
- 🔍 **Búsqueda Avanzada:** Filtros por fecha, tipo y capacidad

### 🔒 Seguridad
- Validación de datos de entrada
- Manejo de errores centralizado
- Logs de actividad del sistema

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **Tu Nombre** - *Desarrollo inicial* - [TuGitHub](https://github.com/tu-usuario)

## 📞 Soporte

Si tienes alguna pregunta o problema:
- 📧 Email: tu-email@ejemplo.com
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/hotel-reservas/issues)

---

⭐ **¡No olvides dar una estrella al proyecto si te resulta útil!**