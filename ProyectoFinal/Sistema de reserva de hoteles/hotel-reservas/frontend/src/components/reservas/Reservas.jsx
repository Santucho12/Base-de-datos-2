import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../Home.css';

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [habitacionId, setHabitacionId] = useState('');
  const [huespedId, setHuespedId] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [fechaEgreso, setFechaEgreso] = useState('');
  const [estado, setEstado] = useState('activa');
  const [mensaje, setMensaje] = useState('');
  const [habitaciones, setHabitaciones] = useState([]);
  const [huespedes, setHuespedes] = useState([]);
  const [editId, setEditId] = useState(null);

  const total = reservas.length;

  const cargarReservas = async () => {
    const res = await api.get('/reservas');
    setReservas(res.data);
  };
  const cargarHabitaciones = async () => {
    const res = await api.get('/habitaciones');
    setHabitaciones(res.data);
  };
  const cargarHuespedes = async () => {
    const res = await api.get('/huespedes');
    setHuespedes(res.data);
  };

  useEffect(() => {
    cargarReservas();
    cargarHabitaciones();
    cargarHuespedes();
  }, []);

  const limpiarForm = () => {
    setHabitacionId(''); setHuespedId(''); setFechaIngreso(''); setFechaEgreso(''); setEstado('activa'); setEditId(null);
  };

  const crearReserva = async (e) => {
    e.preventDefault();
    try {
      const data = {
        habitacion: habitacionId,
        huesped: huespedId,
        fechaIngreso,
        fechaEgreso,
        estado
      };
      if (editId) {
        await api.put(`/reservas/${editId}`, data);
        setMensaje('Reserva actualizada');
      } else {
        await api.post('/reservas', data);
        setMensaje('Reserva creada');
      }
      limpiarForm();
      cargarReservas();
    } catch {
      setMensaje('Error al guardar reserva');
    }
  };

  const eliminarReserva = async (id) => {
    if(window.confirm('¿Eliminar reserva?')) {
      await api.delete(`/reservas/${id}`);
      cargarReservas();
    }
  };

  const editarReserva = (r) => {
    setEditId(r._id);
    setHabitacionId(r.habitacion?._id || r.habitacion);
    setHuespedId(r.huesped?._id || r.huesped);
    setFechaIngreso(r.fechaIngreso ? r.fechaIngreso.slice(0,10) : '');
    setFechaEgreso(r.fechaEgreso ? r.fechaEgreso.slice(0,10) : '');
    setEstado(r.estado || 'activa');
  };

  return (
    <div className="hotel-admin">
      <div className="container">
        <div className="header-section">
          <h2 className="main-title">📅 Gestión de Reservas</h2>
          <p className="main-description">Administra reservas, fechas y huéspedes.</p>
        </div>
        <div className="stats-section">
          <div className="stat-card"><div className="stat-icon">📅</div><div className="stat-info"><h3>{total}</h3><p>Reservas</p></div></div>
        </div>
        <form onSubmit={crearReserva} className="form-modern">
          <div className="form-row">
            <label>
              Habitación
              <select value={habitacionId} onChange={e=>setHabitacionId(e.target.value)} required>
                <option value="">Selecciona habitación</option>
                {habitaciones.map(h=>(<option key={h._id} value={h._id}>{h.numero} - {h.tipo}</option>))}
              </select>
            </label>
            <label>
              Huésped
              <select value={huespedId} onChange={e=>setHuespedId(e.target.value)} required>
                <option value="">Selecciona huésped</option>
                {huespedes.map(h=>(<option key={h._id} value={h._id}>{h.nombre} {h.apellido} - {h.documento}</option>))}
              </select>
            </label>
            <label>
              Fecha ingreso
              <input type="date" value={fechaIngreso} onChange={e=>setFechaIngreso(e.target.value)} required />
            </label>
            <label>
              Fecha egreso
              <input type="date" value={fechaEgreso} onChange={e=>setFechaEgreso(e.target.value)} required />
            </label>
            <label>
              Estado
              <select value={estado} onChange={e=>setEstado(e.target.value)} required>
                <option value="activa">Activa</option>
                <option value="finalizada">Finalizada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </label>
          </div>
          <div className="form-actions">
            <button className="action-btn" type="submit">{editId ? 'Actualizar' : 'Reservar'}</button>
            {editId && <button type="button" className="action-btn secondary" onClick={limpiarForm}>Cancelar</button>}
          </div>
        </form>
        {mensaje && <p style={{color:'#1976d2', marginTop:'0.5rem'}}>{mensaje}</p>}
        <div style={{overflowX:'auto'}}>
          <table className="habitacion-table">
          <thead >
            <tr>{/* <th>ID</th> */}<th>Habitación</th><th>Huésped</th><th>Documento</th><th>Ingreso</th><th>Egreso</th><th>Estado</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {reservas.map(r=>(
              <tr key={r._id}>
                {/* <td>{r._id}</td> */}
                <td>{r.habitacion?.numero || habitaciones.find(h=>h._id===r.habitacion)?.numero || r.habitacion}</td>
                <td>{r.huesped?.nombre} {r.huesped?.apellido}</td>
                <td>{r.huesped?.documento}</td>
                <td>{r.fechaIngreso ? r.fechaIngreso.slice(0,10) : ''}</td>
                <td>{r.fechaEgreso ? r.fechaEgreso.slice(0,10) : ''}</td>
                <td>{r.estado}</td>
                <td style={{display:'flex',gap:6}}>
                  <button className="action-btn tertiary" onClick={()=>editarReserva(r)}>Editar</button>
                  <button className="action-btn secondary" onClick={()=>eliminarReserva(r._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export default Reservas;
