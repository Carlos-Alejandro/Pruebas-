// src/Landing/components/Servicios.tsx
import React, { useState } from "react";
import ArrowUpBlack from "../../assets/arrow.svg";
import ArrowDownGray from "../../assets/arrowDow.svg";

const UI = {
  gray: "#979797",
  line: "#333333",
  lineW: "0.2rem",      // ← grosor de líneas (antes 0.1rem)
  padXRem: 2.0,         // ← menos padding lateral (antes 4)
  rowPYRem: 2.7,
  gapNumTitleRem: 1.0,  // ← menos espacio entre número y título (antes 1.6)
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
      <div
        className="mx-auto"
        style={{ maxWidth: "171.4rem", padding: `8rem ${UI.padXRem}rem 10.8rem` }}
      >
        {/* /SERVICIOS */}
        <div className="text-[3.6rem] leading-[4.8rem] font-bold" style={{ color: UI.gray }}>
          /SERVICIOS
        </div>

        {/* Línea superior (más gruesa y #333) */}
        <div style={{ height: UI.lineW, background: UI.line, marginTop: "10.7rem" }} />

        {/* Lista */}
        <ul className="w-full list-none m-0 p-0">
          {items.map((it, i) => {
            const isOpen = openIndex === i;
            const idx = String(i + 1).padStart(2, "0");
            const titleColor = isOpen ? "#000000" : UI.gray;

            return (
              <li
                key={i}
                className="w-full"
                style={{ borderBottom: `${UI.lineW} solid ${UI.line}` }} // ← TODAS las líneas más gruesas
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex((p) => (p === i ? -1 : i))}
                  className="w-full flex items-center justify-between select-none"
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
                    {/* Número en negritas */}
                    <span
                      className={`text-[6.4rem] leading-[8.5rem] tracking-[0.02em] ${
                        isOpen ? "font-extrabold" : "font-bold"
                      }`}
                      style={{ color: titleColor }}
                    >
                      {idx}
                    </span>

                    {/* Título: SIN salto de línea y menos espacio al inicio */}
                    <span
                      className={`text-[6.4rem] leading-[8.5rem] tracking-[0.02em] ${
                        isOpen ? "font-extrabold" : "font-bold"
                      } whitespace-nowrap`}  // ← fuerza una sola línea
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
                    className="select-none"
                  />
                </button>

                {isOpen && it.desc && (
                  <p
                    className="text-[3.2rem] leading-[3.6rem] text-black font-serif"
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
