// Configuración para EmailJS
// EmailJS es un servicio que permite enviar emails directamente desde el frontend
// sin necesidad de un backend propio.

export const emailConfig = {
  // Estas credenciales las obtienes de EmailJS (https://www.emailjs.com/)
  // Después de registrarte, creas un servicio de email y obtienes estos valores
  SERVICE_ID: 'your_service_id', // ID del servicio de email (Gmail, Outlook, etc.)
  TEMPLATE_ID: 'your_template_id', // ID de la plantilla de email
  PUBLIC_KEY: 'your_public_key', // Clave pública de EmailJS
};

// Alternativas para envío de emails:

// 1. EmailJS (Recomendado para proyectos pequeños-medianos)
//    - Gratuito hasta 200 emails/mes
//    - Fácil configuración
//    - No requiere backend
//    - https://www.emailjs.com/

// 2. Formspree (Alternativa simple)
//    - Gratuito hasta 50 envíos/mes
//    - Solo necesitas una URL
//    - https://formspree.io/

// 3. Netlify Forms (Si usas Netlify para hosting)
//    - Integrado con Netlify
//    - Muy fácil de usar
//    - https://www.netlify.com/products/forms/

// 4. Backend propio con:
//    - Nodemailer + Express
//    - SendGrid API
//    - AWS SES
//    - Resend (moderno y simple)

export const formspreeConfig = {
  // Alternativa con Formspree - solo necesitas registrarte y obtener tu endpoint
  FORM_ENDPOINT: 'https://formspree.io/f/your_form_id'
};
