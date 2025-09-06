// src/utils/populateResources.js
import { ref, set } from 'firebase/database';

export const populateResources = (db) => {
  // Hospitales
  const hospitals = {
    hospital1: {
      nombre: "Hospital General de Tabasco",
      direccion: "Av. Universidad 100, Villahermosa",
      telefono: "993 123 4567",
      especialidad: "Salud mental y atención general",
      ubicacion: "Villahermosa"
    },
    hospital2: {
      nombre: "Centro de Salud Mental",
      direccion: "Calle Reforma 234, Centro",
      telefono: "993 765 4321",
      especialidad: "Psiquiatría y psicología",
      ubicacion: "Villahermosa"
    }
  };

  // Profesionales - Psicólogos
  const psychologists = {
    psicologo1: {
      nombre: "Dra. María González",
      especialidad: "Psicología clínica - Ansiedad y depresión",
      telefono: "993 555 1234",
      email: "maria.gonzalez@ejemplo.com",
      tipo: "psicologo"
    },
    psicologo2: {
      nombre: "Lic. Carlos Rodríguez",
      especialidad: "Terapia cognitivo-conductual",
      telefono: "993 555 5678",
      email: "carlos.rodriguez@ejemplo.com",
      tipo: "psicologo"
    }
  };

  // Recomendaciones por score
  const recommendations = {
    hamilton_low: {
      text: "Tu nivel de ansiedad es manejable. Te recomendamos:",
      actions: [
        "Practicar técnicas de relajación diaria",
        "Mantener una rutina de ejercicio regular",
        "Practicar mindfulness o meditación"
      ]
    },
    hamilton_medium: {
      text: "Experimentas ansiedad moderada. Sugerimos:",
      actions: [
        "Consultar con un psicólogo especializado",
        "Unirte a grupos de apoyo",
        "Aprender técnicas de manejo de estrés"
      ]
    },
    hamilton_high: {
      text: "Es importante buscar ayuda profesional. Recomendamos:",
      actions: [
        "Consulta con un psiquiatra lo antes posible",
        "Terapia psicológica regular",
        "Seguimiento médico continuo"
      ]
    }
  };

  // Guardar todos los recursos
  const saveResources = async () => {
    try {
      // Guardar hospitales
      await set(ref(db, 'resources/hospitals'), hospitals);
      
      // Guardar profesionales
      await set(ref(db, 'resources/professionals/psychologists'), psychologists);
      
      // Guardar recomendaciones
      await set(ref(db, 'resources/recommendations'), recommendations);
      
      console.log("Recursos guardados exitosamente!");
    } catch (error) {
      console.error("Error guardando recursos:", error);
    }
  };

  return saveResources();
};