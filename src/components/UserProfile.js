// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import { ref, set, onValue, push } from 'firebase/database';
import './UserProfile.css';

const UserProfile = ({ db }) => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    entidad: '',
    sexo: '',
    edad: '',
    programa: '',
    semestre: '',
    email: '',
    turno: '',
    telefono: '',
    institucion: '',
    curp: ''
  });

  const [userId, setUserId] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargar perfil del usuario
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        let storedUserId = localStorage.getItem('user_id');
        
        if (!storedUserId) {
          // Crear nuevo ID de usuario si no existe
          const newUserRef = push(ref(db, 'user_profile'));
          storedUserId = newUserRef.key;
          localStorage.setItem('user_id', storedUserId);
        }
        
        setUserId(storedUserId);
        
        // Cargar datos existentes del usuario
        const userRef = ref(db, `user_profile/${storedUserId}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setFormData(data);
          }
          setLoading(false);
        }, (error) => {
          console.error('Error loading user data:', error);
          setLoading(false);
        });
        
      } catch (error) {
        console.error('Error setting up user profile:', error);
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [db]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      alert('Error: No se pudo identificar tu usuario. Por favor, recarga la página.');
      return;
    }

    try {
      const userRef = ref(db, `user_profile/${userId}`);
      await set(userRef, {
        ...formData,
        userId: userId,
        lastUpdated: new Date().toISOString()
      });
      
      setIsSaved(true);
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

  if (loading) {
    return (
      <div className="profile-container">
        <div className="container">
          <div className="loading">Cargando perfil...</div>
        </div>
      </div>
    );
  }

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
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edad">Edad *</label>
                <input
                  type="number"
                  id="edad"
                  name="edad"
                  value={formData.edad}
                  onChange={handleInputChange}
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
                  value={formData.sexo}
                  onChange={handleInputChange}
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
                  value={formData.entidad}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="curp">CURP *</label>
              <input
                type="text"
                id="curp"
                name="curp"
                value={formData.curp}
                onChange={handleInputChange}
                required
                pattern="[A-Z0-9]{18}"
                title="Ingresa tu CURP (18 caracteres alfanuméricos)"
                maxLength="18"
                placeholder="ABCD123456EFGHIJ78"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Información Académica</h3>
            
            <div className="form-group">
              <label htmlFor="institucion">Institución Educativa *</label>
              <input
                type="text"
                id="institucion"
                name="institucion"
                value={formData.institucion}
                onChange={handleInputChange}
                required
                placeholder="Nombre de tu institución"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="programa">Programa educativo *</label>
                <select
                  id="programa"
                  name="programa"
                  value={formData.programa}
                  onChange={handleInputChange}
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
                  value={formData.semestre}
                  onChange={handleInputChange}
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
                  value={formData.turno}
                  onChange={handleInputChange}
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
                  value={formData.telefono}
                  onChange={handleInputChange}
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
                value={formData.email}
                onChange={handleInputChange}
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