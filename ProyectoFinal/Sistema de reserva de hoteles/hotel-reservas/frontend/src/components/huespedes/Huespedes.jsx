import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../Home.css';
function Huespedes() {
  const [huespedes, setHuespedes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [documento, setDocumento] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [editId, setEditId] = useState(null);

  const total = huespedes.length;

  const cargarHuespedes = async () => {
    const res = await api.get('/huespedes');
    setHuespedes(res.data);
  };

  useEffect(() => {
    cargarHuespedes();
  }, []);

  const limpiarForm = () => {
    setNombre(''); setEmail(''); setTelefono(''); setDocumento(''); setEditId(null);
  };

  const crearHuesped = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/huespedes/${editId}`, { nombre, email, telefono, documento });
        setMensaje('Huésped actualizado');
      } else {
        await api.post('/huespedes', { nombre, email, telefono, documento });
        setMensaje('Huésped registrado');
      }
      limpiarForm();
      cargarHuespedes();
    } catch {
      setMensaje('Error al guardar huésped');
    }
  };

  const eliminarHuesped = async (id) => {
    if(window.confirm('¿Eliminar huésped?')) {
      await api.delete(`/huespedes/${id}`);
      cargarHuespedes();
    }
  };

  const editarHuesped = (h) => {
    setEditId(h._id);
    setNombre(h.nombre);
    setEmail(h.email);
    setTelefono(h.telefono);
    setDocumento(h.documento);
  };

  return (
    <div className="hotel-admin">
      <div className="container">
        <div className="header-section">
          <h2 className="main-title">👥 Gestión de Huéspedes</h2>
          <p className="main-description">Administra huéspedes registrados y su información.</p>
        </div>
        <div className="stats-section">
          <div className="stat-card"><div className="stat-icon">👥</div><div className="stat-info"><h3>{total}</h3><p>Registrados</p></div></div>
        </div>
        <form onSubmit={crearHuesped} style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:24,alignItems:'center'}}>
          <input placeholder="Nombre" value={nombre} onChange={e=>setNombre(e.target.value)} required style={{flex:2,minWidth:120}}/>
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={{flex:2,minWidth:120}}/>
          <input placeholder="Teléfono" value={telefono} onChange={e=>setTelefono(e.target.value)} required style={{flex:1,minWidth:100}}/>
          <input placeholder="Documento" value={documento} onChange={e=>setDocumento(e.target.value)} required style={{flex:1,minWidth:100}}/>
          <button className="action-btn" type="submit">{editId ? 'Actualizar' : 'Registrar'}</button>
          {editId && <button type="button" className="action-btn secondary" onClick={limpiarForm}>Cancelar</button>}
        </form>
        {mensaje && <p style={{color:'#1976d2', marginTop:'0.5rem'}}>{mensaje}</p>}
        <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',background:'#fff',borderRadius:12,boxShadow:'0 2px 8px #0001',marginTop:8}}>
          <thead style={{background:'#f4f6fb'}}>
            <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Documento</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {huespedes.map(h=>(
              <tr key={h._id}>
                <td>{h._id}</td>
                <td>{h.nombre}</td>
                <td>{h.email}</td>
                <td>{h.telefono}</td>
                <td>{h.documento}</td>
                <td style={{display:'flex',gap:6}}>
                  <button className="action-btn tertiary" onClick={()=>editarHuesped(h)}>Editar</button>
                  <button className="action-btn secondary" onClick={()=>eliminarHuesped(h._id)}>Eliminar</button>
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

export default Huespedes;
