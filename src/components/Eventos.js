// src/components/Eventos.js
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../config/firebase';
import './Eventos.css';

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadEventos = () => {
      if (!database) {
        console.warn('Firebase no disponible');
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const eventosRef = ref(database, 'eventos');
        
        onValue(eventosRef, (snapshot) => {
          const eventosData = snapshot.val();
          console.log('Eventos desde Firebase:', eventosData);
          
          if (eventosData) {
            // Convertir objeto a array y ordenar por fecha
            const eventosArray = Object.entries(eventosData).map(([id, evento]) => ({
              id,
              ...evento
            })).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            
            setEventos(eventosArray);
            setError(false);
          } else {
            console.log('No hay eventos en Firebase');
            setEventos([]);
          }
          setLoading(false);
        }, (error) => {
          console.warn('Error cargando eventos:', error);
          setError(true);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error inesperado:', error);
        setError(true);
        setLoading(false);
      }
    };

    loadEventos();
  }, []);

  if (loading) {
    return (
      <div className="eventos-container">
        <div className="loading">Cargando eventos...</div>
      </div>
    );
  }

  return (
    <div className="eventos-container">
      <div className="container">
        <div className="eventos-header">
          <h1>Eventos y Actividades</h1>
          <p>Conoce nuestras actividades recientes y próximos eventos</p>
        </div>

        {error && (
          <div className="error-message">
            ⚠️ No se pudieron cargar los eventos. Por favor, intenta más tarde.
          </div>
        )}

        {eventos.length === 0 && !error ? (
          <div className="no-eventos">
            <h3>Próximamente...</h3>
            <p>Estamos preparando nuevos eventos para ti.</p>
          </div>
        ) : (
          <div className="eventos-grid">
            {eventos.map((evento) => (
              <EventoCard key={evento.id} evento={evento} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const EventoCard = ({ evento }) => {
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-MX', options);
  };

  return (
    <div className="evento-card">
      <div className="evento-image">
        {evento.imagenes && evento.imagenes[0] ? (
          <img 
            src={evento.imagenes[0]} 
            alt={evento.titulo}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="evento-placeholder">
            <span>📷</span>
          </div>
        )}
      </div>

      <div className="evento-content">
        <h3>{evento.titulo}</h3>
        
        {evento.fecha && (
          <div className="evento-fecha">
            <span>📅 {formatDate(evento.fecha)}</span>
          </div>
        )}

        {evento.lugar && (
          <div className="evento-lugar">
            <span>📍 {evento.lugar}</span>
          </div>
        )}

        <div className="evento-descripcion">
          <p>{evento.descripcion}</p>
        </div>

        {evento.imagenes && evento.imagenes.length > 1 && (
          <div className="evento-galeria">
            <small>+{evento.imagenes.length - 1} fotos más</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default Eventos;