// src/components/SurveyMenu.js
/*import React from 'react';
import { Link } from 'react-router-dom';
import './SurveyMenu.css';

const SurveyMenu = () => {
  const surveys = [
    {
      id: 'hamilton',
      title: 'Escala de Ansiedad Hamilton',
      description: 'Evaluación de síntomas de ansiedad en adultos',
      icon: '📊',
      time: '15 min'
    },
    {
      id: 'ema',
      title: 'EMA-D.D.A. (Maestros)',
      description: 'Escalas Magallanes de Detección de Déficit de Atención (4-12 años)',
      icon: '👨‍🏫',
      time: '20 min'
    },
    {
      id: 'violentometro',
      title: 'Violentómetro',
      description: 'Evaluación de situaciones de violencia y su impacto emocional/físico',
      icon: '⚠️',
      time: '25 min'
    }
  ];

  return (
    <div className="survey-menu">
      <div className="survey-grid">
        {surveys.map(survey => (
          <div key={survey.id} className="survey-card">
            <div className="survey-icon">{survey.icon}</div>
            <h3>{survey.title}</h3>
            <p>{survey.description}</p>
            <div className="survey-meta">
              <span className="survey-time">⏱️ {survey.time}</span>
            </div>
            <Link to={`/encuesta/${survey.id}`} className="btn">
              Comenzar Encuesta
            </Link>
          </div>
        ))}
      </div>
      
      <div className="survey-info">
        <p>💡 Antes de comenzar, asegúrate de tener tu <Link to="/perfil">perfil completo</Link> para agilizar el proceso.</p>
      </div>
    </div>
  );
};

export default SurveyMenu;  */

