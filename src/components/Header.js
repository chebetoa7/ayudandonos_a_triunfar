// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSede, setSelectedSede] = useState('Tamaulipas');
  
  /*const handleSedeChange = (sede) => {
    setSelectedSede(sede);
    // Aquí puedes agregar lógica para cambiar el contenido según la sede seleccionada
    console.log(`Sede cambiada a: ${sede}`);
  };*/
  const handleSedeChange = (sede) => {
  setSelectedSede(sede);
  localStorage.setItem('selectedSede', sede);
  
  // Disparar evento storage para notificar a otros componentes
  window.dispatchEvent(new Event('storage'));
  
  console.log(`Sede cambiada a: ${sede}`);
};

  return (
    <header className="header">
      <div className="container">
        <nav className={`nav ${isOpen ? 'nav-open' : ''}`}>
          
          {/* Logo y nombre */}
          <div className="logo-container">
            <img 
              src="/logo_at.png" 
              alt="Ayudándoles a Triunfar Logo" 
              className="logo-image"
            />
            <Link to="/" className="logo-text">Ayudándoles a Triunfar</Link>
            
            {/* Selector de sede */}
            <div className="sede-selector">
              <span className="sede-label">{selectedSede}</span>
              <div className="sede-options">
                <button 
                  className={selectedSede === 'Tamaulipas' ? 'active' : ''}
                  onClick={() => handleSedeChange('Tamaulipas')}
                >
                  Tamaulipas
                </button>
                <button 
                  className={selectedSede === 'Tabasco' ? 'active' : ''}
                  onClick={() => handleSedeChange('Tabasco')}
                >
                  Tabasco
                </button>
              </div>
            </div>
          </div>
          
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