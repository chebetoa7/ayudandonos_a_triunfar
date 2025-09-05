// src/components/Hero.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './Hero.css';

const HeroSection = styled.section`
  background: linear-gradient(135deg, #4F46E5 0%, #7E22CE 100%);
  color: white;
  padding: 100px 0;
  text-align: center;

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    font-size: 48px;
    margin-bottom: 20px;
    line-height: 1.2;

    @media (max-width: 768px) {
      font-size: 36px;
    }
  }

  p {
    font-size: 20px;
    margin-bottom: 40px;
    opacity: 0.9;

    @media (max-width: 768px) {
      font-size: 18px;
    }
  }

  .cta-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;

    @media (max-width: 480px) {
      flex-direction: column;
      align-items: center;
    }
  }
`;

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Ayudándoles a Triunfar</h1>
          <p>Plataforma de investigación y apoyo para el desarrollo educativo</p>
          <div className="cta-buttons">
            <Link to="/encuestas" className="btn">Ver Encuestas</Link>
            <Link to="/perfil" className="btn btn-secondary">Completar Perfil</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

/*
const Hero = () => {
  return (
    <HeroSection>
      <div className="container">
        <div className="hero-content">
          <h1>Ayudándoles a Triunfar</h1>
          <p>Tu plataforma de apoyo para alcanzar el éxito personal y profesional</p>
          <div className="cta-buttons">
            <Link to="/contacto" className="btn">Comenzar Ahora</Link>
            <a href="#features" className="btn btn-secondary">Conocer Más</a>
          </div>
        </div>
      </div>
    </HeroSection>
  );
};*/

export default Hero;