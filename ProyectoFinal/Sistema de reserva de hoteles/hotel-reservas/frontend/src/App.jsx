import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Habitaciones from './components/habitaciones/Habitaciones';
import Huespedes from './components/huespedes/Huespedes';
import Reservas from './components/reservas/Reservas';
import './App.css';

function App() {
  return (
    <Router>
      <nav style={{padding:'1rem', background:'#e3e3e3', marginBottom:'2rem'}}>
        <Link to="/" style={{marginRight:'1rem'}}>Inicio</Link>
        <Link to="/habitaciones" style={{marginRight:'1rem'}}>Habitaciones</Link>
        <Link to="/huespedes" style={{marginRight:'1rem'}}>Huéspedes</Link>
        <Link to="/reservas">Reservas</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
        <Route path="/huespedes" element={<Huespedes />} />
        <Route path="/reservas" element={<Reservas />} />
      </Routes>
    </Router>
  );
}

export default App;
