# 🚗 Garage - Under Construction Landing Page

Una landing page moderna y responsiva para Garage, construida con React + TypeScript + Vite.

## 🎯 Descripción

Landing page minimalista que presenta Garage como un proyecto "Under Construction" con un formulario de contacto funcional. Diseño responsive optimizado para desktop y mobile.

## ✨ Características

- 🎨 **Diseño responsivo** - Optimizado para todas las pantallas
- 🔤 **Fuentes personalizadas** - Garnett y ObjectSans integradas
- 📧 **Formulario funcional** - Envío real de emails
- ⚡ **Performance optimizada** - Vite para desarrollo y build rápidos
- 🎭 **Animaciones suaves** - Transiciones CSS elegantes
- 📱 **Mobile-first** - Diseño que prioriza dispositivos móviles

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: CSS Modules + Custom Properties
- **Fonts**: Garnett (serif) + ObjectSans (sans-serif)
- **Email Service**: EmailJS / Formspree
- **Linting**: ESLint
- **Package Manager**: npm

## 📁 Estructura del Proyecto

```
garage/
├── 📁 public/                 # Archivos estáticos
│   └── vite.svg
├── 📁 src/
│   ├── 📁 assets/            # Recursos del proyecto
│   │   ├── 📁 fonts/         # Fuentes personalizadas
│   │   │   ├── fonts.css     # Definiciones @font-face
│   │   │   ├── Garnett-*.woff     # Familia Garnett
│   │   │   └── ObjectSans-*.woff  # Familia ObjectSans
│   │   └── 📁 images/        # Imágenes y logos
│   │       ├── logo-UC.svg   # Logo principal
│   │       └── 📁 icons/
│   │           └── facebook.svg
│   ├── 📁 components/        # Componentes React
│   │   ├── GarageLanding.tsx # Componente principal
│   │   └── GarageLanding.css # Estilos del landing
│   ├── 📁 services/         # Servicios externos
│   │   └── emailService.ts  # Servicio de envío de emails
│   ├── 📁 utils/            # Utilidades
│   │   └── emailConfig.ts   # Configuración de emails
│   ├── App.tsx              # Componente raíz
│   ├── App.css              # Estilos globales de App
│   ├── index.css            # Estilos base y variables CSS
│   ├── main.tsx             # Punto de entrada
│   └── vite-env.d.ts        # Tipos de Vite
├── 📁 .github/              # GitHub configuration
│   └── copilot-instructions.md
├── 📁 .vscode/              # VS Code tasks
│   └── tasks.json
├── package.json             # Dependencias y scripts
├── tsconfig.json            # Configuración TypeScript
├── vite.config.ts           # Configuración Vite
└── README.md               # Este archivo
```

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm 9+

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd garage

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles
```bash
npm run dev      # Servidor de desarrollo (http://localhost:5173)
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Ejecutar ESLint
```

## 🎨 Fuentes Personalizadas

### Garnett (Serif)
- **Pesos**: Light (300), Regular (400), Medium (500), Semibold (600), Bold (700), Black (900)
- **Estilos**: Normal e Itálica
- **Uso**: Títulos y elementos destacados

### ObjectSans (Sans-serif)
- **Pesos**: Regular (400), Heavy (900)
- **Estilos**: Normal y Slanted
- **Uso**: Interfaz y texto general

### Variables CSS Disponibles
```css
--font-garnett: 'Garnett', Georgia, serif;
--font-objectsans: 'ObjectSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-black: 900;
```

## 📧 Configuración de Emails

El formulario de contacto está preparado para envío real. Soporta:

### Opciones de Envío:
1. **Formspree** (Recomendado)
   - 50 emails gratis/mes
   - Configuración en 5 minutos
   - Editar `FORMSPREE_ENDPOINT` en `emailService.ts`

2. **EmailJS**
   - 200 emails gratis/mes
   - Mayor control y personalización
   - Configurar credenciales en `emailConfig.ts`

### Configuración Rápida (Formspree):
1. Registrarse en [formspree.io](https://formspree.io)
2. Crear formulario nuevo
3. Copiar endpoint en `src/services/emailService.ts` línea 14
4. ¡Listo! Los emails llegarán a tu bandeja

## 📱 Diseño Responsive

### Breakpoints:
- **Desktop**: ≥769px
- **Tablet**: 768px
- **Mobile**: ≤480px

### Características Mobile:
- Logo optimizado para pantallas pequeñas
- Formulario apilado verticalmente
- Texto "CONTACT WITH US" con espaciado especial
- Icono Facebook posicionado en esquina inferior derecha

## 🎯 Componentes Principales

### GarageLanding
Componente principal que incluye:
- Logo responsive
- Título "CONTACT WITH US" (adaptativo desktop/mobile)
- Formulario de 3 campos (Name, Email, Message)
- Botón "Send" minimalista
- Icono Facebook con enlace

### Estados del Formulario:
- **Idle**: Estado inicial
- **Loading**: "Enviando..." con botón deshabilitado
- **Success**: Confirmación y reset automático
- **Error**: Fallback a mailto si falla

## 🔧 Personalización

### Colores Principales:
```css
background: #FF4500;  /* Naranja vibrante */
text: #000;           /* Negro para contraste */
inputs: #000;         /* Fondo negro */
placeholder: #FF4500; /* Texto naranja en inputs */
```

### Modificar Contenido:
- **Logo**: Reemplazar `src/assets/images/logo-UC.svg`
- **Enlaces sociales**: Editar href en `GarageLanding.tsx`
- **Email destino**: Configurar en servicio de emails elegido
- **Colores**: Variables CSS en `index.css`

## 📦 Build y Deploy

```bash
# Generar build de producción
npm run build

# El build se genera en la carpeta 'dist/'
# Subir contenido de 'dist/' a tu hosting preferido
```

### Hosting Recomendado:
- **Netlify** (Gratis, fácil, incluye forms)
- **Vercel** (Gratis, optimizado para React)
- **GitHub Pages** (Gratis para repos públicos)

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama para feature (`git checkout -b feature/nueva-feature`)
3. Commit cambios (`git commit -m 'Agregar nueva feature'`)
4. Push a la rama (`git push origin feature/nueva-feature`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 🛟 Soporte

Para soporte técnico o consultas:
- 📧 Email: [contacto@garage.com](mailto:contacto@garage.com)
- 🐛 Issues: [GitHub Issues](https://github.com/usuario/garage/issues)

---

**Garage** - Construyendo el futuro, un proyecto a la vez 🚗✨