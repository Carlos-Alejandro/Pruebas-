import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function DesignSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const images = {
    main: "/src/assets/Servicios_Detalles/img1.png",
    topRight: "/src/assets/Servicios_Detalles/img2.png",
    midRight: "/src/assets/Servicios_Detalles/img3.png",
    wideRight: "/src/assets/Servicios_Detalles/img4.png",
  };

  // ✅ Altura dinámica (idéntica a ServicesSection)
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

  // ✅ Scroll horizontal suave (idéntico comportamiento base)
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

  return (
    <main
      ref={sectionRef}
      className="bg-neutral-50 text-neutral-900 flex justify-center items-center relative overflow-hidden"
      style={{
        overflow: "visible",
        position: "static",
        zIndex: "auto",
      }}
    >
      {/* 🔙 Botón volver */}
      <button
        onClick={() => navigate("/servicios")}
        data-cursor="link"
        className="absolute left-[clamp(6rem,7vw,10rem)] top-[clamp(1rem,9vw,10rem)]
                  text-neutral-400 hover:text-neutral-700 transition-colors
                  text-[clamp(1.4rem,1.2vw,1.8rem)] z-20 tracking-wide"
      >
        ← Volver
      </button>

      {/* 🖥️ DESKTOP / TABLET */}
      <div
        ref={scrollerRef}
        className="hidden md:flex overflow-x-auto overflow-y-hidden w-full h-full select-none [&::-webkit-scrollbar]:hidden cursor-grab pointer-events-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div
          className="flex justify-start items-center mx-auto"
          style={{
            gap: "clamp(2rem, 2.5vw, 4rem)",
            paddingLeft: "clamp(8rem, 10vw, 16.4rem)",
            paddingRight: "clamp(2rem, 4vw, 7rem)",
            minWidth: "fit-content",
            maxWidth: "clamp(140rem, 90vw, 226.7rem)",
            height: "100%", // 🔹 usa toda la altura dinámica del main
          }}
        >
          {/* 🔹 BLOQUE DE TEXTO */}
          <div
            className="flex flex-col items-end justify-center text-right flex-shrink-0"
            style={{
              width: "41.8rem",
              height: "29.8rem",
            }}
          >
            <h2
              className="font-medium"
              style={{
                width: "clamp(20rem, 24vw, 30.9rem)",
                fontSize: "clamp(2.8rem, 2.6vw, 4.8rem)",
                lineHeight: "clamp(3rem, 2.8vw, 4.8rem)",
                fontWeight: 500,
                fontFamily: "'Cabinet Grotesk', sans-serif",
                color: "#A6A6A6",
                textAlign: "right",
                marginBottom: "clamp(0.4rem, 0.6vw, 0.8rem)",
              }}
            >
              <span
                className="block"
                style={{
                  fontSize: "clamp(2.8rem, 3vw, 4.8rem)",
                  color: "#A6A6A6",
                }}
              >
                01
              </span>
              <span style={{ color: "#0A0A0A" }}>Diseño Arquitectónico</span>
            </h2>

            <p
              style={{
                marginTop: 0,
                width: "clamp(26rem, 35vw, 41.8rem)",
                fontSize: "clamp(1.3rem, 1.5vw, 2rem)",
                lineHeight: "clamp(1.9rem, 2vw, 2.5rem)",
                fontWeight: 500,
                color: "#0A0A0A",
                textAlign: "right",
              }}
            >
              Desarrollamos proyectos arquitectónicos desde la conceptualización
              hasta el detalle ejecutivo. Cada diseño nace de la empatía y se
              plasma con claridad, buscando siempre la armonía entre forma,
              función y alma.
            </p>
          </div>

          {/* 🔹 BLOQUE DE IMÁGENES */}
          <div
            className="flex flex-row flex-shrink-0"
            style={{
              gap: "clamp(1.4rem, 1.6vw, 2.4rem)",
              width: "clamp(110rem, 85vw, 171rem)",
              alignItems: "flex-start",
            }}
          >
            <div
              className="overflow-hidden bg-[#D9D9D9] flex-shrink-0 rounded-sm"
              style={{
                width: "clamp(44rem, 47vw, 88.3rem)",
                height: "clamp(27rem, 28vw, 55.8rem)",
              }}
            >
              <img
                src={images.main}
                alt="principal"
                className="object-cover w-full h-full"
                draggable={false}
              />
            </div>

            <div
              className="flex flex-col justify-start flex-shrink-0"
              style={{
                width: "clamp(42rem, 38vw, 88.7rem)",
                gap: "clamp(0.8rem, 1vw, 1.4rem)",
              }}
            >
              <div
                className="flex justify-between items-start"
                style={{
                  gap: "clamp(0.8rem, 1vw, 1.4rem)",
                }}
              >
                <div
                  className="overflow-hidden bg-[#D9D9D9] rounded-sm flex-shrink-0"
                  style={{
                    width: "clamp(20rem, 19vw, 42.4rem)",
                    height: "clamp(12rem, 13vw, 26.9rem)",
                  }}
                >
                  <img
                    src={images.topRight}
                    alt="arriba"
                    className="object-cover w-full h-full"
                    draggable={false}
                  />
                </div>

                <div
                  className="overflow-hidden bg-[#D9D9D9] rounded-sm flex-shrink-0"
                  style={{
                    width: "clamp(21rem, 20vw, 44.4rem)",
                    height: "clamp(12rem, 13vw, 26.9rem)",
                  }}
                >
                  <img
                    src={images.midRight}
                    alt="medio"
                    className="object-cover w-full h-full"
                    draggable={false}
                  />
                </div>
              </div>

              <div
                className="overflow-hidden bg-[#D9D9D9] rounded-sm flex-shrink-0"
                style={{
                  width: "clamp(42rem, 39vw, 88.7rem)",
                  height: "clamp(12rem, 13vw, 26.7rem)",
                  marginTop: "clamp(0.8rem, 1vw, 1.2rem)",
                }}
              >
                <img
                  src={images.wideRight}
                  alt="ancha"
                  className="object-cover w-full h-full"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 📱 MOBILE */}
      <div className="md:hidden w-full px-6 py-10 space-y-8">
        <div className="text-right space-y-2">
          <h2 className="text-[clamp(2rem,6vw,3.6rem)] text-[#0A0A0A] font-medium leading-tight">
            <span className="block text-[#A6A6A6] text-[clamp(1.6rem,5vw,2.6rem)] mb-1">
              01
            </span>
            Diseño Arquitectónico
          </h2>
          <p className="text-[#0A0A0A] font-medium text-[clamp(1.4rem,4vw,1.8rem)] leading-relaxed">
            Desarrollamos proyectos arquitectónicos desde la conceptualización
            hasta el detalle ejecutivo. Cada diseño nace de la empatía y se
            plasma con claridad, buscando siempre la armonía entre forma,
            función y alma.
          </p>
        </div>

        <div className="space-y-4">
          <img
            src={images.main}
            className="w-full h-auto object-cover rounded-sm"
            alt="principal"
          />
          <div className="grid grid-cols-2 gap-4">
            <img
              src={images.topRight}
              className="w-full h-auto object-cover rounded-sm"
              alt="arriba"
            />
            <img
              src={images.midRight}
              className="w-full h-auto object-cover rounded-sm"
              alt="medio"
            />
          </div>
          <img
            src={images.wideRight}
            className="w-full h-auto object-cover rounded-sm"
            alt="ancha"
          />
        </div>
      </div>
    </main>
  );
}
