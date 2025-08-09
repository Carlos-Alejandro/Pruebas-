// Servicio para envío de emails usando Formspree
// Formspree es más simple que EmailJS - solo necesitas registrarte en formspree.io

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export class EmailService {
  
  // Método usando Formspree (Recomendado - más fácil de configurar)
  static async sendWithFormspree(formData: ContactFormData): Promise<boolean> {
    try {
      // Aquí debes poner tu endpoint de Formspree
      // Regístrate en https://formspree.io/ y crea un formulario
      // Te dará una URL como: https://formspree.io/f/xrbzgqyw
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; // ← Cambia esto
      
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: 'Nuevo contacto desde Garage Landing Page',
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Error enviando email con Formspree:', error);
      return false;
    }
  }

  // Método usando EmailJS (más configuración pero más control)
  static async sendWithEmailJS(formData: ContactFormData): Promise<boolean> {
    try {
      // Necesitas instalar: npm install @emailjs/browser
      // Y configurar tu cuenta en EmailJS
      const emailjs = (await import('@emailjs/browser')).default;
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'contacto@tudominio.com', // Tu email de destino
      };

      const result = await emailjs.send(
        'YOUR_SERVICE_ID',    // Tu Service ID de EmailJS
        'YOUR_TEMPLATE_ID',   // Tu Template ID de EmailJS
        templateParams,
        'YOUR_PUBLIC_KEY'     // Tu Public Key de EmailJS
      );

      return result.status === 200;
    } catch (error) {
      console.error('Error enviando email con EmailJS:', error);
      return false;
    }
  }

  // Método simple usando mailto (fallback)
  static openMailto(formData: ContactFormData): void {
    const subject = encodeURIComponent('Contacto desde Garage');
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Mensaje: ${formData.message}`
    );
    
    window.open(`mailto:contacto@tudominio.com?subject=${subject}&body=${body}`);
  }
}
