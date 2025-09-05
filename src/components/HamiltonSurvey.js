// src/components/HamiltonSurvey.js
import React, { useState, useEffect  } from 'react';
import { ref, push, onValue  } from 'firebase/database';
import './HamiltonSurvey.css';

const HamiltonSurvey = ({ db }) => {
   const [formData, setFormData] = useState({
    // Síntomas - inicializados en 0
    sintoma1: '0', sintoma2: '0', sintoma3: '0', sintoma4: '0', sintoma5: '0',
    sintoma6: '0', sintoma7: '0', sintoma8: '0', sintoma9: '0', sintoma10: '0',
    sintoma11: '0', sintoma12: '0', sintoma13: '0', sintoma14: '0'
  });

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
      // Guardar en Firebase Realtime Database
      const surveyRef = ref(db, 'hamilton_surveys');
      await push(surveyRef, {
        ...formData,
        timestamp: new Date().toISOString(),
        totalScore: calculateTotalScore()
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error al enviar la encuesta:', error);
      alert('Hubo un error al enviar tu encuesta. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotalScore = () => {
    let total = 0;
    for (let i = 1; i <= 14; i++) {
      total += parseInt(formData[`sintoma${i}`] || 0);
    }
    return total;
  };

  const programasEducativos = [
    "Licenciatura en Ciencias de la Educación",
    "Licenciatura en Idiomas",
    "Licenciatura en Comunicación",
    "TSUM"
  ];

  if (isSubmitted) {
    return (
      <div className="survey-container">
        <div className="success-message">
          <h3>¡Gracias por completar la encuesta!</h3>
          <p>Tu participación es muy valiosa para nuestra investigación.</p>
          <p>Puntuación total: {calculateTotalScore()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="survey-container">
      <div className="survey-intro">
        <h3>Ansiedad-Hamilton</h3>
        <p>
          Estimado/a estudiante,<br/>
          Agradecemos su participación en esta encuesta. Su colaboración es fundamental para entender mejor este tema. 
        </p>
        {userProfile ? (
          <div className="user-info">
            <p><strong>Participante:</strong> {userProfile.nombre}</p>
          </div>
        ) : (
          <div className="warning-message">
            ⚠️ Completa tu <a href="/perfil">perfil</a> para agilizar el proceso de encuestas.
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="survey-form">
        {/* Información personal */}
       

        {/* Síntomas de ansiedad */}
        <div className="form-section">
          <h4>Escala de Ansiedad Hamilton</h4>
          <p>
            Indique la intensidad con que se cumplieron o no, durante el último mes, 
            los síntomas que se describen en cada uno de los 14 ítems: donde 
            0. Ausente 1. Intensidad ligera 2. Intensidad media 3. Intensidad elevada 4. Intensidad máxima (invalidante).
          </p>

          {[
            "1. Humor ansioso: Inquietud, expectativas de catástrofe, aprensión, anticipación temerosa, irritabilidad.",
            "2. Tensión: Sensaciones de tensión, fatigabilidad, imposibilidad de estar quieto, sobresalto, llanto fácil, temblores, sensaciones de incapacidad para esperar.",
            "3. Miedos: A la oscuridad, a los desconocidos, a quedarse solo, a los animales, a la circulación, a la multitud.",
            "4. Insomnio: Dificultades para conciliar el sueño, sueño interrumpido, sueño no satisfactorio, cansancio al despertar, sueños penosos, pesadillas, terrores nocturnos.",
            "5. Funciones Intelectuales (Cognitivas): Dificultad de concentración, mala memoria",
            "6. Humor depresivo: Pérdida de interés, no disfruta el tiempo libre, depresión, insomnio de madrugada, variaciones del estado de ánimo a lo largo del día.",
            "7. Síntomas somáticos musculares: Dolores musculares, rigidez muscular, sacudidas musculares, rechinar de dientes, voz quebrada.",
            "8. Síntomas somáticos generales: Zumbido de oídos, visión borrosa, oleadas de calor o frió, sensación de debilidad, sensaciones de pinchazos u hormigueos.",
            "9. Síntomas cardiovasculares: Taquicardia, palpitaciones, dolor en tórax, sensación pulsátil en vasos, sensaciones de 'baja presión' o desmayos.",
            "10. Síntomas respiratorios: Opresión o Constricción en tórax, sensación de ahogo o falta de aire, suspiros, dificultad para respirar.",
            "11. Síntomas gastrointestinales: Dificultades para evacuar, gases, dolores antes o después de comer, ardor, distensión abdominal, nauseas, vómitos, constricción epigástrica, cólicos, abdominales, diarrea, perdida de peso, estreñimiento",
            "12. Síntomas Genitourinarios y Sexuales: Micciones frecuentes, deseo incontenible de orinar, falta del período menstrual, hemorragia genital, frigidez, eyaculación precoz, impotencia, ausencia de erección.",
            "13. Síntomas del Sistema Nervioso Autónomo: Boca seca, accesos de enrojecimiento, palidez, tendencia a la sudoración, mareos, dolor de cabeza, de tensión.",
            "14. Conducta en el transcurso del test: Tendencia al abatimiento, manos inquietas, juega con los dedos, cierra los puños, tics, aprieta el pañuelo en las manos, inquietud: va y viene, temblor en las manos, rostro preocupado, aumento del tono muscular o contracturas musculares, respiración entrecortada, palidez facial, traga saliva, eructos, taquicardia o palpitaciones, ritmo respiratorio acelerado, sudoración, pestañeo."
          ].map((sintoma, index) => (
            <div key={index} className="symptom-group">
              <label>{sintoma}</label>
              <div className="symptom-options">
                {[0, 1, 2, 3, 4].map((value) => (
                  <label key={value} className="option-label">
                    <input
                      type="radio"
                      name={`sintoma${index + 1}`}
                      value={value}
                      checked={formData[`sintoma${index + 1}`] === value.toString()}
                      onChange={handleChange}
                      required
                    />
                    {value}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar Encuesta'}
        </button>
      </form>
    </div>
  );
};

export default HamiltonSurvey;