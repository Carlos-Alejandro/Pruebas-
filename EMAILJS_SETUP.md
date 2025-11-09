# Configuración del Formulario de Contacto con EmailJS

Este formulario envía emails usando EmailJS conectado a tu cuenta SMTP de Titan (GoDaddy).

## Pasos para configurar:

### 1. Crear cuenta en EmailJS
1. Ve a https://www.emailjs.com/
2. Regístrate (es gratis hasta 200 emails/mes)
3. Verifica tu email

### 2. Conectar tu SMTP de Titan
1. En el dashboard de EmailJS, ve a **"Email Services"**
2. Click en **"Add New Service"**
3. Selecciona **"Custom SMTP"**
4. Completa con tus datos de Titan:
   - **SMTP Server:** `smtp.titan.email`
   - **Port:** `587`
   - **Security:** TLS/STARTTLS
   - **Username:** `tu-email@tudominio.com` (tu email completo de Titan)
   - **Password:** Tu contraseña de Titan
   - **From Name:** OUMA (o el nombre que quieras)
   - **From Email:** `tu-email@tudominio.com` (debe ser el mismo que username)
5. Click en **"Create Service"**
6. **Copia el Service ID** que aparece

### 3. Crear plantilla de email
1. Ve a **"Email Templates"**
2. Click en **"Create New Template"**
3. Configura la plantilla:

**Template Settings:**
- **Template Name:** `contact_form`

**Email Content:**

```
Subject: Gracias por contactarnos, {{nombre}}

---

Hola {{nombre}},

Hemos recibido tu mensaje desde el formulario de contacto de OUMA:

{{mensaje}}

Te contactaremos pronto al email: {{email}}

Saludos,
Equipo OUMA
```

4. **IMPORTANTE:** En la sección de "To Email", asegúrate de poner: `{{email}}`
   (Esto enviará el email al usuario que llenó el formulario)

5. Click en **"Save"**
6. **Copia el Template ID**

### 4. Obtener Public Key
1. Ve a **"Account"** → **"General"**
2. Busca **"Public Key"**
3. **Copia tu Public Key**

### 5. Configurar las credenciales en el código

Abre el archivo: `src/config/emailConfig.ts`

Reemplaza los valores con tus credenciales:

```typescript
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'tu_public_key_aqui',      // Del paso 4
  SERVICE_ID: 'tu_service_id_aqui',       // Del paso 2
  TEMPLATE_ID: 'tu_template_id_aqui',     // Del paso 3
};
```

### 6. ¡Listo!

El formulario ya está configurado. Cuando alguien llene el formulario:
1. Los datos (nombre, email, mensaje) se envían a EmailJS
2. EmailJS usa tu SMTP de Titan para enviar el email
3. El usuario recibe un email de confirmación en su bandeja

## Probar el formulario

1. Ejecuta tu proyecto: `npm run dev`
2. Ve a la página de contacto
3. Llena el formulario con tus datos
4. Revisa tu email, deberías recibir el mensaje

## Solución de problemas

**Error: "Invalid Public Key"**
- Verifica que copiaste correctamente el Public Key desde EmailJS

**Error: "Service not found"**
- Verifica que el Service ID sea correcto
- Asegúrate de que el servicio SMTP esté activo en EmailJS

**No recibo emails**
- Revisa spam/correo no deseado
- Verifica que las credenciales de Titan sean correctas
- En EmailJS, ve a "Logs" para ver si hay errores

**Límite de emails excedido**
- EmailJS tiene límite de 200 emails/mes en plan gratuito
- Considera actualizar a plan de pago si necesitas más

## Datos de conexión SMTP de Titan

Por si los necesitas:
- **Host:** smtp.titan.email
- **Puerto SSL (465):** Para conexión SSL
- **Puerto TLS (587):** Para conexión TLS/STARTTLS (recomendado)
- **Requiere autenticación:** Sí
- **Usuario:** Tu email completo
- **Contraseña:** Tu contraseña de Titan

## Seguridad

✅ **No expongas credenciales:** EmailJS maneja la conexión SMTP de forma segura
✅ **Public Key es seguro:** Puede estar en el código del frontend
✅ **Las contraseñas SMTP** están almacenadas en EmailJS, no en tu código

## Alternativas

Si EmailJS no funciona para ti, puedes considerar:
- **SendGrid** - Más robusto, 100 emails/día gratis
- **Backend propio** - Node.js + Nodemailer
- **Formspree** - Simple pero menos personalizable
