// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #1F2937;
  color: white;
  padding: 60px 0 30px;

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    margin-bottom: 40px;
  }

  .footer-section {
    h3 {
      font-size: 20px;
      margin-bottom: 20px;
      color: #e63946;
    }

    p, li {
      color: #D1D5DB;
      margin-bottom: 10px;
    }

    ul {
      list-style: none;
    }

    a {
      color: #D1D5DB;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: #f8c537;
      }
    }
  }

  .footer-bottom {
    text-align: center;
    padding-top: 30px;
    border-top: 1px solid #374151;
    color: #9CA3AF;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Ayudándoles a Triunfar</h3>
            <p>Tu plataforma de apoyo para alcanzar el éxito personal y profesional.</p>
          </div>
          <div className="footer-section">
            <h3>Enlaces Rápidos</h3>
            <ul>
              <li><a href="#features">Servicios</a></li>
              <li><a href="/contacto">Contacto</a></li>
              <li><a href="#privacy">Política de Privacidad</a></li>
              <li><a href="#terms">Términos de Servicio</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contacto</h3>
            <p>Email: info@ayudandolesatriunfar.com</p>
            <p>Teléfono: +1 (123) 456-7890</p>
            <p>Dirección: Calle Ejemplo 123, Ciudad</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Ayudándoles a Triunfar. Todos los derechos reservados.</p>
        </div>
      </div>
    </FooterContainer>
  );
};

export default Footer;