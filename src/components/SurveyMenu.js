// src/components/SurveyMenu.js
import React from 'react';
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

export default SurveyMenu;