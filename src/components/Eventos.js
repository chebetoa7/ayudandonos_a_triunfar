// src/components/Eventos.js - Versión completa corregida
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../config/firebase';
import './Eventos.css';

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [eventosFiltrados, setEventosFiltrados] = useState([]);
  const [sedeSeleccionada, setSedeSeleccionada] = useState('tamaulipas');
  const [sedeDisplay, setSedeDisplay] = useState('Tamaulipas');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Función para cargar eventos desde Firebase
  const loadEventosFromFirebase = (sede) => {
    if (!database) {
      console.warn('Firebase no disponible');
      setError(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const eventosRef = ref(database, 'eventos');
      
      onValue(eventosRef, (snapshot) => {
        const eventosData = snapshot.val();
        console.log('📦 Eventos desde Firebase para sede:', sede);
        
        if (eventosData) {
          const eventosArray = Object.entries(eventosData).map(([id, evento]) => ({
            id,
            ...evento
          })).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
          
          setEventos(eventosArray);
          filtrarEventos(eventosArray, sede);
          setError(false);
        } else {
          console.log('No hay eventos en Firebase');
          setEventos([]);
          setEventosFiltrados([]);
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

  const filtrarEventos = (eventosArray, sede) => {
    console.log('🔍 Filtrando eventos para sede:', sede);
    
    const filtrados = eventosArray.filter(evento => {
      const eventoSede = evento.sede ? evento.sede.toLowerCase() : '';
      
      if (eventoSede === 'todas') return true;
      if (eventoSede === sede.toLowerCase()) return true;
      if (!evento.sede && sede.toLowerCase() === 'tamaulipas') return true;
      
      return false;
    });
    
    console.log('✅ Eventos filtrados para', sede, ':', filtrados.length);
    setEventosFiltrados(filtrados);
  };

  useEffect(() => {
    // Obtener la sede del Header
    const savedSede = localStorage.getItem('selectedSede') || 'Tamaulipas';
    const savedSedeNormalized = savedSede.toLowerCase();
    
    console.log('🔍 Sede inicial:', savedSede, 'Normalizada:', savedSedeNormalized);
    
    setSedeSeleccionada(savedSedeNormalized);
    setSedeDisplay(savedSede);

    // Cargar eventos iniciales
    loadEventosFromFirebase(savedSedeNormalized);

    // Escuchar cambios de sede desde el Header
    const handleSedeChange = (event) => {
      if (event.detail && event.detail.sede) {
        const nuevaSede = event.detail.sede.toLowerCase();
        const nuevaSedeDisplay = event.detail.sede;
        
        console.log('🔄 Sede cambiada desde Header:', nuevaSede, 'Display:', nuevaSedeDisplay);
        
        setSedeSeleccionada(nuevaSede);
        setSedeDisplay(nuevaSedeDisplay);
        
        // Recargar eventos para la nueva sede
        loadEventosFromFirebase(nuevaSede);
      }
    };

    window.addEventListener('sedeChanged', handleSedeChange);

    return () => {
      window.removeEventListener('sedeChanged', handleSedeChange);
    };
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
          <p>Eventos para: <span className="sede-actual">{sedeDisplay}</span></p>
          <p className="info-sede">
            💡 Los eventos se filtran automáticamente según la sede seleccionada en el menú superior
          </p>
        </div>

        {error && (
          <div className="error-message">
            ⚠️ No se pudieron cargar los eventos. Por favor, intenta más tarde.
          </div>
        )}

        {eventosFiltrados.length === 0 && !error ? (
          <div className="no-eventos">
            <h3>No hay eventos disponibles para {sedeDisplay}</h3>
            <p>
              {sedeDisplay.toLowerCase().includes('tabasco') 
                ? "Próximamente agregaremos eventos específicos para Tabasco."
                : "Próximamente agregaremos nuevos eventos."
              }
            </p>
            {sedeDisplay.toLowerCase().includes('tabasco') && (
              <div className="info-adicional">
                <p>💡 Mientras tanto, puedes revisar los eventos de otras sedes.</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="eventos-info">
              <p>Mostrando {eventosFiltrados.length} evento{eventosFiltrados.length !== 1 ? 's' : ''} para {sedeDisplay}</p>
            </div>
            
            <div className="eventos-grid">
              {eventosFiltrados.map((evento) => (
                <EventoCard key={evento.id} evento={evento} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ... (EventoCard se mantiene igual)

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

  const getSedeColor = (sede) => {
    switch(sede) {
      case 'Tamaulipas': return '#2c5aa0';
      case 'Tabasco': return '#e63946';
      case 'Todas': return '#f8c537';
      default: return '#6c757d';
    }
  };

  const getSedeText = (sede) => {
    switch(sede) {
      case 'Tamaulipas': return 'Tamaulipas';
      case 'Tabasco': return 'Tabasco';
      case 'Todas': return 'Todas las sedes';
      default: return 'General';
    }
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
        
        {/* Badge de Sede */}
        {evento.sede && (
          <div 
            className="evento-sede-badge"
            style={{ backgroundColor: getSedeColor(evento.sede) }}
          >
            {getSedeText(evento.sede)}
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