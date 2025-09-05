// src/components/EMASurvey.js
import React, { useState, useEffect } from 'react';
import { ref, push, onValue } from 'firebase/database';
import './EMASurvey.css';

const EMASurvey = ({ db }) => {
  const [formData, setFormData] = useState({});
  const [userProfile, setUserProfile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Cargar perfil del usuario
  useEffect(() => {
    const userRef = ref(db, 'user_profile');
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUserProfile(data);
      }
    });
  }, [db]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const surveyRef = ref(db, 'ema_surveys');
      await push(surveyRef, {
        ...formData,
        userInfo: userProfile,
        timestamp: new Date().toISOString(),
        surveyType: 'EMA-D.D.A. Maestros'
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error al enviar la encuesta:', error);
      alert('Hubo un error al enviar tu encuesta. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preguntas de la encuesta EMA
  const sections = [
    {
      title: "Comportamientos de Hiperactividad/Impulsividad",
      questions: [
        "Está moviéndose de un lado para otro: nunca está quieto/a",
        "Cuando está sentado/a, se mueve mucho en su pupitre",
        "Habla mucho",
        "Cualquier cosa lo distrae",
        "Le cuesta concentrarse en cualquier actividad",
        "Cuando le habla, escucha, pero no hace caso",
        "No termina sus actividades, las abandona y busca otra",
        "Es brusco, se tropieza y golpea a menudo",
        "Si le preguntan algo, responde inmediatamente, sin pensar",
        "Interrumpe cuando alguien está haciendo algo o cuando están hablando",
        "Le cuesta trabajo realizar actividades que requieran pensar, reflexionar",
        "Si quiere algo, intenta conseguirlo de manera inmediata",
        "Hace cosas sin pensar en las consecuencias",
        "No tiene paciencia, es incapaz de esperar"
      ]
    },
    {
      title: "Comportamientos de Inatención",
      questions: [
        "Parece estar 'enfrascado/a en sus pensamientos' [pensativo/a, en las nubes]",
        "Es despistado/a, tarda en darse cuenta lo que ocurre alrededor",
        "Se mueve y hace las cosas lentamente, como si le faltara energía",
        "Se muestra descuidado/a, indiferente, sin interés por las cosas",
        "Es lento/a para hacer sus actividades en el salón de clases",
        "Tarda en comprender cuando se le explica algo",
        "Le cuesta darse cuenta de los detalles importantes de las cosas o situaciones"
      ]
    },
    {
      title: "Comportamientos de Oposicionismo/Agresividad",
      questions: [
        "Contesta de malos modos, a los maestros",
        "Protesta, cuando se le dice que haga algo",
        "Rompe cosas a propósito",
        "Le pega a los/as compañeros",
        "Quiere hacer inmediatamente lo que desea",
        "Grita, cuando se enoja",
        "Cambia bruscamente de humor",
        "Se enoja cuando no consigue lo que quiere",
        "Se pelea con los/as compañeros/as",
        "Dice mentiras",
        "Cuando se enoja, rompe cosas",
        "Quita cosas a sus compañeros/as",
        "Rompe o deteriora: muebles, paredes, libros, cuadernos sin motivo aparente"
      ]
    },
    {
      title: "Comportamientos de Ansiedad/Depresión",
      questions: [
        "Se resiste a participar en actividades de cualquier tipo",
        "Está triste en clase",
        "Dice que los maestros no lo/a quieren",
        "En el recreo, casa prefiere jugar solo/a",
        "Le cuesta hacer amigos",
        "Habla poco con sus maestros o compañeros/as",
        "Dice que sus amigos o compañeros/as no lo quieren",
        "Ante las provocaciones se calla y aguanta",
        "Dice que no vale nada",
        "Llora sin motivo aparente"
      ]
    },
    {
      title: "Síntomas de Ansiedad Fisiológica",
      questions: [
        "Se muerde las uñas",
        "Tiene tics nerviosos",
        "Le sudan las manos",
        "Habla agitada o entrecortadamente",
        "Respira fuertemente",
        "Tiene mareos, náuseas o vómitos"
      ]
    },
    {
      title: "Dificultades Académicas",
      questions: [
        "Se expresa verbalmente con dificultad",
        "Lee lentamente",
        "Tiene dificultades para expresarse por escrito",
        "Le cuesta comprender las instrucciones",
        "Dificultades para comprender lo que lee",
        "Tiene dificultades con las matemáticas",
        "Tiene bajo rendimiento escolar",
        "Se desanima ante las dificultades escolares",
        "Le cuesta trabajo hacer las actividades, en la escuela",
        "Su caligrafía es de mala calidad",
        "Cuadernos y libros están sucios, desordenados",
        "Se olvida de las tareas que le encargan"
      ]
    }
  ];

  const options = [
    { value: 'CN', label: 'CN: Nunca o casi nunca' },
    { value: 'PV', label: 'PV: Pocas veces' },
    { value: 'AM', label: 'AM: A menudo' },
    { value: 'CS', label: 'CS: Casi siempre' }
  ];

  if (isSubmitted) {
    return (
      <div className="survey-container">
        <div className="success-message">
          <h3>¡Encuesta EMA completada!</h3>
          <p>Gracias por tu participación en la evaluación de déficit de atención.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="survey-container">
      <div className="survey-intro">
        <h3>EMA-D.D.A. (Maestros)</h3>
        <p>Escalas Magallanes de Detección de Déficit de Atención (4-12 años)</p>
        <p>
          Este cuestionario consta de una lista de comportamientos que presenta el alumno en la escuela.
          Léalo con atención e indique con qué frecuencia ocurren las siguientes situaciones.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="survey-form">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="form-section">
            <h4>{section.title}</h4>
            
            {section.questions.map((question, questionIndex) => {
              const fieldName = `s${sectionIndex + 1}_q${questionIndex + 1}`;
              return (
                <div key={fieldName} className="symptom-group">
                  <label>{question}</label>
                  <div className="symptom-options">
                    {options.map(option => (
                      <label key={option.value} className="option-label">
                        <input
                          type="radio"
                          name={fieldName}
                          value={option.value}
                          checked={formData[fieldName] === option.value}
                          onChange={handleChange}
                          required
                        />
                        <span>{option.value}</span>
                        <small>{option.label.split(': ')[1]}</small>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar Encuesta EMA'}
        </button>
      </form>
    </div>
  );
};

export default EMASurvey;