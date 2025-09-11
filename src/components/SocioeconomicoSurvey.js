import React, { useState, useEffect } from 'react';
import { ref, push } from 'firebase/database';

const SocioeconomicoSurvey = ({ db, sede }) => {
  const [formData, setFormData] = useState({
    // Información de la escuela
    nombreEscuela: '',
    nivelEscuela: '',
    claveEscuela: '',
    direccionEscuela: '',
    
    // Información del alumno (complementaria al perfil)
    nombreAlumno: '',
    sexoAlumno: '',
    curpAlumno: '',
    grado: '',
    grupo: '',
    zonaEscolar: '',
    sector: '',
    
    // Dirección del alumno
    direccionAlumno: '',
    numExterior: '',
    numInterior: '',
    codigoPostal: '',
    colonia: '',
    localidad: '',
    entidadFederativa: '',
    
    // Sección 1: Padres/tutores
    nombrePadresTutores: '',
    
    // Sección 2: Jefe de familia
    jefeFamilia: '',
    jefeFamiliaEspecificar: '',
    nacionalidadJefe: '',
    lugarNacimientoJefe: '',
    poblacionIndigenaJefe: '',
    lenguaIndigenaJefe: '',
    religionJefe: '',
    edadJefe: '',
    estadoCivilJefe: '',
    relacionPareja: [],
    personasDependen: '',
    apoyoTareas: '',
    apoyoTareasPorque: '',
    edadPadreTutor: '',
    escolaridadPadreTutor: '',
    escolaridadEstado: '',
    
    // Sección 3: Estudiantes en casa (primer estudiante - el alumno)
    sexoEstudiante: '',
    edadEstudiante: '',
    escolaridadEstudiante: '',
    escolaridadEstadoEst: '',
    nacionalidadEstudiante: '',
    lugarNacimientoEst: '',
    poblacionIndigenaEst: '',
    lenguaIndigenaEst: '',
    religionEstudiante: '',
    escuelasEstudiadas: '',
    lugarFamilia: '',
    programasBecas: [],
    pensionado: '',
    trabajoEventual: '',
    faltasTrabajo: '',
    faltasEscuela: '',
    asisteEscuela: '',
    reprobado: '',
    seguridadSocial: [],
    enfermedad: '',
    discapacidad: '',
    adicciones: [],
    situaciones: [],
    situacionesAlimentacion: [],
    
    // Secciones 4, 5, 6 (estructuras similares para otros miembros)
    // ... (se implementarán campos similares para otras secciones)
    
    // Sección 6: Gastos familiares
    gastoAlimentacion: '',
    gastoRenta: '',
    gastoServicios: '',
    gastoEscuela: '',
    gastoRopa: '',
    gastoTransporte: '',
    gastoDiversion: '',
    gastoOtro: '',
    recursosFamilia: [],
    
    // Sección 7: Corrección
    correccion: [],
    frecuenciaCorreccion: '',
    
    // Sección 8: Vivienda
    tipoVivienda: '',
    tipoPropiedad: '',
    tipoPropiedadEspecificar: '',
    tipoConstruccion: '',
    tipoTecho: '',
    tipoPiso: '',
    tipoPared: '',
    personasVivienda: '',
    caracteristicasVivienda: {
      cuartos: '',
      banos: '',
      comedor: false,
      sala: false,
      cocina: false,
      ventanas: '',
      llavesAgua: '',
      focos: ''
    },
    serviciosVivienda: [],
    aguaOrigen: '',
    luzSolucion: '',
    bienesVivienda: [],
    cercaniaVivienda: [],
    cercaniaEscuela: [],
    ubicacionVivienda: [],
    transporteAcceso: [],
    transporteEscuela: [],
    distanciaEscuela: '',
    accesoLectura: '',
    
    // Sección 9-10: Transporte
    viajeEscuela: '',
    transporteEscuelaTipo: [],
    transportePropioTipo: [],
    
    // Sección 11: Datos físicos y alimentación
    peso: '',
    talla: '',
    edadMeses: '',
    medidaCintura: '',
    medidaBrazo: '',
    imc: '',
    porcentajeGrasa: '',
    musculo: '',
    kcal: '',
    edadMetabolica: '',
    grasaVisceral: '',
    desayuno: [],
    entreDesayunoComida: [],
    comida: [],
    entreComidaCena: [],
    cena: []
  });

  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);

  // Cargar perfil del usuario
  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
      const userData = JSON.parse(localStorage.getItem('user_data'));
      if (userData) {
        setUserProfile(userData);
        // Prellenar datos del perfil
        setFormData(prev => ({
          ...prev,
          nombreAlumno: userData.nombre || '',
          curpAlumno: userData.curp || '',
          entidadFederativa: userData.entidad || ''
        }));
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name.includes('[]')) {
        const fieldName = name.replace('[]', '');
        setFormData(prev => {
          const currentArray = prev[fieldName] || [];
          if (checked) {
            return { ...prev, [fieldName]: [...currentArray, value] };
          } else {
            return { ...prev, [fieldName]: currentArray.filter(item => item !== value) };
          }
        });
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? '' : Number(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayChange = (fieldName, value, checked) => {
    setFormData(prev => {
      const currentArray = prev[fieldName] || [];
      if (checked) {
        return { ...prev, [fieldName]: [...currentArray, value] };
      } else {
        return { ...prev, [fieldName]: currentArray.filter(item => item !== value) };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const surveyRef = ref(db, 'socioeconomico_surveys');
      await push(surveyRef, {
        ...formData,
        userId: userId,
        userInfo: userProfile,
        sede: sede,
        timestamp: new Date().toISOString(),
        surveyType: 'Cuestionario Socioeconómico'
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error al enviar la encuesta:', error);
      alert('Hubo un error al enviar tu encuesta. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextSection = () => {
    setCurrentSection(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevSection = () => {
    setCurrentSection(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  if (isSubmitted) {
    return (
      <div className="survey-container">
        <div className="success-message">
          <h3>¡Encuesta Socioeconómica completada!</h3>
          <p>Gracias por proporcionar información socioeconómica para nuestra investigación.</p>
          <p><strong>Sede:</strong> {sede}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="survey-container socioeconomico-container">
      <div className="survey-intro">
        <h3>Cuestionario Socioeconómico - {sede}</h3>
        <p>Evaluación de condiciones socioeconómicas familiares</p>
        <div className="progress-bar">
          <div className="progress" style={{width: `${(currentSection/11)*100}%`}}></div>
        </div>
        <p>Sección {currentSection} de 11</p>
        
        {userProfile && (
          <div className="user-info">
            <p><strong>Evaluador:</strong> {userProfile.nombre}</p>
            <p><strong>Sede:</strong> {sede}</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="survey-form socioeconomico-form">
        {/* Sección 1: Información de la escuela */}
        {currentSection === 1 && (
          <div className="form-section">
            <h4>1. Información de la Escuela</h4>
            
            <div className="form-group">
              <label>Nombre de la Escuela *</label>
              <input
                type="text"
                name="nombreEscuela"
                value={formData.nombreEscuela}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Nivel *</label>
                <select
                  name="nivelEscuela"
                  value={formData.nivelEscuela}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="Preescolar">Preescolar</option>
                  <option value="Primaria">Primaria</option>
                  <option value="Secundaria">Secundaria</option>
                  <option value="Media Superior">Media Superior</option>
                  <option value="Superior">Superior</option>
                </select>
              </div>

              <div className="form-group">
                <label>Clave de la escuela *</label>
                <input
                  type="text"
                  name="claveEscuela"
                  value={formData.claveEscuela}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Dirección de la escuela *</label>
              <textarea
                name="direccionEscuela"
                value={formData.direccionEscuela}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>
          </div>
        )}

        {/* Sección 2: Información del alumno */}
        {currentSection === 2 && (
          <div className="form-section">
            <h4>2. Información del Alumno</h4>
            
            <div className="form-group">
              <label>Nombre del alumno *</label>
              <input
                type="text"
                name="nombreAlumno"
                value={formData.nombreAlumno}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Sexo *</label>
                <select
                  name="sexoAlumno"
                  value={formData.sexoAlumno}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="Hombre">Hombre</option>
                  <option value="Mujer">Mujer</option>
                </select>
              </div>

              <div className="form-group">
                <label>CURP *</label>
                <input
                  type="text"
                  name="curpAlumno"
                  value={formData.curpAlumno}
                  onChange={handleChange}
                  required
                  pattern="[A-Z0-9]{18}"
                  title="Ingresa CURP válido (18 caracteres)"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Grado *</label>
                <input
                  type="text"
                  name="grado"
                  value={formData.grado}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Grupo *</label>
                <input
                  type="text"
                  name="grupo"
                  value={formData.grupo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Zona escolar</label>
                <input
                  type="text"
                  name="zonaEscolar"
                  value={formData.zonaEscolar}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Sector</label>
                <input
                  type="text"
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}

        {/* Sección 3: Dirección del alumno */}
        {currentSection === 3 && (
          <div className="form-section">
            <h4>3. Dirección del Alumno</h4>
            
            <div className="form-group">
              <label>Dirección *</label>
              <textarea
                name="direccionAlumno"
                value={formData.direccionAlumno}
                onChange={handleChange}
                rows="2"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Número Exterior</label>
                <input
                  type="text"
                  name="numExterior"
                  value={formData.numExterior}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Número Interior</label>
                <input
                  type="text"
                  name="numInterior"
                  value={formData.numInterior}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Código Postal *</label>
                <input
                  type="text"
                  name="codigoPostal"
                  value={formData.codigoPostal}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{5}"
                  title="Código Postal de 5 dígitos"
                />
              </div>

              <div className="form-group">
                <label>Colonia *</label>
                <input
                  type="text"
                  name="colonia"
                  value={formData.colonia}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Localidad *</label>
                <input
                  type="text"
                  name="localidad"
                  value={formData.localidad}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Entidad federativa *</label>
                <input
                  type="text"
                  name="entidadFederativa"
                  value={formData.entidadFederativa}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Las siguientes secciones continuarían aquí... */}
        {/* Se implementarían las secciones 4-11 de manera similar */}

        <div className="navigation-buttons">
          {currentSection > 1 && (
            <button type="button" onClick={prevSection} className="nav-button prev">
              Anterior
            </button>
          )}
          
          {currentSection < 11 ? (
            <button type="button" onClick={nextSection} className="nav-button next">
              Siguiente
            </button>
          ) : (
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Finalizar Encuesta'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SocioeconomicoSurvey;