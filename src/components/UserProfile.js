// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import { ref, set, onValue } from 'firebase/database';
import './UserProfile.css';

const UserProfile = ({ db }) => {
  const [userData, setUserData] = useState({
    nombre: '',
    entidad: '',
    sexo: '',
    edad: '',
    programa: '',
    semestre: '',
    email: '',
    turno: '',
    telefono: '',
    institucion: ''
  });

  const [isSaved, setIsSaved] = useState(false);

  // Cargar datos del perfil si existen
  useEffect(() => {
    const userRef = ref(db, 'user_profile');
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUserData(data);
      }
    });
  }, [db]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const userRef = ref(db, 'user_profile');
      await set(userRef, userData);
      setIsSaved(true);
      
      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error('Error al guardar el perfil:', error);
      alert('Error al guardar el perfil. Intenta nuevamente.');
    }
  };

  const programasEducativos = [
    "Licenciatura en Ciencias de la Educación",
    "Licenciatura en Idiomas",
    "Licenciatura en Comunicación",
    "TSUM",
    "Otra"
  ];

  return (
    <div className="profile-container">
      <div className="container">
        <h2>Mi Perfil</h2>
        <p>Completa tu información personal para agilizar el llenado de encuestas</p>
        
        {isSaved && (
          <div className="success-message">
            ✅ Perfil guardado correctamente
          </div>
        )}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-section">
            <h3>Información Personal</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre completo *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={userData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edad">Edad *</label>
                <input
                  type="number"
                  id="edad"
                  name="edad"
                  value={userData.edad}
                  onChange={handleChange}
                  min="16"
                  max="60"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="sexo">Sexo *</label>
                <select
                  id="sexo"
                  name="sexo"
                  value={userData.sexo}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="entidad">Entidad federativa *</label>
                <input
                  type="text"
                  id="entidad"
                  name="entidad"
                  value={userData.entidad}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Información Académica</h3>
            
            <div className="form-group">
              <label htmlFor="institucion">Institución Educativa</label>
              <input
                type="text"
                id="institucion"
                name="institucion"
                value={userData.institucion}
                onChange={handleChange}
                placeholder="Nombre de tu institución"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="programa">Programa educativo *</label>
                <select
                  id="programa"
                  name="programa"
                  value={userData.programa}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione...</option>
                  {programasEducativos.map((programa, index) => (
                    <option key={index} value={programa}>{programa}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="semestre">Semestre *</label>
                <input
                  type="number"
                  id="semestre"
                  name="semestre"
                  value={userData.semestre}
                  onChange={handleChange}
                  min="1"
                  max="12"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="turno">Turno *</label>
                <select
                  id="turno"
                  name="turno"
                  value={userData.turno}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="Matutino">Matutino</option>
                  <option value="Vespertino">Vespertino</option>
                  <option value="Nocturno">Nocturno</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono de contacto</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={userData.telefono}
                  onChange={handleChange}
                  placeholder="+52 123 456 7890"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Información de Contacto</h3>
            
            <div className="form-group">
              <label htmlFor="email">Correo electrónico *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
                placeholder="usuario@ejemplo.com"
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            Guardar Perfil
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;