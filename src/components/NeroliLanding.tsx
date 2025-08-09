import React, { useState } from 'react';
import logoUC from '../assets/images/logo_UC.png';
import estructuraSvg from '../assets/images/Estructura.svg';
import estructuraBack from '../assets/images/estructuraback.png';
import igIcon from '../assets/images/icons/ig-icon 1.svg';
import { EmailService } from '../services/emailService';
import './NeroliLanding.css';

export const NeroliLanding: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Opción 1: Formspree (recomendado - fácil configuración)
      const success = await EmailService.sendWithFormspree(formData);
      
      if (success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        alert('¡Mensaje enviado correctamente! Te contactaremos pronto.');
      } else {
        throw new Error('Error enviando mensaje');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      
      // Fallback: abrir mailto si falla el envío
      const useMailto = window.confirm(
        'Hubo un problema enviando el mensaje. ¿Quieres abrir tu cliente de email?'
      );
      
      if (useMailto) {
        EmailService.openMailto(formData);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="neroli-landing">
      {/* Sección 1: Header con logo NEROLI */}
      <header className="header-section">
        <div className="neroli-logo-container">
          <img 
            src={logoUC} 
            alt="Neroli - Under Construction" 
            className="neroli-logo"
          />
        </div>
      </header>

      {/* Sección 2: Contenido principal - Layout diferente para desktop/mobile */}
      <main className="main-content">
        {/* Imagen arquitectónica */}
        <div className="architecture-section">
          <div className="architecture-image-container">
            <img 
              src={estructuraBack} 
              alt="Architecture background" 
              className="architecture-background"
            />
            <div className="architecture-overlay">
              <img 
                src={estructuraSvg} 
                alt="Building structure" 
                className="structure-diagram"
              />
              <div className="neroli-logo-overlay">
                <div className="logo-text">NEROLI</div>
                <div className="est-text">EST. 2021</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de contacto con fondo definido */}
        <div className="contact-section">
          <div className="contact-form-container">
            <h2 className="contact-title">Contact With Us</h2>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-fields">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="form-input"
                  required
                />
                
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="form-input"
                  required
                />
                
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  className="form-textarea"
                  rows={4}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className={`send-button ${isSubmitting ? 'sending' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Sección 3: Footer con redes sociales */}
      <footer className="footer-section">
        <div className="social-links">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Instagram"
          >
            <img 
              src={igIcon} 
              alt="Instagram" 
              className="social-icon"
            />
          </a>
        </div>
      </footer>
    </div>
  );
};
