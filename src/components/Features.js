// src/components/Features.js
import React from 'react';
import styled from 'styled-components';

const FeaturesSection = styled.section`
  padding: 80px 0;
  background-color: white;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 50px;
`;

const FeatureCard = styled.div`
  background-color: #F9FAFB;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .icon {
    font-size: 48px;
    margin-bottom: 20px;
    color: #4F46E5;
  }

  h3 {
    font-size: 24px;
    margin-bottom: 15px;
    color: #1F2937;
  }

  p {
    color: #6B7280;
    line-height: 1.6;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    font-size: 36px;
    margin-bottom: 20px;
    color: #1F2937;
  }

  p {
    font-size: 18px;
    color: #6B7280;
  }
`;

const Features = () => {
  const features = [
    {
      icon: "📚",
      title: "Recursos Educativos",
      description: "Accede a materiales exclusivos, tutoriales y guías para desarrollar tus habilidades."
    },
    {
      icon: "👥",
      title: "Comunidad de Apoyo",
      description: "Conecta con personas que comparten tus objetivos y ambiciones de crecimiento."
    },
    {
      icon: "📈",
      title: "Seguimiento de Progreso",
      description: "Monitorea tu desarrollo y celebra tus logros en el camino hacia el éxito."
    },
    {
      icon: "🎯",
      title: "Metas Personalizadas",
      description: "Establece objetivos claros y recibe recomendaciones para alcanzarlos."
    },
    {
      icon: "💼",
      title: "Oportunidades Laborales",
      description: "Accede a bolsas de trabajo y oportunidades de networking con empresas."
    },
    {
      icon: "🔄",
      title: "Mentoría Continua",
      description: "Recibe orientación personalizada de mentores experimentados en tu área."
    }
  ];

  return (
    <FeaturesSection id="features">
      <div className="container">
        <SectionHeader>
          <h2>Nuestros Servicios</h2>
          <p>Ofrecemos herramientas y recursos diseñados para impulsar tu crecimiento personal y profesional</p>
        </SectionHeader>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <div className="icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </div>
    </FeaturesSection>
  );
};

export default Features;