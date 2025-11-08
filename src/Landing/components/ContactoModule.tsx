import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function ContactoModule() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showOficies, setShowOficies] = useState(false);
  const [showSocial, setShowSocial] = useState(false);

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
          <div style={{
            width: "clamp(300px, 47.71vw, 916px)",
            height: "clamp(200px, 23.54vw, 452px)",
            flexShrink: 0
          }}>
            {/* NOMBRE y EMAIL en la misma fila */}
            <div className="flex gap-x-[clamp(1rem,2.97vw,57px)] mb-[clamp(2rem,4.17vw,80px)]">
              {/* NOMBRE */}
              <div style={{ flex: "0 0 clamp(150px,22.40vw,430px)" }}>
                <input
                  type="text"
                  placeholder="NOMBRE"
                  className="w-full bg-transparent border-b border-neutral-300 py-2 text-neutral-900 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 placeholder:uppercase"
                  style={{ 
                    fontSize: "clamp(0.875rem, 1.04vw, 20px)",
                    letterSpacing: "0.05em"
                  }}
                />
              </div>

              {/* EMAIL */}
              <div style={{ flex: "0 0 clamp(150px,22.40vw,430px)" }}>
                <input
                  type="email"
                  placeholder="EMAIL"
                  className="w-full bg-transparent border-b border-neutral-300 py-2 text-neutral-900 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 placeholder:uppercase"
                  style={{ 
                    fontSize: "clamp(0.875rem, 1.04vw, 20px)",
                    letterSpacing: "0.05em"
                  }}
                />
              </div>
            </div>

            {/* MENSAJE */}
            <div className="mb-[clamp(2rem,4.17vw,80px)]">
              <textarea
                rows={1}
                placeholder="MENSAJE"
                className="w-full bg-transparent border-b border-neutral-300 py-2 text-neutral-900 outline-none focus:border-neutral-900 transition-colors resize-none placeholder:text-neutral-400 placeholder:uppercase align-top"
                style={{ 
                  fontSize: "clamp(0.875rem, 1.04vw, 20px)",
                  letterSpacing: "0.05em",
                  height: "clamp(60px, 6.77vw, 130px)",
                  verticalAlign: "top"
                }}
              />
            </div>

            {/* SEND */}
            <div>
              <button
                type="button"
                className="text-neutral-900 font-medium uppercase underline hover:text-neutral-600 transition-colors"
                style={{ fontSize: "clamp(0.875rem, 1.04vw, 20px)" }}
                data-cursor="link"
              >
                SEND
              </button>
            </div>
          </div>

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