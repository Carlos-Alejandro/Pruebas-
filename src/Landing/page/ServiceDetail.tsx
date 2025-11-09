export default function DesignSection() {
  const images = {
    main: "/src/assets/ouma/CASA-MAY-2.png", // imagen principal grande
    topRight: "/src/assets/ouma/2104.i101.058.png", // imagen pequeña arriba
    midRight: "/src/assets/ouma/OIU9P10.png", // imagen pequeña abajo
    wideRight: "/src/assets/ouma/OIU9MR0.png", // imagen ancha (debajo de ambas)
  };

  return (
    <section
  className="
    relative w-full max-w-[192rem] mx-auto
    bg-[#FFFFFF]
    border-b border-[#E5E5E5]
    overflow-x-auto overflow-y-hidden
    scrollbar-hide
    flex justify-center items-center
    pt-[clamp(2rem,4vh,5rem)]
    pb-0
  "
  style={{
    transform: "scale(0.9)",
    transformOrigin: "top center",
  }}
>

      {/* 🔹 Contenedor horizontal con scroll */}
      <div
        className="
          flex gap-[clamp(2rem,3vw,4rem)]
          snap-x snap-mandatory
          overflow-x-scroll
          pb-[clamp(1rem,2vw,2rem)]
          px-[clamp(2rem,4vw,7rem)]
        "
        style={{
          maxWidth: "clamp(120rem, 95vw, 226.7rem)",
          maxHeight: "clamp(28rem, 45vw, 56.4rem)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {/* 🔹 Bloque de texto alineado a la derecha */}
        <div
          className="
            flex-shrink-0
            flex flex-col items-end justify-start
            text-right
            w-[clamp(28rem,35vw,41.8rem)]
          "
        >
          <h2
            className="font-[Cabinet Grotesk] font-[500] leading-[1.1]"
            style={{
              fontSize: "clamp(3rem, 3.2vw, 4.8rem)",
              lineHeight: "clamp(3rem, 3.2vw, 5rem)",
              color: "#0A0A0A",
              marginBottom: "clamp(1.2rem, 2vw, 2rem)",
              textAlign: "right",
            }}
          >
            <span
              style={{
                color: "#A6A6A6",
                fontSize: "clamp(2rem, 2.2vw, 3.2rem)",
                marginLeft: "0.8rem",
                display: "block",
              }}
            >
              01
            </span>
            Diseño Arquitectónico
          </h2>

          <p
            className="font-[Cabinet Grotesk] font-[500] text-[#0A0A0A]"
            style={{
              width: "clamp(25rem, 45vw, 41.8rem)",
              fontSize: "clamp(1.4rem, 1.6vw, 2rem)",
              lineHeight: "clamp(2rem, 2.4vw, 2.6rem)",
              textAlign: "right",
            }}
          >
            Desarrollamos proyectos arquitectónicos desde la conceptualización
            hasta el detalle ejecutivo. Cada diseño nace de la empatía y se
            plasma con claridad, buscando siempre la armonía entre forma,
            función y alma.
          </p>
        </div>

        {/* 🔹 Contenedor derecho: imagen principal + subgrid derecha */}
        <div
          className="flex flex-row gap-[clamp(1.5rem,2vw,3rem)] flex-shrink-0"
          style={{ width: "clamp(160rem, 90vw, 185rem)" }}
        >
          {/* Imagen principal */}
          <div
            className="overflow-hidden bg-[#D9D9D9] rounded-none flex-shrink-0"
            style={{
              width: "clamp(60rem, 60vw, 88.3rem)",
              height: "clamp(30rem, 40vw, 55.8rem)",
              borderRadius: "0.2rem",
            }}
          >
            <img
              src={images.main}
              alt="Casa May"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 🔹 Subcolumna derecha */}
          <div
            className="flex flex-col justify-between gap-[clamp(1rem,1.5vw,2rem)] flex-shrink-0"
            style={{
              width: "clamp(90rem, 40vw, 100rem)",
            }}
          >
            {/* Dos imágenes pequeñas arriba */}
            <div className="flex gap-[clamp(1rem,1.5vw,2rem)]">
              <div
                className="overflow-hidden bg-[#D9D9D9] rounded-none flex-shrink-0"
                style={{
                  width: "clamp(28rem, 30vw, 42.4rem)",
                  height: "clamp(18rem, 22vw, 26.9rem)",
                }}
              >
                <img
                  src={images.topRight}
                  alt="Render superior"
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="overflow-hidden bg-[#D9D9D9] rounded-none flex-shrink-0"
                style={{
                  width: "clamp(30rem, 35vw, 44.4rem)",
                  height: "clamp(18rem, 22vw, 26.9rem)",
                }}
              >
                <img
                  src={images.midRight}
                  alt="Render medio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Imagen ancha inferior */}
            <div
              className="overflow-hidden bg-[#D9D9D9] rounded-none flex-shrink-0"
              style={{
                width: "clamp(60rem, 65vw, 88.7rem)",
                height: "clamp(18rem, 18.7vw, 26.7rem)",
              }}
            >
              <img
                src={images.wideRight}
                alt="Render inferior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
