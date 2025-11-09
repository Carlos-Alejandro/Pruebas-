import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const movedRef = useRef(0);
  const navigate = useNavigate();

  // ✅ Altura dinámica (viewport - header - footer)
  useEffect(() => {
    const updateHeight = () => {
      if (!sectionRef.current) return;
      const vh = window.innerHeight;
      const availableHeight = vh - 218;

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

  // ✅ Drag con inercia (idéntico a ServicesSection)
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

    // Eventos mouse / touch
    const md = (e: MouseEvent) => {
      e.preventDefault();
      onDown(e.clientX);
    };
    const mm = (e: MouseEvent) => {
      e.preventDefault();
      onMove(e.clientX);
    };
    const mu = () => onUp();

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
    if (movedRef.current < 10) navigate(`/blog/${slug}`);
  };

  // 📰 Datos del blog
  const articles = [
    {
      id: 1,
      slug: "la-madera-sin-disfraz",
      title: "La Madera sin Disfráz",
      description: "Una reflexión de OUMA",
      image: "src/assets/blog/img5.png",
    },
    {
      id: 2,
      slug: "nombre-del-articulo-2",
      title: "Nombre del Artículo",
      description: "Descripción del artículo",
      image: "src/assets/blog/img6.png",
    },
    {
      id: 3,
      slug: "nombre-del-articulo-3",
      title: "Nombre del Artículo",
      description: "Descripción del artículo",
      image: "src/assets/blog/img7.png",
    },
    {
      id: 4,
      slug: "nombre-del-articulo-4",
      title: "Nombre del Artículo",
      description: "Descripción del artículo",
      image: "src/assets/blog/img8.png",
    },
  ];
  

  return (
    <main
      ref={sectionRef}
      className="bg-neutral-50 text-neutral-900 flex justify-center items-center"
    >
      {/* DESKTOP */}
      <div
        ref={scrollerRef}
        className="
          hidden md:flex overflow-x-auto overflow-y-hidden
          w-full h-full select-none cursor-grab [&::-webkit-scrollbar]:hidden
        "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div
          className="flex justify-start items-start mx-auto"
          style={{
            gap: "clamp(2rem, 3vw, 5rem)",
            paddingLeft: "clamp(8rem, 6vw, 14rem)",
            paddingRight: "clamp(8rem, 6vw, 14rem)",
            minWidth: "fit-content",
          }}
        >
          {articles.map((a) => (
            <div
              key={a.id}
              onClick={() => handleCardClick(a.slug)}
              className="flex flex-col cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
              data-cursor="drag"
              data-cursor-label="Leer más"
              style={{
                width: "clamp(28rem, 25vw, 48rem)", // 🔹 se reduce en medianas
                flexShrink: 0,
              }}
            >
              {/* Imagen */}
              <div
                className="overflow-hidden rounded-sm bg-[#D9D9D9] mb-4"
                style={{
                  width: "clamp(28rem, 25vw, 48rem)",
                  height: "clamp(18rem, 17vw, 30.2rem)", // 🔹 máx 302px exactos
                }}
              >
                <img
                  src={a.image}
                  alt={a.title}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  draggable={false}
                  loading="lazy"
                />
              </div>

              {/* Título */}
              <h2
                className="font-medium"
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontSize: "clamp(2rem, 2vw, 4.8rem)",
                  lineHeight: "clamp(2.4rem, 2.5vw, 6rem)",
                  color: "#0A0A0A",
                }}
              >
                {a.title}
              </h2>

              {/* Descripción */}
              <p
                className="font-medium"
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontSize: "clamp(1.2rem, 1vw, 2rem)",
                  lineHeight: "clamp(1.6rem, 1.8vw, 2.5rem)",
                  color: "#A6A6A6",
                  marginTop: "clamp(0.4rem, 0.5vw, 1rem)",
                }}
              >
                {a.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden w-full px-6 py-10 space-y-12">
        {articles.map((a) => (
          <div
            key={a.id}
            onClick={() => navigate(`/blog/${a.slug}`)}
            className="flex flex-col gap-4 cursor-pointer"
            data-cursor="view"
            data-cursor-label="Leer más"
          >
            <div className="overflow-hidden rounded-sm bg-[#D9D9D9]">
              <img
                src={a.image}
                alt={a.title}
                className="object-cover w-full h-auto transition-transform duration-300 hover:scale-105"
                draggable={false}
                loading="lazy"
              />
            </div>
            <h2 className="font-medium text-[#0A0A0A] text-[clamp(1.8rem,5vw,3rem)] leading-tight">
              {a.title}
            </h2>
            <p className="text-[#A6A6A6] text-[clamp(1.2rem,4vw,1.8rem)]">
              {a.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
