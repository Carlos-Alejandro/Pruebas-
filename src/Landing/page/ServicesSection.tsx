import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // ✅ Altura dinámica (viewport - header - footer)
  useEffect(() => {
    const updateHeight = () => {
      if (!sectionRef.current) return;
      const vh = window.innerHeight;
      const availableHeight = vh - 218; // Header (149) + Footer (69)

      // 🔽 Reducción adaptativa para pantallas medianas y móviles
      const reducedHeight =
        window.innerWidth < 768
          ? availableHeight * 0.75 // móviles
          : window.innerWidth < 1280
          ? availableHeight * 0.85 // medianas
          : availableHeight; // grandes

      sectionRef.current.style.minHeight = `${reducedHeight}px`;
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // ✅ Scroll horizontal + drag con cursor funcional
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const el = scrollerRef.current;
    if (!el) return;
    setDragging(true);
    startX.current = e.clientX;
    startScroll.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!dragging) return;
    const el = scrollerRef.current;
    if (!el) return;
    const dx = e.clientX - startX.current;
    el.scrollLeft = startScroll.current - dx;
  };
  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    setDragging(false);
    const el = scrollerRef.current;
    el?.releasePointerCapture(e.pointerId);
  };

  // ✅ Servicios
  const services = [
    {
      id: 1,
      slug: "diseno-arquitectonico",
      number: "01",
      title: "Diseño Arquitectónico",
      description:
        "Desarrollamos proyectos arquitectónicos desde la conceptualización hasta el detalle ejecutivo. Cada diseño nace de la empatía y se plasma con claridad, buscando siempre la armonía entre forma, función y alma.",
      image: "src/assets/servicios/CASA-MAY-2.png",
    },
    {
      id: 2,
      slug: "construccion-residencial-comercial",
      number: "02",
      title: "Construcción Residencial y Comercial",
      description:
        "Ejecutamos obras con precisión, orden y compromiso, cuidando tanto la calidad de los materiales como la experiencia del cliente durante el proceso constructivo.",
      image: "src/assets/servicios/8.png",
    },
    {
      id: 3,
      slug: "proyectos-integrales",
      number: "03",
      title: "Proyectos Integrales",
      description:
        "Ofrecemos un acompañamiento completo: desde el anteproyecto hasta la entrega final. Una solución llave en mano para quienes buscan claridad, confianza y resultados a la altura de sus expectativas.",
      image: "src/assets/servicios/a5.png",
    },
  ];

  return (
    <main
      ref={sectionRef}
      className="bg-neutral-50 text-neutral-900 flex justify-center items-center"
      style={{
        overflow: "visible",
        position: "static",
        zIndex: "auto",
      }}
    >
      {/* DESKTOP */}
      <div
        ref={scrollerRef}
        className={`
          hidden md:flex
          overflow-x-auto overflow-y-hidden
          w-full h-full select-none
          [&::-webkit-scrollbar]:hidden
          pointer-events-auto
          ${dragging ? "cursor-grabbing" : "cursor-grab"}
        `}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          zIndex: "auto",
          position: "relative",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="flex justify-start items-start mx-auto"
          style={{
            gap: "clamp(2rem, 4vw, 4.5rem)",
            paddingLeft: "clamp(1.4rem, 7.3vw, 14rem)",
            paddingRight: "clamp(1.4rem, 7.3vw, 14rem)",
            minWidth: "fit-content",
            maxWidth: "clamp(120rem, 90vw, 189.5rem)", // 1895px (se mantiene)
            
          }}
        >
          {services.map((s) => (
            <div
              key={s.id}
              onClick={() => navigate(`/servicios/${s.slug}`)}
              className="flex flex-col cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
              data-cursor="drag"
              data-cursor-label="Arrastra"

              style={{
                width: "clamp(45rem, 30vw, 57.5rem)", // se mantiene
                height: "clamp(32rem, 45vh, 50rem)", // 🔽 altura más flexible
                flexShrink: 0,
              }}
            >
              {/* Número + título */}
              <h2
                className="font-medium"
                style={{
                  fontSize: "clamp(2.2rem, 2.2vw, 4.8rem)",
                  lineHeight: "clamp(3rem, 2.5vw, 6rem)",
                  color: "#A6A6A6",
                }}
              >
                <span className="text-[#A6A6A6]">{s.number}</span>{" "}
                <span className="text-[#0A0A0A]">{s.title}</span>
              </h2>

              {/* Descripción */}
              <p
                className="font-medium text-[#0A0A0A]"
                style={{
                  fontSize: "clamp(1.4rem, 1.2vw, 2rem)", // 🔽 más compacto en medianas
                  lineHeight: "clamp(1.8rem, 1.8vw, 2.5rem)",
                  marginTop: "clamp(1rem, 1.5vw, 2rem)",
                  marginBottom: "clamp(2rem, 2.5vw, 3rem)",
                  maxWidth: "clamp(40rem, 45vw, 57.5rem)",
                }}
              >
                {s.description}
              </p>

              {/* Imagen */}
              <div
                className="overflow-hidden rounded-sm"
                style={{
                  width: "clamp(30rem, 23vw, 44.3rem)",
                  height: "clamp(20rem, 18vw, 28rem)",
                }}
              >
                <img
                  src={s.image}
                  alt={s.title}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  draggable={false}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden w-full px-6 py-8 sm:py-12 space-y-12">
        {services.map((s) => (
          <div
            key={s.id}
            onClick={() => navigate(`/servicios/${s.slug}`)}
            className="flex flex-col gap-4 cursor-pointer"
          >
            <h2 className="font-medium text-2xl text-[#0A0A0A] leading-tight">
              <span className="text-[#A6A6A6]">{s.number}</span>{" "}
              <span>{s.title}</span>
            </h2>
            <p className="text-[#0A0A0A] font-medium text-base leading-relaxed">
              {s.description}
            </p>
            <div className="overflow-hidden rounded-sm">
              <img
                src={s.image}
                alt={s.title}
                className="object-cover w-full h-auto transition-transform duration-300 hover:scale-105"
                draggable={false}
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
