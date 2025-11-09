import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailConfig';

export interface ContactFormData {
  nombre: string;
  email: string;
  mensaje: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Envía un email de contacto usando EmailJS
 * @param formData - Datos del formulario (nombre, email, mensaje)
 * @returns Promise con el resultado del envío
 */
export const sendContactEmail = async (
  formData: ContactFormData
): Promise<EmailResponse> => {
  try {
    // Validación básica
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      return {
        success: false,
        message: 'Todos los campos son requeridos',
      };
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        message: 'Por favor ingresa un email válido',
      };
    }

    // Enviar email usando EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        nombre: formData.nombre,
        email: formData.email,
        mensaje: formData.mensaje,
        to_email: formData.email, // El email se envía al usuario que llena el form
      },
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log('Email enviado exitosamente:', response);

    return {
      success: true,
      message: 'Mensaje enviado correctamente. Revisa tu email.',
    };
  } catch (error: any) {
    console.error('Error enviando email:', error);

    return {
      success: false,
      message: 'Error al enviar el mensaje. Por favor intenta de nuevo.',
      error: error.text || error.message,
    };
  }
};
