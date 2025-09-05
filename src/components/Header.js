// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <nav className={`nav ${isOpen ? 'nav-open' : ''}`}>
          <Link to="/" className="logo">Ayudándoles a Triunfar</Link>
          <ul className="nav-links">
            <li><Link to="/" onClick={() => setIsOpen(false)}>Inicio</Link></li>
            <li><a href="#features" onClick={() => setIsOpen(false)}>Servicios</a></li>
            <li><Link to="/encuestas" onClick={() => setIsOpen(false)}>Encuestas</Link></li>
            <li><Link to="/perfil" onClick={() => setIsOpen(false)}>Mi Perfil</Link></li>
          </ul>
          <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;