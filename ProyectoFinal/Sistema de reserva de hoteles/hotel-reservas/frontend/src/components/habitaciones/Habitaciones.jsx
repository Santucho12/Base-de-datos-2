import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../Home.css';

function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [numero, setNumero] = useState('');
  const [tipo, setTipo] = useState('Estándar');
  const [capacidad, setCapacidad] = useState(1);
  const [precioPorNoche, setPrecioPorNoche] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [amenidades, setAmenidades] = useState('');
  const [disponible, setDisponible] = useState(true);
  const [editId, setEditId] = useState(null);

  // Estadísticas rápidas
  const total = habitaciones.length;
  const ocupadas = habitaciones.filter(h => !h.disponible).length;
  const libres = habitaciones.filter(h => h.disponible).length;

  const cargarHabitaciones = async () => {
    const res = await api.get('/habitaciones');
    setHabitaciones(res.data);
  };

  useEffect(() => {
    cargarHabitaciones();
  }, []);

  const limpiarForm = () => {
    setNumero(''); setTipo('Estándar'); setCapacidad(1); setPrecioPorNoche(''); setAmenidades(''); setDisponible(true); setEditId(null);
  };

  const crearHabitacion = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/habitaciones/${editId}`, {
          numero, tipo, capacidad, precioPorNoche, amenidades: amenidades.split(',').map(a => a.trim()).filter(Boolean), disponible
        });
        setMensaje('Habitación actualizada');
      } else {
        await api.post('/habitaciones', {
          numero, tipo, capacidad, precioPorNoche, amenidades: amenidades.split(',').map(a => a.trim()).filter(Boolean), disponible
        });
        setMensaje('Habitación creada');
      }
      limpiarForm();
      cargarHabitaciones();
    } catch {
      setMensaje('Error al guardar habitación');
    }
  };

  const eliminarHabitacion = async (id) => {
    if(window.confirm('¿Eliminar habitación?')) {
      await api.delete(`/habitaciones/${id}`);
      cargarHabitaciones();
    }
  };

  const editarHabitacion = (h) => {
    setEditId(h._id);
    setNumero(h.numero);
    setTipo(h.tipo);
    setCapacidad(h.capacidad);
    setPrecioPorNoche(h.precioPorNoche);
    setAmenidades(h.amenidades?.join(', ') || '');
    setDisponible(h.disponible);
  };

  return (
    <div className="hotel-admin">
      <div className="container">
        <div className="header-section">
          <h2 className="main-title">🛏️ Gestión de Habitaciones</h2>
          <p className="main-description">Administra habitaciones, disponibilidad y características.</p>
        </div>

        {/* Stats */}
        <div className="stats-section">
          <div className="stat-card"><div className="stat-icon">🏨</div><div className="stat-info"><h3>{total}</h3><p>Total</p></div></div>
          <div className="stat-card"><div className="stat-icon">✅</div><div className="stat-info"><h3>{libres}</h3><p>Disponibles</p></div></div>
          <div className="stat-card"><div className="stat-icon">❌</div><div className="stat-info"><h3>{ocupadas}</h3><p>Ocupadas</p></div></div>
        </div>

        {/* Formulario */}
        <form className="habitacion-form" onSubmit={crearHabitacion} style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:24,alignItems:'center'}}>
          <input placeholder="Número" value={numero} onChange={e=>setNumero(e.target.value)} required style={{flex:1,minWidth:90}}/>
          <select value={tipo} onChange={e=>setTipo(e.target.value)} style={{flex:1,minWidth:120}}>
            <option>Estándar</option><option>Superior</option><option>Suite</option><option>Presidencial</option>
          </select>
          <input type="number" min="1" placeholder="Capacidad" value={capacidad} onChange={e=>setCapacidad(e.target.value)} required style={{flex:1,minWidth:90}}/>
          <input type="number" min="0" placeholder="Precio por noche" value={precioPorNoche} onChange={e=>setPrecioPorNoche(e.target.value)} required style={{flex:1,minWidth:120}}/>
          <input placeholder="Amenidades (coma)" value={amenidades} onChange={e=>setAmenidades(e.target.value)} style={{flex:2,minWidth:140}}/>
          <label style={{display:'flex',alignItems:'center',gap:4}}>
            <input type="checkbox" checked={disponible} onChange={e=>setDisponible(e.target.checked)} /> Disponible
          </label>
          <button className="action-btn" type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
          {editId && <button type="button" className="action-btn secondary" onClick={limpiarForm}>Cancelar</button>}
        </form>
        {mensaje && <p style={{color:'#1976d2', marginTop:'0.5rem'}}>{mensaje}</p>}

        {/* Tabla */}
        <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',background:'#fff',borderRadius:12,boxShadow:'0 2px 8px #0001',marginTop:8}}>
          <thead style={{background:'#f4f6fb'}}>
            <tr>
              <th>ID</th>
              <th>Número</th>
              <th>Tipo</th>
              <th>Capacidad</th>
              <th>Precio</th>
              <th>Amenidades</th>
              <th>Disponible</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {habitaciones.map(h=>(
              <tr key={h._id} style={{background:h.disponible?'#e8f5e8':'#ffeaea'}}>
                <td>{h._id}</td>
                <td>{h.numero}</td>
                <td>{h.tipo}</td>
                <td>{h.capacidad}</td>
                <td>${h.precioPorNoche}</td>
                <td>{h.amenidades?.join(', ')}</td>
                <td>{h.disponible ? 'Sí' : 'No'}</td>
                <td style={{display:'flex',gap:6}}>
                  <button className="action-btn tertiary" onClick={()=>editarHabitacion(h)}>Editar</button>
                  <button className="action-btn secondary" onClick={()=>eliminarHabitacion(h._id)}>Eliminar</button>
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

export default Habitaciones;
