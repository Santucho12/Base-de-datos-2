import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../Home.css';

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [habitacionId, setHabitacionId] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaEntrada, setFechaEntrada] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [habitaciones, setHabitaciones] = useState([]);
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

  useEffect(() => {
    cargarReservas();
    cargarHabitaciones();
  }, []);

  const limpiarForm = () => {
    setHabitacionId(''); setNombre(''); setEmail(''); setTelefono(''); setFechaEntrada(''); setFechaSalida(''); setEditId(null);
  };

  const crearReserva = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/reservas/${editId}`, {
          habitacionId,
          huesped: { nombre, email, telefono },
          fechaEntrada,
          fechaSalida
        });
        setMensaje('Reserva actualizada');
      } else {
        await api.post('/reservas', {
          habitacionId,
          huesped: { nombre, email, telefono },
          fechaEntrada,
          fechaSalida
        });
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
    setHabitacionId(r.habitacionId);
    setNombre(r.huesped?.nombre || '');
    setEmail(r.huesped?.email || '');
    setTelefono(r.huesped?.telefono || '');
    setFechaEntrada(r.fechaEntrada?.slice(0,10) || '');
    setFechaSalida(r.fechaSalida?.slice(0,10) || '');
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
        <form onSubmit={crearReserva} style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:24,alignItems:'center'}}>
          <select value={habitacionId} onChange={e=>setHabitacionId(e.target.value)} required style={{flex:2,minWidth:120}}>
            <option value="">Habitación</option>
            {habitaciones.map(h=>(<option key={h._id} value={h._id}>{h.numero} - {h.tipo}</option>))}
          </select>
          <input placeholder="Nombre huésped" value={nombre} onChange={e=>setNombre(e.target.value)} required style={{flex:2,minWidth:120}}/>
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={{flex:2,minWidth:120}}/>
          <input placeholder="Teléfono" value={telefono} onChange={e=>setTelefono(e.target.value)} required style={{flex:1,minWidth:100}}/>
          <input type="date" value={fechaEntrada} onChange={e=>setFechaEntrada(e.target.value)} required style={{flex:1,minWidth:120}}/>
          <input type="date" value={fechaSalida} onChange={e=>setFechaSalida(e.target.value)} required style={{flex:1,minWidth:120}}/>
          <button className="action-btn" type="submit">{editId ? 'Actualizar' : 'Reservar'}</button>
          {editId && <button type="button" className="action-btn secondary" onClick={limpiarForm}>Cancelar</button>}
        </form>
        {mensaje && <p style={{color:'#1976d2', marginTop:'0.5rem'}}>{mensaje}</p>}
        <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',background:'#fff',borderRadius:12,boxShadow:'0 2px 8px #0001',marginTop:8}}>
          <thead style={{background:'#f4f6fb'}}>
            <tr><th>ID</th><th>Habitación</th><th>Huésped</th><th>Email</th><th>Teléfono</th><th>Entrada</th><th>Salida</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {reservas.map(r=>(
              <tr key={r._id}>
                <td>{r._id}</td>
                <td>{habitaciones.find(h=>h._id===r.habitacionId)?.numero || r.habitacionId}</td>
                <td>{r.huesped?.nombre}</td>
                <td>{r.huesped?.email}</td>
                <td>{r.huesped?.telefono}</td>
                <td>{r.fechaEntrada?.slice(0,10)}</td>
                <td>{r.fechaSalida?.slice(0,10)}</td>
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
