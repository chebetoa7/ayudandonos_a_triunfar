// src/components/ContactForm.js
import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 500;
    color: #374151;
  }

  input, textarea {
    padding: 12px 16px;
    border: 1px solid #D1D5DB;
    border-radius: 6px;
    font-size: 16px;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: #2c5aa0;
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: #2c5aa0;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2c5aa0;
  }

  &:disabled {
    background-color: #9CA3AF;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background-color: #10B981;
  color: white;
  padding: 16px;
  border-radius: 6px;
  text-align: center;
  margin-top: 20px;
`;

const ContactForm = ({ db }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      const contactsRef = ref(db, 'contacts');
      await push(contactsRef, {
        ...formData,
        timestamp: new Date().toISOString()
      });

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <FormContainer>
        <SuccessMessage>
          ¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.
        </SuccessMessage>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default ContactForm;