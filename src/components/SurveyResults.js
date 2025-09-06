// src/components/SurveyResults.js
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import './SurveyResults.css';

const SurveyResults = ({ db, surveyType, score, userId }) => {
  const [resources, setResources] = useState({
    hospitals: [],
    professionals: [],
    recommendations: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      try {
        // Cargar hospitales
        const hospitalsRef = ref(db, 'resources/hospitals');
        onValue(hospitalsRef, (snapshot) => {
          const hospitalsData = snapshot.val();
          if (hospitalsData) {
            const hospitalsList = Object.values(hospitalsData);
            setResources(prev => ({ ...prev, hospitals: hospitalsList }));
          }
        });

        // Cargar profesionales según el tipo de encuesta
        let professionalType = 'psychologists';
        if (surveyType === 'Violentómetro') professionalType = 'social_workers';
        if (surveyType === 'EMA-D.D.A.') professionalType = 'educational_psychologists';

        const professionalsRef = ref(db, `resources/professionals/${professionalType}`);
        onValue(professionalsRef, (snapshot) => {
          const professionalsData = snapshot.val();
          if (professionalsData) {
            const professionalsList = Object.values(professionalsData);
            setResources(prev => ({ ...prev, professionals: professionalsList }));
          }
        });

        // Cargar recomendaciones según el score
        let scoreRange = 'low';
        if (score > 20) scoreRange = 'high';
        else if (score > 10) scoreRange = 'medium';

        const recommendationsRef = ref(db, `resources/recommendations/${surveyType.toLowerCase()}_${scoreRange}`);
        onValue(recommendationsRef, (snapshot) => {
          const recommendationsData = snapshot.val();
          if (recommendationsData) {
            setResources(prev => ({ ...prev, recommendations: recommendationsData }));
          }
          setLoading(false);
        });

      } catch (error) {
        console.error('Error loading resources:', error);
        setLoading(false);
      }
    };

    loadResources();
  }, [db, surveyType, score]);

  if (loading) {
    return <div className="loading-resources">Cargando recomendaciones...</div>;
  }

  return (
    <div className="survey-results">
      <h3>Resultados y Recomendaciones</h3>
      
      <div className="score-section">
        <h4>Tu puntuación: {score}</h4>
        <p className="score-interpretation">
          {getScoreInterpretation(surveyType, score)}
        </p>
      </div>

      <div className="recommendations-section">
        <h4>Recomendaciones</h4>
        <div className="recommendations-content">
          {resources.recommendations?.text && (
            <p>{resources.recommendations.text}</p>
          )}
          {resources.recommendations?.actions && (
            <ul>
              {resources.recommendations.actions.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {resources.professionals.length > 0 && (
        <div className="professionals-section">
          <h4>Profesionales que pueden ayudarte</h4>
          <div className="professionals-grid">
            {resources.professionals.map((professional, index) => (
              <div key={index} className="professional-card">
                <h5>{professional.nombre}</h5>
                <p>{professional.especialidad}</p>
                <p>📞 {professional.telefono}</p>
                {professional.email && <p>✉️ {professional.email}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {resources.hospitals.length > 0 && (
        <div className="hospitals-section">
          <h4>Centros de atención médica</h4>
          <div className="hospitals-grid">
            {resources.hospitals.map((hospital, index) => (
              <div key={index} className="hospital-card">
                <h5>{hospital.nombre}</h5>
                <p>📍 {hospital.direccion}</p>
                <p>📞 {hospital.telefono}</p>
                <p>{hospital.especialidad}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="emergency-contacts">
        <h4>📞 Contactos de emergencia</h4>
        <div className="emergency-grid">
          <div className="emergency-card">
            <h5>Línea de crisis</h5>
            <p>☎️ 800-123-4567</p>
            <p>Disponible 24/7</p>
          </div>
          <div className="emergency-card">
            <h5>Emergencias</h5>
            <p>☎️ 911</p>
            <p>Emergencias médicas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Función para interpretar los scores
const getScoreInterpretation = (surveyType, score) => {
  if (surveyType === 'Hamilton') {
    if (score <= 10) return 'Nivel de ansiedad mínimo.';
    if (score <= 20) return 'Nivel de ansiedad moderado.';
    return 'Nivel de ansiedad severo. Se recomienda atención profesional.';
  }
  if (surveyType === 'Violentómetro') {
    if (score <= 2.0) return 'Experiencias de violencia bajas.';
    if (score <= 3.5) return 'Experiencias de violencia moderadas.';
    return 'Experiencias de violencia altas. Es importante buscar ayuda.';
  }
  return 'Resultados de la evaluación.';
};

export default SurveyResults;