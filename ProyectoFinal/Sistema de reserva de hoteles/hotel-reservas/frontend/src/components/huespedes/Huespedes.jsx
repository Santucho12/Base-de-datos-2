import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../Home.css';

function Huespedes() {
  const [huespedes, setHuespedes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [documento, setDocumento] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
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
    setNombre('');
    setApellido('');
    setEmail('');
    setTelefono('');
    setDocumento('');
    setFechaNacimiento('');
    setEditId(null);
  };

  const crearHuesped = async (e) => {
    e.preventDefault();
    try {
      const data = {
        nombre,
        apellido,
        email,
        telefono,
        documento,
        fechaNacimiento: fechaNacimiento || null,
      };
      if (editId) {
        await api.put(`/huespedes/${editId}`, data);
        setMensaje('Huésped actualizado');
      } else {
        await api.post('/huespedes', data);
        setMensaje('Huésped registrado');
      }
      limpiarForm();
      cargarHuespedes();
    } catch (err) {
      if (err.response?.data?.message) {
        setMensaje('Error: ' + err.response.data.message);
      } else if (err.message) {
        setMensaje('Error: ' + err.message);
      } else {
        setMensaje('Error al guardar huésped');
      }
    }
  };

  const eliminarHuesped = async (id) => {
    if (window.confirm('¿Eliminar huésped?')) {
      await api.delete(`/huespedes/${id}`);
      cargarHuespedes();
    }
  };

  const editarHuesped = (h) => {
    setEditId(h._id);
    setNombre(h.nombre);
    setApellido(h.apellido);
    setEmail(h.email);
    setTelefono(h.telefono);
    setDocumento(h.documento);
    setFechaNacimiento(h.fechaNacimiento ? h.fechaNacimiento.slice(0, 10) : '');
  };

  return (
    <div className="hotel-admin">
      <div className="container">
        <div className="header-section">
          <h2 className="main-title">👥 Gestión de Huéspedes</h2>
          <p className="main-description">Administra huéspedes registrados y su información.</p>
        </div>

        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>{total}</h3>
              <p>Registrados</p>
            </div>
          </div>
        </div>

        <form onSubmit={crearHuesped} className="form-modern">
          <div className="form-row">
            <label>
              Nombre
              <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </label>
            <label>
              Apellido
              <input placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
            </label>
            <label>
              Email
              <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required type="email" />
            </label>
            <label>
              Teléfono
              <input placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </label>
            <label>
              Documento
              <input placeholder="Documento" value={documento} onChange={(e) => setDocumento(e.target.value)} />
            </label>
            <label>
              Fecha de nacimiento
              <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
            </label>
          </div>

          <div className="form-actions">
            <button className="action-btn" type="submit">
              {editId ? 'Actualizar' : 'Registrar'}
            </button>
            {editId && (
              <button type="button" className="action-btn secondary" onClick={limpiarForm}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        {mensaje && <p className="mensaje" style={{marginTop: 10, color: mensaje.startsWith('Error') ? 'red' : 'green'}}>{mensaje}</p>}

        <div style={{ overflowX: 'auto' }}>
          <table className="habitacion-table">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Documento</th>
                <th>Fecha Nac.</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {huespedes.map((h) => (
                <tr key={h._id} className="fila-normal">
                  {/* <td>{h._id}</td> */}
                  <td>{h.nombre}</td>
                  <td>{h.apellido}</td>
                  <td>{h.email}</td>
                  <td>{h.telefono}</td>
                  <td>{h.documento}</td>
                  <td>{h.fechaNacimiento ? h.fechaNacimiento.slice(0, 10) : ''}</td>
                  <td style={{ display: 'flex', gap: 6 }}>
                    <button className="action-btn tertiary" onClick={() => editarHuesped(h)}>
                      Editar
                    </button>
                    <button className="action-btn secondary" onClick={() => eliminarHuesped(h._id)}>
                      Eliminar
                    </button>
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
