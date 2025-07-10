import { useNavigate } from 'react-router-dom';
import "./Home.css"

function HotelHome() {
  const navigate = useNavigate();
  return (
    <div className="hotel-admin">
      <div className="container">
        <div className="header-section">
          <h1 className="main-title">🏨 Panel de Administración</h1>
          <p className="main-description">
            Sistema integral de gestión hotelera - Controla todas las operaciones desde aquí
          </p>
          <div className="status-indicator">
            <span className="status-dot"></span>
            Sistema operativo
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">🛏️</div>
            <div className="stat-info">
              <h3>87/120</h3>
              <p>Habitaciones Ocupadas</p>
              <span className="stat-percentage">72%</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>156</h3>
              <p>Huéspedes Activos</p>
              <span className="stat-percentage">+12%</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>23</h3>
              <p>Check-ins Hoy</p>
              <span className="stat-percentage">8 salidas</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>4.8</h3>
              <p>Satisfacción</p>
              <span className="stat-percentage">Excelente</span>
            </div>
          </div>
        </div>

        <div className="actions-section">
          <h3 className="section-title">🚀 Acciones Rápidas</h3>
          <div className="actions-grid">
            <button className="action-btn" onClick={()=>navigate('/reservas')}>
              <span className="btn-icon">➕</span>
              Nueva Reserva
            </button>
            <button className="action-btn secondary" onClick={()=>navigate('/huespedes')}>
              <span className="btn-icon">🔍</span>
              Buscar Huésped
            </button>
            <button className="action-btn tertiary" onClick={()=>navigate('/habitaciones')}>
              <span className="btn-icon">🏠</span>
              Estado Habitaciones
            </button>
            <button className="action-btn quaternary" onClick={()=>alert('Funcionalidad de reportes próximamente')}>
              <span className="btn-icon">📊</span>
              Reportes
            </button>
          </div>
        </div>

        <div className="activity-section">
          <h3 className="section-title">📋 Actividad Reciente</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon success">✅</div>
              <div>
                <p className="activity-title">Check-in completado</p>
                <p className="activity-detail">Habitación 205 - Juan Pérez</p>
                <span className="activity-time">Hace 5 min</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon info">📝</div>
              <div>
                <p className="activity-title">Nueva reserva registrada</p>
                <p className="activity-detail">María García - 3 noches</p>
                <span className="activity-time">Hace 12 min</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon warning">🔧</div>
              <div>
                <p className="activity-title">Mantenimiento completado</p>
                <p className="activity-detail">Habitación 108 - Aire acondicionado</p>
                <span className="activity-time">Hace 1 h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelHome
