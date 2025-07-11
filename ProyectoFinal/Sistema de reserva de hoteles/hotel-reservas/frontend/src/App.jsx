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
      <nav className="main-nav">
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/habitaciones" className="nav-link">Habitaciones</Link>
        <Link to="/huespedes" className="nav-link">Huéspedes</Link>
        <Link to="/reservas" className="nav-link">Reservas</Link>
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