// src/components/SurveyMenu.js
/*import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../config/firebase';
import './SurveyMenu.css';

const SurveyMenu = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sede, setSede] = useState('tamaulipas');
  const [firebaseError, setFirebaseError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const loadSedeAndSurveys = () => {
      const savedSede = localStorage.getItem('selectedSede') || 'tamaulipas';
      setSede(savedSede);
      loadSurveys(savedSede);
    };

    loadSedeAndSurveys();
  }, []);

  const loadSurveys = (currentSede) => {
    if (!database) {
      console.warn('Firebase no disponible, usando encuestas por defecto');
      setFirebaseError(true);
      const defaultSurveys = getDefaultSurveys(currentSede);
      setSurveys(defaultSurveys);
      setLoading(false);
      return;
    }

    try {
      const surveysRef = ref(database, `resources/sedes/${currentSede}/Encuestas`);
      
      onValue(surveysRef, (snapshot) => {
        const surveysData = snapshot.val();
        console.log('📊 Datos de Firebase:', surveysData);
        
        let surveysArray = [];
        
        if (surveysData) {
          // CONVERTIR a array sin importar el formato
          if (Array.isArray(surveysData)) {
            surveysArray = surveysData;
          } else if (typeof surveysData === 'object') {
            surveysArray = Object.values(surveysData);
          }
        }

        console.log('🔄 Encuestas convertidas a array:', surveysArray);

        if (surveysArray.length > 0) {
          const availableSurveys = surveysArray
            .map(surveyId => {
              console.log('🔍 Procesando encuesta ID:', surveyId);
              return getSurveyDetails(surveyId, currentSede);
            })
            .filter(survey => survey !== null && survey.available);
          
          console.log('✅ Encuestas disponibles:', availableSurveys);
          setSurveys(availableSurveys);
          setFirebaseError(false);
        } else {
          console.log('📝 No hay encuestas en Firebase, usando defaults');
          const defaultSurveys = getDefaultSurveys(currentSede);
          console.log('📋 Encuestas por defecto:', defaultSurveys);
          setSurveys(defaultSurveys);
        }
        setLoading(false);
      }, (error) => {
        console.warn('❌ Error cargando encuestas de Firebase:', error);
        setFirebaseError(true);
        const defaultSurveys = getDefaultSurveys(currentSede);
        setSurveys(defaultSurveys);
        setLoading(false);
      });
    } catch (error) {
      console.error('💥 Error inesperado:', error);
      setFirebaseError(true);
      const defaultSurveys = getDefaultSurveys(currentSede);
      setSurveys(defaultSurveys);
      setLoading(false);
    }
  };

  // DEBUG: Función mejorada para ver qué está pasando
  const getSurveyDetails = (surveyId, currentSede) => {
    console.log('🎯 Buscando detalles para:', surveyId);
    
    // Mapeo DIRECTO con los valores exactos de Firebase
    const surveyMap = {
      'EMA': {
        id: 'ema',
        title: 'EMA-D.D.A. (Maestros)',
        description: 'Escalas Magallanes de Detección de Déficit de Atención (4-12 años)',
        icon: '👨‍🏫',
        time: '20 min',
        available: true,
        sede: currentSede
      },
      'Hamilton': {
        id: 'hamilton',
        title: 'Escala de Ansiedad Hamilton',
        description: 'Evaluación de síntomas de ansiedad en adultos',
        icon: '📊',
        time: '15 min',
        available: true,
        sede: currentSede
      },
      'Socioeconómico': {
        id: 'socioeconomico',
        title: 'Cuestionario Socioeconómico',
        description: 'Evaluación de condiciones socioeconómicas familiares',
        icon: '🏠',
        time: '10 min',
        available: currentSede === 'tabasco',
        sede: currentSede
      }
    };

    const survey = surveyMap[surveyId];
    console.log('📄 Resultado búsqueda:', surveyId, '→', survey);
    
    return survey || null;
  };

  // DEBUG: Función por defecto mejorada
  const getDefaultSurveys = (currentSede) => {
    console.log('🏠 Generando encuestas por defecto para:', currentSede);
    
    // ¡Asegurar que siempre devuelve un ARRAY!
    const defaultSurveys = [
      {
        id: 'ema',
        title: 'EMA-D.D.A. (Maestros)',
        description: 'Escalas Magallanes de Detección de Déficit de Atención (4-12 años)',
        icon: '👨‍🏫',
        time: '20 min',
        available: true,
        sede: currentSede
      },
      {
        id: 'hamilton',
        title: 'Escala de Ansiedad Hamilton',
        description: 'Evaluación de síntomas de ansiedad en adultos',
        icon: '📊',
        time: '15 min',
        available: true,
        sede: currentSede
      }
    ];

    if (currentSede === 'tabasco') {
      defaultSurveys.push({
        id: 'socioeconomico',
        title: 'Cuestionario Socioeconómico',
        description: 'Evaluación de condiciones socioeconómicas familiares',
        icon: '🏠',
        time: '10 min',
        available: true,
        sede: currentSede
      });
    }

    console.log('🔢 Encuestas por defecto:', defaultSurveys);
    return defaultSurveys; // ← ¡Esto es un array!
  };

  if (loading) {
    return (
      <div className="survey-menu">
        <div className="loading">Cargando encuestas...</div>
      </div>
    );
  }

  // DEBUG: Asegurar que surveys es array
  console.log('🎲 Surveys final:', surveys);
  console.log('📌 Tipo de surveys:', typeof surveys);
  console.log('🔢 Es array?', Array.isArray(surveys));

  const safeSurveys = Array.isArray(surveys) ? surveys : [];

  return (
    <div className="survey-menu">
      <div className="survey-header">
        <h2>Encuestas Disponibles</h2>
        <p className="sede-indicator">
          Sede: <span className="sede-name">{sede}</span>
        </p>
        
        {firebaseError && (
          <div className="warning-message">
            ⚠️ No se pudo conectar con Firebase. Mostrando encuestas por defecto.
          </div>
        )}
      </div>

      <div className="survey-grid">
        {safeSurveys.map(survey => (
          <div key={survey.id} className="survey-card">
            <div className="survey-icon">{survey.icon}</div>
            <h3>{survey.title}</h3>
            <p>{survey.description}</p>
            <div className="survey-meta">
              <span className="survey-time">⏱️ {survey.time}</span>
            </div>
            
            <Link 
              to={`/encuesta/${survey.id}`} 
              state={{ 
                from: location.pathname, 
                sede: survey.sede
              }}
              className="btn"
            >
              Comenzar Encuesta
            </Link>
          </div>
        ))}
      </div>
      
      <div className="survey-info">
        <p>💡 Antes de comenzar, asegúrate de tener tu <Link to="/perfil">perfil completo</Link> para agilizar el proceso.</p>
      </div>
    </div>
  );
};

export default SurveyMenu;*/


