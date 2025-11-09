import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { sendContactEmail } from "../../services/emailService";

export default function ContactoModule() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showOficies, setShowOficies] = useState(false);
  const [showSocial, setShowSocial] = useState(false);

  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [touched, setTouched] = useState({
    nombre: false,
    email: false,
    mensaje: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error" | "";
    text: string;
  }>({ type: "", text: "" });

  // Validar campo individual
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "nombre":
        if (!value.trim()) return "El nombre es requerido";
        if (value.trim().length < 2) return "El nombre debe tener al menos 2 caracteres";
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return "El nombre solo puede contener letras";
        return "";
      
      case "email":
        if (!value.trim()) return "El email es requerido";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Ingresa un email válido";
        return "";
      
      case "mensaje":
        if (!value.trim()) return "El mensaje es requerido";
        if (value.trim().length < 10) return "El mensaje debe tener al menos 10 caracteres";
        if (value.trim().length > 500) return "El mensaje no puede exceder 500 caracteres";
        return "";
      
      default:
        return "";
    }
  };

  // Manejador de cambios en inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validar en tiempo real si el campo ya fue tocado
    if (touched[name as keyof typeof touched]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  // Manejador de blur (cuando el usuario sale del campo)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Marcar todos los campos como tocados
    setTouched({
      nombre: true,
      email: true,
      mensaje: true,
    });

    // Validar todos los campos
    const nombreError = validateField("nombre", formData.nombre);
    const emailError = validateField("email", formData.email);
    const mensajeError = validateField("mensaje", formData.mensaje);

    setErrors({
      nombre: nombreError,
      email: emailError,
      mensaje: mensajeError,
    });

    // Si hay errores, no enviar
    if (nombreError || emailError || mensajeError) {
      setSubmitMessage({
        type: "error",
        text: "Por favor corrige los errores antes de enviar",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage({ type: "", text: "" });

    const result = await sendContactEmail(formData);

    setIsSubmitting(false);

    if (result.success) {
      setSubmitMessage({ type: "success", text: result.message });
      // Limpiar formulario
      setFormData({ nombre: "", email: "", mensaje: "" });
      setErrors({ nombre: "", email: "", mensaje: "" });
      setTouched({ nombre: false, email: false, mensaje: false });
    } else {
      setSubmitMessage({ type: "error", text: result.message });
    }
  };

  // Ajustar altura para ocupar viewport menos header (149px) y footer (69px)
  useEffect(() => {
    const updateHeight = () => {
      if (!sectionRef.current) return;
      const vh = window.innerHeight;
      // Header: 149px, Footer: 69px = Total: 218px
      // En 1920x1080: 1080 - 218 = 862px disponibles
      const availableHeight = vh - 218;
      sectionRef.current.style.minHeight = `${availableHeight}px`;
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <section ref={sectionRef} className="bg-neutral-50">
      <div className="w-full" style={{
        maxWidth: "clamp(300px, 83.33vw, 1600px)",
        paddingLeft: "clamp(1rem, 8.33vw, 160px)",
        paddingRight: "clamp(1rem, 8.33vw, 160px)",
        paddingTop: "clamp(2rem, 4.17vw, 80px)"
      }}>
        {/* Título */}
        <h1 className="font-medium text-neutral-900" style={{ 
          fontSize: "clamp(2rem, 3.33vw, 64px)", 
          lineHeight: "100%", 
          letterSpacing: "0%",
          marginBottom: "clamp(2rem, 4.17vw, 80px)"
        }}>
          Contacto
        </h1>

        {/* Grid de 2 columnas: Formulario | Oficies+Social */}
        <div className="flex gap-x-[clamp(2rem,13.85vw,266px)]" style={{
          width: "clamp(300px, 66.30vw, 1273px)"
        }}>
          {/* Columna 1: Formulario - 916x452 */}
          <form 
            onSubmit={handleSubmit}
            style={{
              width: "clamp(300px, 47.71vw, 916px)",
              height: "clamp(200px, 23.54vw, 452px)",
              flexShrink: 0
            }}
          >
            {/* NOMBRE y EMAIL en la misma fila */}
            <div className="flex gap-x-[clamp(1rem,2.97vw,57px)] mb-[clamp(2rem,4.17vw,80px)]">
              {/* NOMBRE */}
              <div style={{ flex: "0 0 clamp(150px,22.40vw,430px)" }}>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="NOMBRE"
                  disabled={isSubmitting}
                  className={`w-full bg-transparent border-b py-2 text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 placeholder:uppercase disabled:opacity-50 ${
                    errors.nombre && touched.nombre
                      ? "border-red-500 focus:border-red-500"
                      : "border-neutral-300 focus:border-neutral-900"
                  }`}
                  style={{ 
                    fontSize: "clamp(0.875rem, 1.04vw, 20px)",
                    letterSpacing: "0.05em"
                  }}
                />
                {errors.nombre && touched.nombre && (
                  <p className="text-red-500 mt-1" style={{ fontSize: "clamp(0.625rem, 0.73vw, 14px)" }}>
                    {errors.nombre}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div style={{ flex: "0 0 clamp(150px,22.40vw,430px)" }}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="EMAIL"
                  disabled={isSubmitting}
                  className={`w-full bg-transparent border-b py-2 text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 placeholder:uppercase disabled:opacity-50 ${
                    errors.email && touched.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-neutral-300 focus:border-neutral-900"
                  }`}
                  style={{ 
                    fontSize: "clamp(0.875rem, 1.04vw, 20px)",
                    letterSpacing: "0.05em"
                  }}
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 mt-1" style={{ fontSize: "clamp(0.625rem, 0.73vw, 14px)" }}>
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* MENSAJE */}
            <div className="mb-[clamp(2rem,4.17vw,80px)]">
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="MENSAJE"
                disabled={isSubmitting}
                className={`w-full bg-transparent border-b py-2 text-neutral-900 outline-none transition-colors resize-none placeholder:text-neutral-400 placeholder:uppercase align-top disabled:opacity-50 ${
                  errors.mensaje && touched.mensaje
                    ? "border-red-500 focus:border-red-500"
                    : "border-neutral-300 focus:border-neutral-900"
                }`}
                style={{ 
                  fontSize: "clamp(0.875rem, 1.04vw, 20px)",
                  letterSpacing: "0.05em",
                  height: "clamp(60px, 6.77vw, 130px)",
                  verticalAlign: "top"
                }}
              />
              {errors.mensaje && touched.mensaje && (
                <p className="text-red-500 mt-1" style={{ fontSize: "clamp(0.625rem, 0.73vw, 14px)" }}>
                  {errors.mensaje}
                </p>
              )}
            </div>

            {/* SEND */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-neutral-900 font-medium uppercase underline hover:text-neutral-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontSize: "clamp(0.875rem, 1.04vw, 20px)" }}
                data-cursor="link"
              >
                {isSubmitting ? "ENVIANDO..." : "SEND"}
              </button>
              
              {/* Mensaje de respuesta */}
              {submitMessage.type && (
                <p
                  className={`mt-4 text-sm ${
                    submitMessage.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                  style={{ fontSize: "clamp(0.75rem, 0.83vw, 16px)" }}
                >
                  {submitMessage.text}
                </p>
              )}
            </div>
          </form>

          {/* Columna 2: OFICIES + SOCIAL (ambos acordeones) - 91x452 */}
          <div style={{
            width: "clamp(80px, 4.74vw, 91px)",
            height: "clamp(200px, 23.54vw, 452px)",
            flexShrink: 0
          }}>
            {/* OFICIES acordeón */}
            <div className="mb-[clamp(0.5rem,0.89vw,17px)]">
              <button 
                onClick={() => setShowOficies(!showOficies)}
                className="w-full text-left text-neutral-400 uppercase hover:text-neutral-900 transition-colors whitespace-nowrap flex items-center gap-2" 
                style={{
                  fontSize: "clamp(0.875rem, 1.04vw, 20px)",
                  letterSpacing: "0.05em"
                }}
              >
                <span>OFICIES</span>
                {showOficies ? (
                  <Minus style={{ width: "20px", height: "20px", flexShrink: 0 }} strokeWidth={1.5} />
                ) : (
                  <Plus style={{ width: "20px", height: "20px", flexShrink: 0 }} strokeWidth={1.5} />
                )}
              </button>
              {showOficies && (
                <div className="mt-4 space-y-2">
                  <a href="#" className="block text-neutral-900 underline hover:text-neutral-600 transition-colors" style={{
                    fontSize: "clamp(0.875rem, 1.04vw, 20px)"
                  }}>
                    Oficina 1
                  </a>
                  <a href="#" className="block text-neutral-900 underline hover:text-neutral-600 transition-colors" style={{
                    fontSize: "clamp(0.875rem, 1.04vw, 20px)"
                  }}>
                    Oficina 2
                  </a>
                  <a href="#" className="block text-neutral-900 underline hover:text-neutral-600 transition-colors" style={{
                    fontSize: "clamp(0.875rem, 1.04vw, 20px)"
                  }}>
                    Oficina 3
                  </a>
                </div>
              )}
            </div>

            {/* SOCIAL acordeón */}
            <div>
              <button 
                onClick={() => setShowSocial(!showSocial)}
                className="w-full text-left text-neutral-400 uppercase hover:text-neutral-900 transition-colors whitespace-nowrap flex items-center gap-2" 
                style={{
                  fontSize: "clamp(0.875rem, 1.04vw, 20px)",
                  letterSpacing: "0.05em"
                }}
              >
                <span>SOCIAL</span>
                {showSocial ? (
                  <Minus style={{ width: "20px", height: "20px", flexShrink: 0 }} strokeWidth={1.5} />
                ) : (
                  <Plus style={{ width: "20px", height: "20px", flexShrink: 0 }} strokeWidth={1.5} />
                )}
              </button>
              {showSocial && (
                <div className="mt-4 space-y-2">
                  <a href="#" className="block text-neutral-900 underline hover:text-neutral-600 transition-colors" style={{
                    fontSize: "clamp(0.875rem, 1.04vw, 20px)"
                  }}>
                    Facebook
                  </a>
                  <a href="#" className="block text-neutral-900 underline hover:text-neutral-600 transition-colors" style={{
                    fontSize: "clamp(0.875rem, 1.04vw, 20px)"
                  }}>
                    Instagram
                  </a>
                  <a href="#" className="block text-neutral-900 underline hover:text-neutral-600 transition-colors" style={{
                    fontSize: "clamp(0.875rem, 1.04vw, 20px)"
                  }}>
                    Linkedin
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}