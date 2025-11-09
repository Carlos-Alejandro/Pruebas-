import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const movedRef = useRef(0);
  const navigate = useNavigate();

  // ✅ Altura dinámica (viewport - header - footer)
  useEffect(() => {
    const updateHeight = () => {
      if (!sectionRef.current) return;
      const vh = window.innerHeight;
      const availableHeight = vh - 218; // Header (149) + Footer (69)

      const reducedHeight =
        window.innerWidth < 768
          ? availableHeight * 0.75
          : window.innerWidth < 1280
          ? availableHeight * 0.85
          : availableHeight;

      sectionRef.current.style.minHeight = `${reducedHeight}px`;
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // ✅ Drag con inercia (idéntico a Inicio)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;
    let velocity = 0;
    let lastX = 0;
    let lastT = 0;
    let rafId = 0;
    let startY = 0;

    const stopMomentum = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    };
    const momentum = () => {
      velocity *= 0.95;
      if (Math.abs(velocity) < 0.2) {
        stopMomentum();
        el.classList.remove("cursor-grabbing");
        return;
      }
      el.scrollLeft -= velocity;
      rafId = requestAnimationFrame(momentum);
    };

    const getX = (clientX: number) => clientX - el.getBoundingClientRect().left;

    const onDown = (clientX: number) => {
      isDragging = true;
      movedRef.current = 0;
      startX = getX(clientX);
      startScrollLeft = el.scrollLeft;
      lastX = startX;
      lastT = performance.now();
      velocity = 0;
      stopMomentum();
      el.classList.add("cursor-grabbing");
    };

    const onMove = (clientX: number) => {
      if (!isDragging) return;
      const x = getX(clientX);
      const now = performance.now();
      const dx = x - lastX;
      const dt = now - lastT || 16.7;
      el.scrollLeft = startScrollLeft - (x - startX);
      velocity = dx * (16.7 / dt);
      lastX = x;
      lastT = now;
      movedRef.current += Math.abs(dx);
    };

    const onUp = () => {
      if (!isDragging) return;
      isDragging = false;
      rafId = requestAnimationFrame(momentum);
      el.classList.remove("cursor-grabbing");
    };

    // mouse
    const md = (e: MouseEvent) => {
      e.preventDefault();
      onDown(e.clientX);
    };
    const mm = (e: MouseEvent) => {
      e.preventDefault();
      onMove(e.clientX);
    };
    const mu = () => onUp();

    // touch
    const ts = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      startY = e.touches[0].clientY;
      onDown(e.touches[0].clientX);
    };
    const tm = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const dy = Math.abs(e.touches[0].clientY - startY);
      const dx = Math.abs(getX(e.touches[0].clientX) - startX);
      if (dx > dy) {
        e.preventDefault();
        onMove(e.touches[0].clientX);
      } else {
        isDragging = false;
        el.classList.remove("cursor-grabbing");
      }
    };
    const te = () => onUp();

    el.addEventListener("mousedown", md);
    window.addEventListener("mousemove", mm, { passive: false });
    window.addEventListener("mouseup", mu);
    el.addEventListener("touchstart", ts, { passive: false });
    el.addEventListener("touchmove", tm, { passive: false });
    el.addEventListener("touchend", te);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("mousedown", md);
      window.removeEventListener("mousemove", mm as any);
      window.removeEventListener("mouseup", mu);
      el.removeEventListener("touchstart", ts);
      el.removeEventListener("touchmove", tm);
      el.removeEventListener("touchend", te);
      stopMomentum();
    };
  }, []);

  const handleCardClick = (slug: string) => {
    if (movedRef.current < 10) navigate(`/servicios/${slug}`);
  };
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

  // ✅ Tu diseño original sin tocarlo
  return (
    <main
      ref={sectionRef}
      className="bg-neutral-50 text-neutral-900 flex justify-center items-center"
      style={{ overflow: "visible", position: "static", zIndex: "auto" }}
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
          cursor-grab
        `}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          zIndex: "auto",
          position: "relative",
        }}
      >
        <div
          className="flex justify-start items-start mx-auto"
          style={{
            gap: "clamp(2rem, 4vw, 4.5rem)",
            paddingLeft: "clamp(1.4rem, 7.3vw, 14rem)",
            paddingRight: "clamp(1.4rem, 7.3vw, 14rem)",
            minWidth: "fit-content",
            maxWidth: "clamp(120rem, 90vw, 189.5rem)",
          }}
        >
          {services.map((s) => (
            <div
              key={s.id}
              onClick={() => handleCardClick(s.slug)}
              className="flex flex-col cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
              data-cursor="drag"
              data-cursor-label="Ver más"
              style={{
                width: "clamp(45rem, 30vw, 57.5rem)",
                height: "clamp(32rem, 45vh, 50rem)",
                flexShrink: 0,
              }}
            >
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

              <p
                className="font-medium text-[#0A0A0A]"
                style={{
                  fontSize: "clamp(1.4rem, 1.2vw, 2rem)",
                  lineHeight: "clamp(1.8rem, 1.8vw, 2.5rem)",
                  marginTop: "clamp(1rem, 1.5vw, 2rem)",
                  marginBottom: "clamp(2rem, 2.5vw, 3rem)",
                  maxWidth: "clamp(40rem, 45vw, 57.5rem)",
                }}
              >
                {s.description}
              </p>

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
            data-cursor="view"
            data-cursor-label="Ver más"
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