// src/components/SurveyMenu.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../config/firebase';
import './SurveyMenu.css';

const SurveyMenu = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sede, setSede] = useState('tamaulipas');
  const [firebaseError, setFirebaseError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const loadSedeAndSurveys = () => {
      const savedSede = localStorage.getItem('selectedSede') || 'tamaulipas';
      setSede(savedSede);
      loadSurveys(savedSede);
    };

    loadSedeAndSurveys();
  }, []);

  const loadSurveys = (currentSede) => {
    if (!database) {
      console.warn('Firebase no disponible, usando encuestas por defecto');
      setFirebaseError(true);
      const defaultSurveys = getDefaultSurveys(currentSede);
      setSurveys(defaultSurveys);
      setLoading(false);
      return;
    }

    try {
      const surveysRef = ref(database, `resources/sedes/${currentSede}/Encuestas`);
      
      onValue(surveysRef, (snapshot) => {
        const surveysData = snapshot.val();
        console.log('Datos de Firebase:', surveysData);
        
        let surveysArray = [];
        
        if (surveysData) {
          // CONVERTIR a array sin importar el formato
          if (Array.isArray(surveysData)) {
            // Si ya es un array
            surveysArray = surveysData;
          } else if (typeof surveysData === 'object') {
            // Si es objeto {0: "EMA", 1: "Hamilton"}
            surveysArray = Object.values(surveysData);
          } else {
            // Si es otro formato
            console.warn('Formato inesperado de Firebase:', surveysData);
            surveysArray = [];
          }
        }

        if (surveysArray.length > 0) {
          const availableSurveys = surveysArray
            .map(surveyId => getSurveyDetails(surveyId, currentSede))
            .filter(survey => survey !== null && survey.available);
          
          console.log('Encuestas disponibles:', availableSurveys);
          setSurveys(availableSurveys);
          setFirebaseError(false);
        } else {
          console.log('No hay encuestas en Firebase, usando defaults');
          const defaultSurveys = getDefaultSurveys(currentSede);
          setSurveys(defaultSurveys);
        }
        setLoading(false);
      }, (error) => {
        console.warn('Error cargando encuestas de Firebase:', error);
        setFirebaseError(true);
        const defaultSurveys = getDefaultSurveys(currentSede);
        setSurveys(defaultSurveys);
        setLoading(false);
      });
    } catch (error) {
      console.error('Error inesperado:', error);
      setFirebaseError(true);
      const defaultSurveys = getDefaultSurveys(currentSede);
      setSurveys(defaultSurveys);
      setLoading(false);
    }
  };

  // Función que convierte cualquier surveyId a minúsculas para búsqueda
  const getSurveyDetails = (surveyId, currentSede) => {
    // Normalizar el surveyId (convertir a minúsculas y quitar acentos)
    const normalizedId = surveyId.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    const surveyDetails = {
      'hamilton': {
        id: 'hamilton',
        title: 'Escala de Ansiedad Hamilton',
        description: 'Evaluación de síntomas de ansiedad en adultos',
        icon: '📊',
        time: '15 min',
        available: true,
        sede: currentSede
      },
      'ema': {
        id: 'ema',
        title: 'EMA-D.D.A. (Maestros)',
        description: 'Escalas Magallanes de Detección de Déficit de Atención (4-12 años)',
        icon: '👨‍🏫',
        time: '20 min',
        available: true,
        sede: currentSede
      },
      'socioeconomico': { // ← Sin acento para la búsqueda
        id: 'socioeconomico',
        title: 'Cuestionario Socioeconómico',
        description: 'Evaluación de condiciones socioeconómicas familiares',
        icon: '🏠',
        time: '10 min',
        available: true,
        sede: currentSede
      }
    };

    console.log('Buscando encuesta:', surveyId, '→ Normalizado:', normalizedId);
    
    return surveyDetails[normalizedId] || null;
  };

  // Encuestas por defecto según la sede
  const getDefaultSurveys = (currentSede) => {
    const baseSurveys = [
      {
        id: 'hamilton',
        title: 'Escala de Ansiedad Hamilton',
        description: 'Evaluación de síntomas de ansiedad en adultos',
        icon: '📊',
        time: '15 min',
        available: true,
        sede: currentSede
      },
      {
        id: 'ema',
        title: 'EMA-D.D.A. (Maestros)',
        description: 'Escalas Magallanes de Detección de Déficit de Atención (4-12 años)',
        icon: '👨‍🏫',
        time: '20 min',
        available: true,
        sede: currentSede
      },
      {
        id: 'socioeconomico',
        title: 'Cuestionario Socioeconómico',
        description: 'Evaluación de condiciones socioeconómicas familiares',
        icon: '🏠',
        time: '10 min',
        available: true,
        sede: currentSede
      }
    ];

    /*if (currentSede === 'tabasco') {
      baseSurveys.push({
        id: 'socioeconomico',
        title: 'Cuestionario Socioeconómico',
        description: 'Evaluación de condiciones socioeconómicas familiares',
        icon: '🏠',
        time: '10 min',
        available: true,
        sede: currentSede
      });
    }*/

    return baseSurveys;
  };

  if (loading) {
    return (
      <div className="survey-menu">
        <div className="loading">Cargando encuestas...</div>
      </div>
    );
  }

  // Asegurar que surveys siempre sea un array
  const safeSurveys = Array.isArray(surveys) ? surveys : [];

  return (
    <div className="survey-menu">
      <div className="survey-header">
        <h2>Encuestas Disponibles</h2>
        <p className="sede-indicator">
          Sede: <span className="sede-name">{sede}</span>
        </p>
        
        {firebaseError && (
          <div className="warning-message">
            ⚠️ No se pudo conectar con Firebase. Mostrando encuestas por defecto.
          </div>
        )}
      </div>

      <div className="survey-grid">
        {safeSurveys.map(survey => (
          <div key={survey.id} className={`survey-card ${!survey.available ? 'survey-disabled' : ''}`}>
            <div className="survey-icon">{survey.icon}</div>
            <h3>{survey.title}</h3>
            <p>{survey.description}</p>
            <div className="survey-meta">
              <span className="survey-time">⏱️ {survey.time}</span>
              {!survey.available && <span className="survey-unavailable">Próximamente</span>}
            </div>
            
            {survey.available ? (
              <Link 
                to={`/encuesta/${survey.id}`} 
                state={{ 
                  from: location.pathname, 
                  sede: survey.sede
                }}
                className="btn"
              >
                Comenzar Encuesta
              </Link>
            ) : (
              <button className="btn btn-disabled" disabled>
                No disponible
              </button>
            )}
          </div>
        ))}
      </div>
      
      <div className="survey-info">
        <p>💡 Antes de comenzar, asegúrate de tener tu <Link to="/perfil">perfil completo</Link> para agilizar el proceso.</p>
      </div>
    </div>
  );
};

export default SurveyMenu;