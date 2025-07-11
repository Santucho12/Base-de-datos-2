import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../Home.css';

function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [numero, setNumero] = useState('');
  const [tipo, setTipo] = useState('simple');
  const [capacidad, setCapacidad] = useState(1);
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('disponible');
  const [mensaje, setMensaje] = useState('');
  const [editId, setEditId] = useState(null);

  // Estadísticas rápidas
  const total = habitaciones.length;
  const ocupadas = habitaciones.filter(h => h.estado === 'ocupada').length;
  const libres = habitaciones.filter(h => h.estado === 'disponible').length;

  const cargarHabitaciones = async () => {
    const res = await api.get('/habitaciones');
    setHabitaciones(res.data);
  };

  useEffect(() => {
    cargarHabitaciones();
  }, []);

  const limpiarForm = () => {
    setNumero(''); setTipo('simple'); setCapacidad(1); setPrecio(''); setDescripcion(''); setEstado('disponible'); setEditId(null);
  };

  const crearHabitacion = async (e) => {
    e.preventDefault();
    try {
      // Convertir los campos a número antes de enviar
      const data = {
        numero: Number(numero),
        tipo,
        capacidad: Number(capacidad),
        precio: Number(precio),
        descripcion,
        estado
      };
      if (editId) {
        await api.put(`/habitaciones/${editId}`, data);
        setMensaje('Habitación actualizada');
      } else {
        await api.post('/habitaciones', data);
        setMensaje('Habitación creada');
      }
      limpiarForm();
      cargarHabitaciones();
    } catch (err) {
      setMensaje('Error al guardar habitación');
      console.error('Error al guardar habitación:', err);
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
    setPrecio(h.precio);
    setDescripcion(h.descripcion || '');
    setEstado(h.estado || 'disponible');
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
        <form className="habitacion-form form-modern" onSubmit={crearHabitacion}>
          <div className="form-row">
            <label>
              Número
              <input placeholder="Número" value={numero} onChange={e=>setNumero(e.target.value)} required type="number" min="1" />
            </label>
            <label>
              Tipo
              <select value={tipo} onChange={e=>setTipo(e.target.value)} required>
                <option value="simple">Simple</option>
                <option value="doble">Doble</option>
                <option value="suite">Suite</option>
                <option value="familiar">Familiar</option>
              </select>
            </label>
            <label>
              Capacidad
              <input type="number" min="1" placeholder="Capacidad" value={capacidad} onChange={e=>setCapacidad(e.target.value)} required />
            </label>
            <label>
              Precio
              <input type="number" min="0" placeholder="Precio" value={precio} onChange={e=>setPrecio(e.target.value)} required />
            </label>
          </div>
          <div className="form-row">
            <label style={{flex:2}}>
              Descripción
              <input placeholder="Descripción" value={descripcion} onChange={e=>setDescripcion(e.target.value)} />
            </label>
            <label>
              Estado
              <select value={estado} onChange={e=>setEstado(e.target.value)} required>
                <option value="disponible">Disponible</option>
                <option value="ocupada">Ocupada</option>
                <option value="mantenimiento">Mantenimiento</option>
              </select>
            </label>
          </div>
          <div className="form-actions">
            <button className="action-btn" type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
            {editId && <button type="button" className="action-btn secondary" onClick={limpiarForm}>Cancelar</button>}
          </div>
        </form>
        {mensaje && <p style={{color:'#1976d2', marginTop:'0.5rem'}}>{mensaje}</p>}

        {/* Tabla */}
        <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',background:'#fff',borderRadius:12,boxShadow:'0 4px 24px #0008',marginTop:8,border:'2px solid #e0e0e0'}}>
          <thead style={{background:'#f4f6fb'}}>
            <tr>
              <th>ID</th>
              <th>Número</th>
              <th>Tipo</th>
              <th>Capacidad</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {habitaciones.map(h=>(
              <tr key={h._id} className={`fila-${h.estado}`}>
                <td>{h._id}</td>
                <td>{h.numero}</td>
                <td>{h.tipo}</td>
                <td>{h.capacidad}</td>
                <td>${h.precio}</td>
                <td>{h.descripcion}</td>
                <td>{h.estado}</td>
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
