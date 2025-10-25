import React from "react";
import { MdArrowForward, MdKeyboardArrowDown } from "react-icons/md";
import muebleImage from "/Header/Mueble.svg";
import mesa from "/Header/Mesa.svg";
import silla from "/Header/Silla.svg";

const HederE: React.FC = () => {
  return (
    <section
      className="bg-[#F1EBDF] shadow-md w-full border-b border-[#261900]"
    >
      {/* ====== MÓVIL / TABLET: solo 3 columnas en acordeón ====== */}
      <div className="lg:hidden w-full mx-auto py-6">
        {/* Item 1: CATEGORÍAS (abierto por defecto) */}
        <details open className="border-b border-[#261900]/30 px-4 ">
          <summary className="list-none cursor-pointer select-none py-4 flex items-center justify-between">
            <h2
              className="text-[#261900] font-semibold text-[1.8rem]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              CATEGORÍAS
            </h2>
            <MdArrowForward
              className="text-[#261900] text-[2.4rem] transition-transform duration-200"
            />
          </summary>

          <ul
            className="pb-4 space-y-[1.2rem] text-[1.7rem] text-[#666666] font-medium"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <li>Sillas</li>
            <li>Mesas</li>
            <li>Almacenamiento</li>
            <li>Cama y baño</li>
            <li>Cocina</li>
            <li>Iluminación</li>
            <li>Exterior</li>
            <li>Arte y decoración</li>
          </ul>
        </details>

        {/* Item 2: ORDENAR POR */}
        <details className="border-b border-[#261900]/30 px-4 ">
          <summary className="list-none cursor-pointer select-none py-4 flex items-center justify-between">
            <h2
              className="text-[#261900] font-semibold text-[1.8rem]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              ORDENAR POR
            </h2>
            <MdArrowForward className="text-[#261900] text-[2.4rem] transition-transform duration-200" />
          </summary>

          <ul
            className="pb-4 space-y-[1.2rem] text-[1.7rem] text-[#666666] font-medium"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <li>Menor a mayor</li>
            <li>Mayor a menor</li>
            <li>Nuevos</li>
            <li>Más vendidos</li>
            <li>A - Z</li>
            <li>Z - A</li>
            <li>Disponible</li>
          </ul>
        </details>

        {/* Item 3: FILTRAR POR */}
        <details className="border-b border-[#261900]/30 px-4 ">
          <summary className="list-none cursor-pointer select-none py-4 flex items-center justify-between">
            <h2
              className="text-[#261900] font-semibold text-[1.8rem]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              FILTRAR POR
            </h2>
            <MdArrowForward className="text-[#261900] text-[2.4rem] transition-transform duration-200" />
          </summary>

          <ul
            className="pb-4 space-y-[1.2rem] text-[1.7rem] text-[#666666] font-medium"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <li>$0 - $10,000</li>
            <li>$10,000 - $30,000</li>
            <li>$30,000 - $50,000</li>
            <li>+ $50,000</li>
          </ul>
        </details>

        {/* Pequeño script CSS para girar la flecha cuando está abierto (no JS extra) */}
          {/* Rotación del ícono: abajo (cerrado) → arriba (abierto) */}
  <style>{`
    details summary svg {
      transform: rotate(90deg);
      transition: transform 200ms ease;
    }
    details[open] summary svg {
      transform: rotate(-90deg);
    }
  `}</style>
      </div>

      {/* ====== DESKTOP (≥lg): layout proporcional 1440↔1920 con altura máx 51.5rem ====== */}
      <div
        className="hidden lg:block"
        style={
          {
            // Escala global: 1920 => 1 ; 1440 => 0.75
            "--s": "calc(min(100vw, 192rem) / 192rem)",
          } as React.CSSProperties
        }
      >
        <div
          style={{
            // Altura máxima 51.5rem y escala hacia abajo en proporción
            height: "clamp(0rem, calc(51.5rem * var(--s)), 51.5rem)",
            overflow: "hidden",
          }}
        >
          {/* Contenedor principal (ancho/padding escalados) */}
          <div
            style={{
              width: "calc(192rem * var(--s))",
              marginLeft: "auto",
              marginRight: "auto",
              paddingLeft: "calc(3.5rem * var(--s))",
              paddingRight: "calc(3.5rem * var(--s))",
              paddingTop: "calc(6.6rem * var(--s))",
              paddingBottom: "calc(6.3rem * var(--s))",
            }}
          >
            <div className="grid grid-cols-6">
              {/* Col 1 */}
              <div
                className="flex flex-col justify-between"
                style={{
                  width: "calc(17.8rem * var(--s))",
                  height: "calc(35.2rem * var(--s))",
                }}
              >
                <div className="flex flex-col" style={{ gap: "calc(2.2rem * var(--s))" }}>
                  <h1
                    className="text-[#261900] font-semibold"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "calc(2rem * var(--s))",
                      lineHeight: 1.1,
                    }}
                  >
                    CATEGORÍAS
                  </h1>
                  <ul
                    className="text-[#666666] font-medium"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "calc(2rem * var(--s))",
                      lineHeight: 1.25,
                    }}
                  >
                    <li>Sillas</li>
                    <li>Mesas</li>
                    <li>Almacenamiento</li>
                    <li>Cama y baño</li>
                    <li>Cocina</li>
                    <li>Iluminación</li>
                    <li>Exterior</li>
                    <li>Arte y decoración</li>
                  </ul>
                </div>
                <div className="flex items-end justify-start">
                  <h1
                    className="text-[#261900] font-semibold"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "calc(2rem * var(--s))",
                      lineHeight: 1.1,
                    }}
                  >
                    Ver Todo{" "}
                    <MdArrowForward
                      className="inline-block align-middle"
                      style={{ fontSize: "calc(1.5rem * var(--s))" }}
                    />
                  </h1>
                </div>
              </div>

              {/* Col 2 */}
              <div
                className="flex flex-col justify-between"
                style={{
                  width: "calc(17.8rem * var(--s))",
                  height: "calc(35.2rem * var(--s))",
                }}
              >
                <div className="flex flex-col" style={{ gap: "calc(2.2rem * var(--s))" }}>
                  <h1
                    className="text-[#261900] font-semibold"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "calc(2rem * var(--s))",
                      lineHeight: 1.1,
                    }}
                  >
                    ORDENAR POR
                  </h1>
                  <ul
                    className="text-[#666666] font-medium"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "calc(2rem * var(--s))",
                      lineHeight: 1.25,
                    }}
                  >
                    <li>Menor a mayor</li>
                    <li>Mayor a menor</li>
                    <li>Nuevos</li>
                    <li>Más vendidos</li>
                    <li>A - Z</li>
                    <li>Z - A</li>
                    <li>Disponible</li>
                  </ul>
                </div>
                <div className="flex items-end justify-start">
                  <h1
                    className="text-[#261900] font-semibold"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "calc(2rem * var(--s))",
                      lineHeight: 1.1,
                    }}
                  >
                    Colecciones{" "}
                    <MdArrowForward
                      className="inline-block align-middle"
                      style={{ fontSize: "calc(1.5rem * var(--s))" }}
                    />
                  </h1>
                </div>
              </div>

              {/* Col 3 */}
              <div
                className="flex flex-col"
                style={{
                  width: "calc(17.8rem * var(--s))",
                  height: "calc(35.2rem * var(--s))",
                }}
              >
                <div className="flex flex-col" style={{ gap: "calc(2.2rem * var(--s))" }}>
                  <h1
                    className="text-[#261900] font-semibold"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "calc(2rem * var(--s))",
                      lineHeight: 1.1,
                    }}
                  >
                    FILTRAR POR
                  </h1>
                  <ul
                    className="text-[#666666] font-medium"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "calc(2rem * var(--s))",
                      lineHeight: 1.25,
                    }}
                  >
                    <li>$0 - $10,000</li>
                    <li>$10,000 - $30,000</li>
                    <li>$30,000 - $50,000</li>
                    <li>+ $50,000</li>
                  </ul>
                </div>
              </div>

              {/* Col 4 */}
              <div className="grid grid-rows-2">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "calc(27.9rem * var(--s))",
                    height: "calc(34.7rem * var(--s))",
                  }}
                >
                  <img
                    src={muebleImage}
                    alt="Mueble"
                    className="object-contain"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div
                  className="flex items-center justify-start"
                  style={{ height: "calc(3.9rem * var(--s))" }}
                >
                  <h1
                    className="text-[#261900] font-semibold"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "calc(2rem * var(--s))",
                      lineHeight: 1.1,
                    }}
                  >
                    RUSIM
                  </h1>
                </div>
              </div>

              {/* Col 5 */}
              <div className="grid grid-rows-2">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "calc(27.9rem * var(--s))",
                    height: "calc(34.7rem * var(--s))",
                  }}
                >
                  <img
                    src={mesa}
                    alt="Mesa"
                    className="object-contain"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div
                  className="flex items-center justify-start"
                  style={{ height: "calc(3.9rem * var(--s))" }}
                >
                  <h1
                    className="text-[#261900] font-semibold"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "calc(2rem * var(--s))",
                      lineHeight: 1.1,
                    }}
                  >
                    FORJO
                  </h1>
                </div>
              </div>

              {/* Col 6 */}
              <div className="grid grid-rows-2">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "calc(27.9rem * var(--s))",
                    height: "calc(34.7rem * var(--s))",
                  }}
                >
                  <img
                    src={silla}
                    alt="Silla"
                    className="object-contain"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div
                  className="flex items-center justify-start"
                  style={{ height: "calc(3.9rem * var(--s))" }}
                >
                  <h1
                    className="text-[#261900] font-semibold"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "calc(2rem * var(--s))",
                      lineHeight: 1.1,
                    }}
                  >
                    XPU-HA
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </section>
  );
};

export default HederE;
