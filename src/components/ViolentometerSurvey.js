// src/components/ViolentometerSurvey.js
import React, { useState, useEffect } from 'react';
import { ref, push, onValue } from 'firebase/database';
import './ViolentometerSurvey.css';

const ViolentometerSurvey = ({ db , sede }) => {
  const [formData, setFormData] = useState({
    supervision: '',
    jefaturaSector: '',
    ...Array.from({ length: 34 }, (_, i) => [`emocional_${i + 1}`, '']).reduce((acc, [key]) => {
      acc[key] = '';
      return acc;
    }, {}),
    ...Array.from({ length: 34 }, (_, i) => [`fisico_${i + 1}`, '']).reduce((acc, [key]) => {
      acc[key] = '';
      return acc;
    }, {})
  });

  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Cargar perfil del usuario
 useEffect(() => {
  const storedUserId = localStorage.getItem('user_id');
  if (storedUserId) {
    setUserId(storedUserId);
    const userRef = ref(db, `user_profile/${storedUserId}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUserProfile(data);
      }
    });
  }
}, [db]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userProfile || !userProfile.curp) {
      alert('Para esta encuesta, necesitas completar tu perfil con tu CURP primero.');
      return;
    }

    setIsSubmitting(true);

    try {
      // CAMBIA ESTA LÍNEA
      const surveyRef = ref(db, `sedes/${sede}/Encuestas/violentometro`);
      await push(surveyRef, {
        curp: userProfile.curp,
        escuela: userProfile.institucion,
        turno: userProfile.turno,
        supervision: formData.supervision,
        jefaturaSector: formData.jefaturaSector,
        ...formData,
        userId: userId,
        userInfo: userProfile,
        timestamp: new Date().toISOString(),
        surveyType: 'Violentómetro',
        promedioEmocional: calculateAverage('emocional'),
        promedioFisico: calculateAverage('fisico')
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error al enviar la encuesta:', error);
      alert('Hubo un error al enviar tu encuesta. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateAverage = (tipo) => {
    let total = 0;
    let count = 0;
    
    for (let i = 1; i <= 34; i++) {
      const value = parseInt(formData[`${tipo}_${i}`]);
      if (!isNaN(value)) {
        total += value;
        count++;
      }
    }
    
    return count > 0 ? (total / count).toFixed(2) : 0;
  };

  const preguntas = [
    "Te dicen palabras hirientes.",
    "Te amenazan con armas y objetos punzo cortantes.",
    "Te amenazan con secuestrarte o matarte.",
    "Te rechazan.",
    "Te golpean 'jugando'.",
    "Te golpean (pellizcan, arañan, patean, persiguen, empujan, jalonean, jalan el cabello).",
    "Te hacen bromas pesadas.",
    "Se burlan de ti.",
    "Te ponen apodos.",
    "Dicen mentiras sobre ti.",
    "Te hacen sentir avergonzado u ofendido.",
    "Te hacen sentir miedo.",
    "Te obligan a hacer cosas que no quieres.",
    "Te insultan por mensaje celular.",
    "Se ríen de ti.",
    "Te esconden cosas.",
    "Te aíslan.",
    "Te asustan.",
    "Te ignoran cuando les hablas.",
    "Te agreden con objetos.",
    "Te quitan cosas (dinero, libros, desayuno).",
    "Dicen chismes sobre ti.",
    "Te tocan en tus partes íntimas 'jugando'.",
    "Te tocan en tus partes íntimas.",
    "Te imitan, burlándose.",
    "Te ponen letreros en la espalda.",
    "No te hablan.",
    "Te maltratan, rompen tus cosas.",
    "Te acosan por e-mail, Facebook, Twitter, Instagram con vídeos o fotos tuyas.",
    "Te dicen groserías obscenas.",
    "Te encierran en el baño.",
    "Te culpan de algo que no hiciste.",
    "Te escupen.",
    "Te ridiculizan."
  ];

  const opciones = [1, 2, 3, 4, 5];

  if (isSubmitted) {
    return (
      <div className="survey-container">
        <div className="success-message">
          <h3>¡Encuesta del Violentómetro completada!</h3>
          <p>Gracias por tu participación en esta importante investigación.</p>
          <div className="results">
            <p>Promedio de daño emocional: {calculateAverage('emocional')}</p>
            <p>Promedio de daño físico: {calculateAverage('fisico')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="survey-container">
      <div className="survey-intro">
        <h3>Violentómetro</h3>
        <p>
          Estimado/a estudiante,<br/>
          Agradecemos su participación en esta encuesta. Su colaboración es fundamental para entender mejor este tema. 
        </p>
        
        {userProfile ? (
          <div className="user-info">
            <p><strong>Participante:</strong> {userProfile.nombre}</p>
            <p><strong>CURP:</strong> {userProfile.curp || 'No registrada'}</p>
            <p><strong>Escuela:</strong> {userProfile.institucion || 'No registrada'}</p>
            <p><strong>Turno:</strong> {userProfile.turno || 'No registrado'}</p>
            
            {!userProfile.curp && (
              <div className="warning-message">
                ⚠️ Para completar esta encuesta, necesitas agregar tu <strong>CURP</strong> en tu <a href="/perfil">perfil</a>.
              </div>
            )}
          </div>
        ) : (
          <div className="warning-message">
            ⚠️ Completa tu <a href="/perfil">perfil</a> para poder realizar esta encuesta.
          </div>
        )}
      </div>

      {!userProfile?.curp ? (
        <div className="profile-required">
          <h4>Perfil incompleto</h4>
          <p>Para realizar esta encuesta, necesitas completar tu información en el perfil, especialmente tu CURP.</p>
          <a href="/perfil" className="btn">Completar Perfil</a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="violentometer-form">
          {/* Solo campos específicos de esta encuesta */}
          <div className="form-section">
            <h4>Información Adicional</h4>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="supervision">Supervisión</label>
                <input
                  type="text"
                  id="supervision"
                  name="supervision"
                  value={formData.supervision}
                  onChange={handleChange}
                  placeholder="Zona escolar o supervisión"
                />
              </div>

              <div className="form-group">
                <label htmlFor="jefaturaSector">Jefatura de sector</label>
                <input
                  type="text"
                  id="jefaturaSector"
                  name="jefaturaSector"
                  value={formData.jefaturaSector}
                  onChange={handleChange}
                  placeholder="Jefatura de sector correspondiente"
                />
              </div>
            </div>
          </div>

          {/* Daño Emocional */}
          <div className="form-section">
            <h4>Daño Emocional</h4>
            <p className="instruction">
              Marca del uno al cinco (donde cinco es el nivel más alto y uno el más bajo), 
              de acuerdo a tu criterio, el grado de daño emocional que tienes por recibir 
              cualquiera de las siguientes situaciones:
            </p>

            {preguntas.map((pregunta, index) => (
              <div key={`emocional_${index + 1}`} className="question-group">
                <label className="question-text">
                  {index + 1}. {pregunta}
                </label>
                <div className="rating-options">
                  {opciones.map(opcion => (
                    <label key={opcion} className="rating-label">
                      <input
                        type="radio"
                        name={`emocional_${index + 1}`}
                        value={opcion}
                        checked={formData[`emocional_${index + 1}`] === opcion.toString()}
                        onChange={handleChange}
                        required
                      />
                      <span>{opcion}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Daño Físico */}
          <div className="form-section">
            <h4>Daño Físico</h4>
            <p className="instruction">
              Marca del uno al cinco (donde cinco es el nivel más alto y uno el más bajo), 
              de acuerdo a tu criterio, el grado de daño físico que tienes por recibir 
              cualquiera de las siguientes situaciones:
            </p>

            {preguntas.map((pregunta, index) => (
              <div key={`fisico_${index + 1}`} className="question-group">
                <label className="question-text">
                  {index + 1}. {pregunta}
                </label>
                <div className="rating-options">
                  {opciones.map(opcion => (
                    <label key={opcion} className="rating-label">
                      <input
                        type="radio"
                        name={`fisico_${index + 1}`}
                        value={opcion}
                        checked={formData[`fisico_${index + 1}`] === opcion.toString()}
                        onChange={handleChange}
                        required
                      />
                      <span>{opcion}</span>
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
      )}
    </div>
  );
};

export default ViolentometerSurvey;