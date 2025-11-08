import { useEffect, useRef } from "react";

export default function BimModule() {
  const sectionRef = useRef<HTMLElement>(null);

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
      {/* DESKTOP: Layout horizontal (imagen izquierda, texto derecha) */}
      <div className="hidden md:flex items-center justify-center" style={{ minHeight: 'inherit' }}>
        <div className="flex items-start" style={{ 
        width: "clamp(300px, 96.30vw, 1849px)",
        height: "clamp(200px, 27.92vw, 536px)",
        gap: "clamp(2rem, 2.97vw, 57px)"
      }}>
        {/* Imagen izquierda - 797x536 en 1920px */}
        <div
          className="overflow-hidden shrink-0"
          style={{ 
            width: "clamp(300px, 41.51vw, 797px)", 
            height: "clamp(200px, 27.92vw, 536px)" 
          }}
        >
          <img
            src="/BIM/BIM.png"
            alt="Building Information Modeling - BIM"
            className="w-full h-full object-cover"
            draggable={false}
            loading="lazy"
          />
        </div>

        {/* Texto derecha */}
        <div className="shrink-0" style={{ width: "clamp(300px, 51.82vw, 995px)" }}>
          <h1 className="font-medium text-neutral-900" style={{ 
            fontSize: "clamp(2rem, 3.33vw, 64px)", 
            lineHeight: "100%", 
            letterSpacing: "0%" 
          }}>
            Building Information Modeling{" "}
            <span className="text-neutral-400">— BIM</span>
          </h1>

          <div className="text-black font-medium" style={{ 
            marginTop: "clamp(1.5rem, 2.5vw, 2rem)", 
            fontSize: "clamp(0.875rem, 1.04vw, 1.25rem)", 
            lineHeight: "1.40", 
            letterSpacing: "0" 
          }}>
            <p className="mb-[clamp(0.75rem,1.04vw,1.25rem)]">
              En <span className="font-bold">OUMA</span> creemos que la inteligencia del diseño comienza con la información. 
              Para nosotros, el Modelado de Información para la Construcción (BIM, por sus siglas en inglés) no es solo una 
              herramienta: es una mentalidad que conecta la arquitectura, la construcción y la gestión en un mismo lenguaje. 
              Cada modelo se convierte en un espacio compartido de colaboración — un sistema vivo que evoluciona junto con el proyecto.
            </p>

            {/* Contenedor flex para las dos columnas */}
            <div className="flex gap-[clamp(2rem,4vw,4rem)]">
              {/* Columna izquierda: ¿Por qué el BIM importa? */}
              <div className="flex-1">
                <h2 className="font-bold text-neutral-900 mb-[clamp(0.5rem,0.52vw,0.625rem)]" style={{ 
                  fontSize: "clamp(1.25rem, 1.56vw, 1.875rem)" 
                }}>
                  ¿Por qué el BIM importa?
                </h2>
                <p className="mb-[clamp(0.75rem,1.04vw,1.25rem)]">
                  Trabajar con BIM da claridad.
                </p>

                <ul className="list-disc pl-5" style={{ 
                  fontSize: "clamp(0.875rem, 1.04vw, 1.25rem)",
                  lineHeight: "1.40"
                }}>
                  <li className="mb-[clamp(0.25rem,0.26vw,0.3125rem)]">Aumenta la productividad</li>
                  <li className="mb-[clamp(0.25rem,0.26vw,0.3125rem)]">Reduce costos y retrasos</li>
                  <li className="mb-[clamp(0.25rem,0.26vw,0.3125rem)]">Fortalece la colaboración</li>
                  <li className="mb-[clamp(0.25rem,0.26vw,0.3125rem)]">Minimiza errores</li>
                  <li>Facilita el mantenimiento y la gestión de activos</li>
                </ul>
              </div>

              {/* Columna derecha: Servicios */}
              <div className="flex-1">
                <h2 className="font-bold text-neutral-900 mb-[clamp(0.5rem,0.52vw,0.625rem)]" style={{ 
                  fontSize: "clamp(1.25rem, 1.56vw, 1.875rem)" 
                }}>
                  Servicios
                </h2>
                <ul className="list-disc pl-5" style={{ 
                  fontSize: "clamp(0.875rem, 1.04vw, 1.25rem)",
                  lineHeight: "1.40"
                }}>
                  <li className="mb-[clamp(0.25rem,0.26vw,0.3125rem)]">De los Bocetos a los Planos Constructivos (CDs)</li>
                  <li className="mb-[clamp(0.25rem,0.26vw,0.3125rem)]">De Nube de Puntos a Revit (Modelaje As-Built)</li>
                  <li className="mb-[clamp(0.25rem,0.26vw,0.3125rem)]">BIM Management</li>
                  <li className="mb-[clamp(0.25rem,0.26vw,0.3125rem)]">Clash Detection</li>
                  <li className="mb-[clamp(0.25rem,0.26vw,0.3125rem)]">Parametric Modeling & Coordination</li>
                  <li className="mb-[clamp(0.25rem,0.26vw,0.3125rem)]">BIM Training</li>
                  <li>BIM Families / PIM Development</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* MOBILE: Layout vertical (imagen arriba, texto abajo) */}
      <div className="md:hidden w-full">
        {/* Título arriba */}
        <div className="pt-12 pb-6" style={{ paddingRight: '28px', paddingLeft: '34px' }}>
          <h1 className="font-medium text-neutral-900 text-5xl" style={{ lineHeight: '1.4' }}>
            Building Information Modeling{" "}
            <span className="text-neutral-400">— BIM</span>
          </h1>
        </div>

        {/* Imagen */}
        <div className="overflow-hidden" style={{ paddingRight: '28px', paddingLeft: '34px' }}>
          <img
            src="/BIM/BIM.png"
            alt="Building Information Modeling - BIM"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Texto */}
        <div className="py-12" style={{ paddingRight: '28px', paddingLeft: '34px' }}>
          <div className="text-black font-medium text-base space-y-4" style={{ lineHeight: '1.4' }}>
            <p>
              En <span className="font-bold">OUMA</span> creemos que la inteligencia del diseño comienza con la información. 
              Para nosotros, el Modelado de Información para la Construcción (BIM, por sus siglas en inglés) no es solo una 
              herramienta: es una mentalidad que conecta la arquitectura, la construcción y la gestión en un mismo lenguaje. 
              Cada modelo se convierte en un espacio compartido de colaboración — un sistema vivo que evoluciona junto con el proyecto.
            </p>

            <h2 className="font-bold text-neutral-900 text-xl mt-6 mb-3" style={{ lineHeight: '1.4' }}>
              ¿Por qué el BIM importa?
            </h2>
            <p>Trabajar con BIM da claridad.</p>

            <ul className="list-disc pl-5 space-y-2" style={{ lineHeight: '1.4' }}>
              <li>Aumenta la productividad</li>
              <li>Reduce costos y retrasos</li>
              <li>Fortalece la colaboración</li>
              <li>Minimiza errores</li>
              <li>Facilita el mantenimiento y la gestión de activos</li>
            </ul>

            <h2 className="font-bold text-neutral-900 text-xl mt-6 mb-3" style={{ lineHeight: '1.4' }}>
              Servicios
            </h2>
            <ul className="list-disc pl-5 space-y-2" style={{ lineHeight: '1.4' }}>
              <li>De los Bocetos a los Planos Constructivos (CDs)</li>
              <li>De Nube de Puntos a Revit (Modelaje As-Built)</li>
              <li>BIM Management</li>
              <li>Clash Detection</li>
              <li>Parametric Modeling & Coordination</li>
              <li>BIM Training</li>
              <li>BIM Families / PIM Development</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}