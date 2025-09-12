// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom'; // ← Asegúrate que esta importación esté
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Ayudándoles a Triunfar A.C.</h4>
            <p>Transformando vidas a través de la salud mental y educación</p>
          </div>

          <div className="footer-section">
            <h4>Enlaces Rápidos</h4>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/quienes-somos">Quiénes Somos</Link></li>
              <li><Link to="/encuestas">Encuestas</Link></li>
              <li><Link to="/perfil">Mi Perfil</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contacto</h4>
            <p>contacto@ayudandolesatriunfar.org</p>
            <p>(834) 123-4567</p>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <Link to="/aviso-privacidad" className="privacy-link">
              Aviso de Privacidad
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Ayudándoles a Triunfar A.C. - Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;