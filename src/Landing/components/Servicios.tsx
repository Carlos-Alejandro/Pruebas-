// src/Landing/components/Servicios.tsx
import React, { useState } from "react";
import ArrowUpBlack from "../../assets/arrow.svg";
import ArrowDownGray from "../../assets/arrowDow.svg";

const UI = {
  gray: "#979797",
  line: "#333333",
  lineW: "0.2rem",
  padXRem: 2.0,
  rowPYRem: 2.7,
  gapNumTitleRem: 1.0,
};

const Servicios: React.FC = () => {
  const items = [
    {
      title: "DESARROLLO HABITACIONAL",
      desc:
        "Diseño y construcción de viviendas residenciales, desarrollos verticales y urbanización de lotes.",
    },
    { title: "INFRAESTRUCTURA PARA PATIOS LOGISTICOS", desc: "" },
    { title: "PROYECTOS PORTUARIOS", desc: "" },
    { title: "OBRA PUBLICA", desc: "" },
    { title: "OBRAS COMPLEMENTARIAS", desc: "" },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="servicios" className="bg-[#E5E5E4] text-[#0F0F0F]">
      {/* ====== SOLO MOBILE: overrides sin tocar desktop ====== */}
      <style>{`
        @media (max-width: 1279.98px) {
          /* contenedor */
          .svc { 
            max-width: 100% !important; 
            padding: 3.2rem 2rem 6rem !important; 
          }
          /* /SERVICIOS */
          .svc__title {
            font-size: 2.0rem !important;
            line-height: 3.2rem !important;
            padding: 0 !important;
            margin-bottom: 2rem !important;
          }
          /* fila */
          .svc__btn {
            padding-top: 1.6rem !important;
            padding-bottom: 1.6rem !important;
          }
          .svc__li {
            border-bottom-width: 0.1rem !important;
          }
          /* número y título (más chicos y título con wrap) */
          .svc__num,
          .svc__label {
            font-size: 2.4rem !important;
            line-height: 3.2rem !important;
            letter-spacing: 0.02em;
            font-weight: 600 !important;
          }
          .svc__label {
            white-space: normal !important; /* permite varias líneas */
          }
          /* flecha */
          .svc__arrow {
            width: 2.4rem !important;
            height: 2.2rem !important;
          }
          /* descripción abierta */
          .svc__desc {
            font-size: 1.6rem !important;
            line-height: 2.2rem !important;
            padding-left: 0 !important;
            margin-bottom: 1.6rem !important;
          }
        }
      `}</style>

      <div
        className="mx-auto svc"
        style={{ maxWidth: "171.4rem", padding: `8rem ${UI.padXRem}rem 10.8rem` }}
      >
        {/* Encabezado (desktop se queda igual; mobile se sobreescribe arriba) */}
        <div
          className="svc__title text-[3.6rem] leading-[5.8rem] font-extrabold px-[4.0rem]"
          style={{ color: UI.gray, marginBottom: "6rem" }}
        >
          /SERVICIOS
        </div>

        <ul className="w-full list-none m-0 p-0" style={{ marginTop: "1.2rem" }}>
          {items.map((it, i) => {
            const isOpen = openIndex === i;
            const idx = String(i + 1).padStart(2, "0");
            const titleColor = isOpen ? "#000000" : UI.gray;

            return (
              <li
                key={i}
                className="w-full svc__li"
                style={{
                  borderBottom: `${UI.lineW} solid ${UI.line}`,
                  borderTop: i === 0 ? `${UI.lineW} solid ${UI.line}` : undefined,
                }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex((p) => (p === i ? -1 : i))}
                  className="w-full flex items-center justify-between select-none svc__btn"
                  style={{
                    paddingTop: `${UI.rowPYRem}rem`,
                    paddingBottom: `${UI.rowPYRem}rem`,
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    appearance: "none",
                    background: "transparent",
                    border: 0,
                    outline: "none",
                  }}
                >
                  <div
                    className="flex items-baseline"
                    style={{ columnGap: `${UI.gapNumTitleRem}rem` }}
                  >
                    <span
                      className={`svc__num text-[6.4rem] leading-[8.5rem] tracking-[0.02em] ${
                        isOpen ? "font-extrabold" : "font-bold"
                      }`}
                      style={{ color: titleColor }}
                    >
                      {idx}
                    </span>

                    <span
                      className={`svc__label text-[6.4rem] leading-[8.5rem] tracking-[0.02em] ${
                        isOpen ? "font-extrabold" : "font-bold"
                      } whitespace-nowrap`}
                      style={{ color: titleColor }}
                    >
                      {it.title}
                    </span>
                  </div>

                  <img
                    src={isOpen ? ArrowUpBlack : ArrowDownGray}
                    width={42}
                    height={39}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="select-none svc__arrow"
                  />
                </button>

                {isOpen && it.desc && (
                  <p
                    className="svc__desc text-[3.2rem] leading-[3.6rem] text-black font-serif"
                    style={{
                      marginTop: "1rem",
                      marginBottom: "2.5rem",
                      paddingLeft: 0,
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {it.desc}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Servicios;
