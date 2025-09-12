// src/components/QuienesSomos.js
import React from 'react';
import './QuienesSomos.css';

const QuienesSomos = () => {
  return (
    <div className="quienes-somos">
      <div className="container">
        <div className="quienes-somos-content">
          
          {/* Encabezado */}
          <div className="organization-header">
            <h1>“LA ORGANIZACIÓN”</h1>
            <h2>AYUDÁNDOLES A TRIUNFAR A.C. (ATAC)</h2>
            <h3>¿Quiénes somos?</h3>
          </div>

          {/* Sección 1: Descripción */}
          <section className="info-section">
            <p>
              Organización de la sociedad civil, fundada el 19 de mayo de 2005 por 
              <strong> Neri Marivel Cañas Aguilar</strong>, de naturaleza altruista, 
              asistencial y de desarrollo social, sin fines de lucro, dedicada a trabajar 
              con familias y grupos vulnerables.
            </p>
          </section>

          {/* Población Infantojuvenil */}
          <section className="population-section">
            <h3>👥 Población Infantojuvenil Escolarmente Vulnerable</h3>
            <div className="grid-2-columns">
              <div className="card">
                <h4>Necesidades Específicas de Apoyo Educativo (NEAE)</h4>
                <ul>
                  <li>Trastorno por déficit de atención o hiperactividad (TDAH)</li>
                  <li>Capacidades sobresalientes</li>
                  <li>Diversidad funcional (discapacidad)</li>
                </ul>
              </div>

              <div className="card">
                <h4>Riesgo Psicosocial</h4>
                <ul>
                  <li>Inadecuado ambiente familiar</li>
                  <li>Sexualidad mal orientada, promiscuidad</li>
                  <li>Hostigamiento, acoso y abuso sexual</li>
                  <li>Ausentismo, bajo rendimiento, deserción escolar</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Violencia y Problemáticas */}
          <section className="violence-section">
            <h3>🚫 Violencia en Todas sus Modalidades</h3>
            <div className="grid-3-columns">
              <div className="card">
                <h4>Tipos de Violencia</h4>
                <ul>
                  <li>Escolar y psicológica</li>
                  <li>Intrafamiliar y de género</li>
                  <li>Económica y emocional</li>
                  <li>Física, sexual y vicaria</li>
                  <li>Patrimonial</li>
                </ul>
              </div>

              <div className="card">
                <h4>Otras Problemáticas</h4>
                <ul>
                  <li>Consumo de sustancias adictivas</li>
                  <li>Autolesión (Cutting)</li>
                  <li>Ideas hasta intentos suicidas</li>
                  <li>Trastornos mentales (depresión, ansiedad)</li>
                </ul>
              </div>

              <div className="card">
                <h4>Discriminación</h4>
                <ul>
                  <li>Origen étnico o nacional</li>
                  <li>Género y edad</li>
                  <li>Discapacidades</li>
                  <li>Condición social y salud</li>
                  <li>Preferencias sexuales</li>
                  <li>Estado civil</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Población Vulnerable */}
          <section className="vulnerable-section">
            <h3>🛡️ Población Vulnerable por su Condición</h3>
            <div className="grid-2-columns">
              <div className="card">
                <h4>Condiciones de Vulnerabilidad</h4>
                <ul>
                  <li>Desventaja social o individual</li>
                  <li>Falta de redes de apoyo y seguridad social</li>
                  <li>Desprotección física, educativa, mental</li>
                  <li>Situación migratoria</li>
                  <li>Mujer en circunstancias especiales</li>
                  <li>Abandono e inseguridad pública</li>
                </ul>
              </div>

              <div className="card">
                <h4>Limitantes de Acceso</h4>
                <ul>
                  <li>Víctimas de delitos</li>
                  <li>Minoría de edad</li>
                  <li>Educación limitada y/o analfabetas</li>
                  <li>Acceso limitado a servicios</li>
                  <li>Hablantes de lengua materna</li>
                  <li>Escasos recursos económicos</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Misión, Visión y Valores */}
          <section className="mision-vision-valores">
            <h3>🎯 Nuestra Esencia</h3>
            <div className="grid-3-columns">
              <div className="card">
                <h4>🌟 Misión</h4>
                <p>
                  Trabajar con familias, población infantojuvenil escolarmente vulnerable 
                  y población en estado de vulnerabilidad, a través de actividades de 
                  asistencia y desarrollo social, fortalezas de carácter, desarrollo humano 
                  sustentable y comunitario.
                </p>
              </div>

              <div className="card">
                <h4>👁️ Visión</h4>
                <p>
                  Ser reconocida como la mejor opción para la atención a población 
                  infantojuvenil escolarmente vulnerable y población migrante. Liderar 
                  la promoción y defensa de los derechos humanos fundados en principios 
                  universales de humanismo, libertad y justicia social.
                </p>
              </div>

              <div className="card">
                <h4>💫 Valores</h4>
                <ul>
                  <li><strong>Dignidad:</strong> Respeto a la persona</li>
                  <li><strong>Justicia:</strong> Equidad e igualdad</li>
                  <li><strong>Integridad:</strong> Coherencia y honestidad</li>
                  <li><strong>Caridad:</strong> Amor al prójimo</li>
                  <li><strong>Libertad:</strong> Autonomía y derechos</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Servicios */}
          <section className="servicios-section">
            <h3>🛠️ Nuestros Servicios</h3>
            
            <div className="servicio-category">
              <h4>👦🏽 Población Infantojuvenil</h4>
              <ul>
                <li>Modelo de atención desarrollado por la A.C.</li>
                <li>Focalización de grupos de riesgo</li>
                <li>Seminarios, cursos, talleres y pláticas</li>
                <li>Terapias individuales y grupales</li>
                <li>Intervención con comunidad escolar</li>
                <li>Evaluaciones sociopsicopedagógicas</li>
                <li>Promoción de derechos humanos</li>
              </ul>
            </div>

            <div className="servicio-category">
              <h4>🤝 Población Vulnerable General</h4>
              <ul>
                <li>Becas, medicamentos y prótesis</li>
                <li>Necesidades básicas: alimentación, vestido, vivienda</li>
                <li>Útiles escolares, juguetes, alimentos</li>
                <li>Asistencia médica y rehabilitación</li>
                <li>Albergue y refugio temporal</li>
                <li>Apoyo jurídico, psicológico y social</li>
                <li>Desarrollo económico y empoderamiento</li>
              </ul>
            </div>

            <div className="servicio-category">
              <h4>🌎 Población Migrante</h4>
              <ul>
                <li>Coordinación con instituciones</li>
                <li>Albergues temporales y comedores comunitarios</li>
                <li>Servicios médicos y psicológicos</li>
                <li>Comunicación nacional e internacional</li>
                <li>Gestión de documentación (CURP, actas)</li>
                <li>Búsqueda de familiares</li>
                <li>Proyectos productivos y desarrollo social</li>
              </ul>
            </div>
          </section>

          {/* Patronato */}
          <section className="patronato-section">
            <h3>👥 Patronato</h3>
            <div className="card">
              <p>
                <strong>Presidenta del voluntariado y del patronato:</strong><br/>
                Neri Marivel Cañas Aguilar
              </p>
              <p>
                <strong>Suplente en Capítulo Tamaulipas:</strong><br/>
                Glady Edith Cañas Aguilar
              </p>
                <p>
                <strong>Aliado Institucional:</strong><br/>
                Ever J. Ruiz
                </p>
              <p>
                La organización labora con personal voluntario y es de carácter permanente.
              </p>
            </div>
          </section>

          {/* Contacto */}
          <section className="contacto-section">
            <h3>📞 Contacto</h3>
            <div className="contacto-info">
              <p>
                <strong>Email:</strong> contacto@ayudandolesatriunfar.org<br/>
                <strong>Teléfono:</strong> (834) 123-4567<br/>
                <strong>Dirección:</strong> Av. Principal #123, Ciudad, Tamaulipas
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default QuienesSomos;