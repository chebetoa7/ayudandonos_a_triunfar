// src/App.js
/*import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import SurveyMenu from './components/SurveyMenu';
import HamiltonSurvey from './components/HamiltonSurvey';
import EMASurvey from './components/EMASurvey';
import ViolentometerSurvey from './components/ViolentometerSurvey'; 
import UserProfile from './components/UserProfile';
import { database } from './config/firebase';
import { populateResources } from './utils/populateResources';
import './App.css';

// Página de inicio
function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
    </main>
  );
}

// Página de encuestas
function SurveysPage() {
  return (
    <main>
      <section className="surveys-section">
        <div className="container">
          <h2>Encuestas Disponibles</h2>
          <p>Selecciona una encuesta para participar en nuestra investigación</p>
          <SurveyMenu />
        </div>
      </section>
    </main>
  );
}

// Componente principal
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/encuestas" element={<SurveysPage />} />
          <Route path="/perfil" element={<UserProfile db={database} />} />
          <Route path="/encuesta/hamilton" element={<HamiltonSurvey db={database} />} />
          <Route path="/encuesta/ema" element={<EMASurvey db={database} />} />
          <Route path="/encuesta/violentometro" element={<ViolentometerSurvey db={database} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App; */

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import SurveyMenu from './components/SurveyMenu';
import HamiltonSurvey from './components/HamiltonSurvey';
import EMASurvey from './components/EMASurvey';
import ViolentometerSurvey from './components/ViolentometerSurvey'; 
import SocioeconomicoSurvey from './components/SocioeconomicoSurvey';
import UserProfile from './components/UserProfile';
import { database } from './config/firebase';
import './App.css';

// Página de inicio
function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
    </main>
  );
}

// Componente principal
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Ruta de encuestas */}
          <Route 
            path="/encuestas" 
            element={
              <main>
                <section className="surveys-section">
                  <div className="container">
                    <h2>Encuestas Disponibles</h2>
                    <p>Selecciona una encuesta para participar en nuestra investigación</p>
                    <SurveyMenu />
                  </div>
                </section>
              </main>
            } 
          />
          
          <Route path="/perfil" element={<UserProfile db={database} />} />
          <Route path="/encuesta/hamilton" element={<HamiltonSurvey db={database} />} />
          <Route path="/encuesta/ema" element={<EMASurvey db={database} />} />
          <Route path="/encuesta/violentometro" element={<ViolentometerSurvey db={database} />} />
          <Route path="/encuesta/socioeconomico" element={<SocioeconomicoSurvey db={database} />} /> 
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;