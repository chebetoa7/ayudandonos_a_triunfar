// src/components/AvisoPrivacidad.js
import React from 'react';
import { Link } from 'react-router-dom'; // ← AÑADE ESTA IMPORTACIÓN
import './AvisoPrivacidad.css';

const AvisoPrivacidad = () => {
  return (
    <div className="aviso-privacidad">
      <div className="container">
        <div className="aviso-content">
          <h2>Aviso de Privacidad</h2>
          
          <div className="aviso-section">
            <h3>🔒 Protección de Datos Personales</h3>
            <p>
              Ayudándoles a Triunfar A.C., con domicilio en Av. Principal #123, Ciudad, Tamaulipas, 
              es responsable del tratamiento de sus datos personales en cumplimiento de la 
              Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
            </p>
          </div>

          <div className="aviso-section">
            <h3>📋 Datos que Recopilamos</h3>
            <ul>
              <li>Información de identificación (nombre, edad, CURP)</li>
              <li>Datos de contacto (email, teléfono)</li>
              <li>Información académica (escuela, grado, grupo)</li>
              <li>Datos de salud mental (encuestas psicológicas)</li>
              <li>Información socioeconómica</li>
            </ul>
          </div>

          <div className="aviso-section">
            <h3>🎯 Finalidad del Tratamiento</h3>
            <p>
              Sus datos personales serán utilizados para: evaluación psicológica, 
              investigación estadística, mejora de nuestros programas, y contacto 
              para seguimiento de casos que requieran atención especializada.
            </p>
          </div>

          <div className="aviso-section">
            <h3>🛡️ Seguridad de la Información</h3>
            <p>
              Implementamos medidas de seguridad administrativas, técnicas y físicas 
              para proteger sus datos personales contra daño, pérdida, alteración, 
              destrucción o el uso, acceso o tratamiento no autorizado.
            </p>
          </div>

          <div className="aviso-section">
            <h3>📝 Derechos ARCO</h3>
            <p>
              Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al 
              tratamiento de sus datos personales. Para ejercer estos derechos, 
              contacte a nuestro Oficial de Privacidad: 
              <strong> privacidad@ayudandolesatriunfar.org</strong>
            </p>
          </div>

          <div className="aviso-section">
            <h3>🔄 Cambios al Aviso de Privacidad</h3>
            <p>
              Nos reservamos el derecho de efectuar en cualquier momento modificaciones 
              o actualizaciones al presente aviso de privacidad.
            </p>
          </div>

          <div className="aviso-contacto">
            <h4>Para más información:</h4>
            <p>
              <strong>Oficial de Privacidad:</strong> Lic. María González<br/>
              <strong>Email:</strong> privacidad@ayudandolesatriunfar.org<br/>
              <strong>Teléfono:</strong> (834) 234-5678
            </p>
          </div>

          <div className="back-home">
            <Link to="/" className="btn">
              ← Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvisoPrivacidad;