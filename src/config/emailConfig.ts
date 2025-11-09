// Configuración de EmailJS
// Para obtener estas credenciales:
// 1. Crea una cuenta en https://www.emailjs.com/
// 2. Ve a "Email Services" y conecta tu SMTP de Titan:
//    - SMTP Server: smtp.titan.email
//    - Port: 587
//    - Username: tu-email@tudominio.com
//    - Password: tu-contraseña
// 3. Crea un "Email Template" con estas variables: {{nombre}}, {{email}}, {{mensaje}}
// 4. Copia los IDs aquí abajo

export const EMAILJS_CONFIG = {
  // Public Key - Lo encuentras en "Account" > "General" > "Public Key"
  PUBLIC_KEY: 'TU_PUBLIC_KEY_AQUI',
  
  // Service ID - Lo encuentras en "Email Services" después de conectar Titan
  SERVICE_ID: 'TU_SERVICE_ID_AQUI',
  
  // Template ID - Lo encuentras en "Email Templates" después de crear tu plantilla
  TEMPLATE_ID: 'TU_TEMPLATE_ID_AQUI',
};

// Ejemplo de template para EmailJS:
// Subject: Gracias por contactarnos, {{nombre}}
// 
// Hola {{nombre}},
// 
// Hemos recibido tu mensaje:
// {{mensaje}}
// 
// Te contactaremos pronto al email: {{email}}
// 
// Saludos,
// Equipo OUMA
