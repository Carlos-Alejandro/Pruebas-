import { useEffect, useRef, useState } from "react";

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
    // ---------- Scroller horizontal con DRAG para navegar entre paneles ----------
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [draggingScroll, setDraggingScroll] = useState(false);
    const dragStartX = useRef(0);
    const dragStartScroll = useRef(0);

  const images = {
    main: "/src/assets/productos/img10.png",
    rational: "/src/assets/productos/img11.png",
    bravat: "/src/assets/productos/img12.png",
  };

  

  // ✅ Altura igual a BIM con escalado adaptativo
  useEffect(() => {
    const updateHeight = () => {
      if (!sectionRef.current) return;
      const vh = window.innerHeight;
      let availableHeight = vh - 218; // header (149) + footer (69) = 218px

      // 🔽 Escala adaptativa según ancho
      if (window.innerWidth < 1280) {
        availableHeight *= 0.9; // medianas
      }
      if (window.innerWidth < 768) {
        availableHeight *= 0.8; // móviles
      }

      sectionRef.current.style.minHeight = `${availableHeight}px`;
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // ✅ Scroll horizontal con rueda del mouse
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

    // Drag horizontal sobre el scroller
  const onScrollPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const el = scrollerRef.current;
    if (!el) return;
    setDraggingScroll(true);
    dragStartX.current = e.clientX;
    dragStartScroll.current = el.scrollLeft;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    e.preventDefault();
  };

  const onScrollPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!draggingScroll) return;
    const el = scrollerRef.current;
    if (!el) return;
    e.preventDefault();
    const dx = e.clientX - dragStartX.current;
    el.scrollLeft = dragStartScroll.current - dx;
  };
    const onScrollPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    setDraggingScroll(false);
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  return (
    <section
      ref={sectionRef}
      className="text-[#0A0A0A] flex justify-center items-center relative overflow-hidden"
    >
      {/* DESKTOP: Scroller horizontal continuo (sin snap) */}
      <div
        ref={scrollerRef}
        className={`
          hidden md:block
          w-full overflow-x-auto overflow-y-hidden
          select-none
          overscroll-x-contain
          [&::-webkit-scrollbar]:hidden
          ${draggingScroll ? "cursor-grabbing" : "cursor-grab"}
        `}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onPointerDown={onScrollPointerDown}
        onPointerMove={onScrollPointerMove}
        onPointerUp={onScrollPointerUp}
        onPointerCancel={onScrollPointerUp}
      >
        {/* CONTENEDOR INTERNO */}
        <div
          className="flex justify-start items-start mx-auto"
          style={{
            gap: "clamp(3rem, 4vw, 6rem)",
            paddingLeft: "clamp(5rem, 6vw, 14rem)",
            paddingRight: "clamp(4rem, 5vw, 10rem)",
            paddingTop: "clamp(1rem, 1vw, 6rem)",
            paddingBottom: "clamp(1rem, 1vw, 6rem)",
            minWidth: "fit-content",
            maxWidth: "clamp(160rem, 70vw, 209.5rem)",
          }}
        >
          {/* 🟩 Columna 1 */}
          <div
            className="flex flex-col justify-between flex-shrink-0"
            style={{
              width: "clamp(42rem, 40vw, 65.4rem)",
              
            }}
          >
            <div>
              <h2
                className="font-medium"
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontSize: "clamp(2.4rem, 2.8vw, 6.4rem)",
                  lineHeight: "clamp(2.8rem, 3vw, 7.9rem)",
                  marginBottom: "clamp(1rem, 1.5vw, 2rem)",
                }}
              >
                Productos
              </h2>
              <p
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(1.2rem, 1.1vw, 2rem)",
                  lineHeight: "clamp(1.6rem, 1.5vw, 2.5rem)",
                  color: "#0A0A0A",
                  maxWidth: "clamp(38rem, 35vw, 65rem)",
                }}
              >
                En <b>OUMA</b> colaboramos con marcas internacionales que
                comparten nuestra visión: precisión, diseño y calidad
                constructiva. Cada una aporta un lenguaje técnico y estético que
                se integra a nuestros proyectos, permitiéndonos ofrecer
                soluciones arquitectónicas completas y duraderas.
              </p>
            </div>

            <div
              className="overflow-hidden bg-[#D9D9D9] mt-[clamp(2rem,2vw,3rem)]"
              style={{
                width: "clamp(38rem, 32vw, 65.4rem)",
                height: "clamp(10rem, 10vw, 29.1rem)",
              }}
            >
              <img
                src={images.main}
                alt="Productos"
                className="object-cover w-full h-full"
                draggable={false}
              />
            </div>
          </div>

          {/* 🟦 Columna 2 */}
          <div
            className="flex flex-col justify-start gap-[clamp(3rem,3vw,4rem)] flex-shrink-0"
            style={{
              width: "clamp(38rem, 33vw, 65rem)",
            }}
          >
            {/* Rational */}
            <div>
              <div className="flex justify-between items-start">
                <h3
                  className="font-medium"
                  style={{
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    fontSize: "clamp(1.6rem, 1.6vw, 4rem)",
                    lineHeight: "clamp(2rem, 2vw, 5rem)",
                  }}
                >
                  Rational Küchen
                </h3>
                <img
                  src={images.rational}
                  alt="Rational Logo"
                  style={{
                    width: "clamp(4.8rem, 4.8vw, 7.9rem)",
                    height: "clamp(1.6rem, 1.6vw, 2.5rem)",
                    marginTop: "0.6rem",
                  }}
                />
              </div>
              <p
                className="text-[#A6A6A6] mt-[0.4rem]"
                style={{
                  fontSize: "clamp(1.1rem, 1vw, 1.8rem)",
                  lineHeight: "clamp(1.5rem, 1.3vw, 2.5rem)",
                }}
              >
                Alemania
              </p>
              <p
                className="mt-[clamp(0.8rem,1vw,1.5rem)]"
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(1.1rem, 1vw, 1.8rem)",
                  lineHeight: "clamp(1.7rem, 1.5vw, 2.5rem)",
                }}
              >
                La marca Rational refleja la excelencia del diseño alemán
                aplicado a la cocina. Su filosofía une funcionalidad, ergonomía
                y elegancia minimalista, alineada con el espíritu de OUMA.
              </p>
            </div>

            {/* Bravat */}
            <div>
              <div className="flex justify-between items-start">
                <h3
                  className="font-medium"
                  style={{
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    fontSize: "clamp(1.6rem, 1.6vw, 4rem)",
                    lineHeight: "clamp(2rem, 2vw, 5rem)",
                  }}
                >
                  Bravat by Dietsche
                </h3>
                <img
                  src={images.bravat}
                  alt="Bravat Logo"
                  style={{
                    width: "clamp(5.5rem, 6vw, 8.7rem)",
                    height: "clamp(1.6rem, 1.8vw, 2.4rem)",
                    marginTop: "0.6rem",
                  }}
                />
              </div>
              <p
                className="text-[#A6A6A6] mt-[0.4rem]"
                style={{
                  fontSize: "clamp(1.1rem, 1vw, 1.8rem)",
                  lineHeight: "clamp(1.5rem, 1.3vw, 2.5rem)",
                }}
              >
                Alemania, China, Vietnam
              </p>
              <p
                className="mt-[clamp(0.8rem,1vw,1.5rem)]"
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(1.1rem, 1vw, 1.8rem)",
                  lineHeight: "clamp(1.7rem, 1.5vw, 2.5rem)",
                }}
              >
                Desde 1873, Bravat representa la tradición alemana en diseño
                sanitario de alta gama. Su producción combina ingeniería europea
                con tecnología asiática, garantizando eficiencia y estética
                contemporánea.
              </p>
            </div>
          </div>

          {/* 🟥 Columna 3 */}
          <div
            className="flex flex-col justify-start flex-shrink-0"
            style={{
              width: "clamp(36rem, 30vw, 65rem)",
            }}
          >
            <h3
              className="font-medium"
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: "clamp(1.6rem, 1.6vw, 4rem)",
                lineHeight: "clamp(2rem, 2vw, 5rem)",
              }}
            >
              Stanley
            </h3>
            <p
              className="text-[#A6A6A6] mt-[0.4rem]"
              style={{
                fontSize: "clamp(1.1rem, 1vw, 1.8rem)",
                lineHeight: "clamp(1.5rem, 1.3vw, 2.5rem)",
              }}
            >
              Estados Unidos, China
            </p>
            <p
              className="mt-[clamp(0.8rem,1vw,1.5rem)]"
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(1.1rem, 1vw, 1.8rem)",
                lineHeight: "clamp(1.7rem, 1.5vw, 2.5rem)",
                maxWidth: "65rem",
              }}
            >
              Con licencia en 17 países asiáticos, Stanley combina innovación y
              resistencia en herrajes, cerraduras y sistemas de carpintería
              metálica. Su enfoque técnico permite integrar soluciones seguras y
              estéticas en proyectos arquitectónicos de cualquier escala.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
