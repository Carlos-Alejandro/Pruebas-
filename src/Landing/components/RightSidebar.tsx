import React, { useEffect, useMemo, useState, type CSSProperties } from "react";
import ReactDOM from "react-dom";

import Brand from "../../assets/Rigthbar/Circular.svg";
import Instagram from "../../assets/Rigthbar/instagram-brands-solid-full-2.svg";
import Facebook from "../../assets/Rigthbar/facebook.svg";

type RightSidebarProps = {
  widthRem?: number;       // ancho riel (12.6rem)
  background?: string;     // #F2F2F2 (riel)
  borderColor?: string;    // #D9D9D9 (línea)
  showBrand?: boolean;
  panelRem?: number;       // 48rem (panel)
  panelBg?: string;        // #F2F2F2 (panel)
  reserveSpace?: boolean;  // reservar margen a la derecha
};

const RightSidebar: React.FC<RightSidebarProps> = ({
  widthRem = 12.6,
  background = "#F2F2F2",
  borderColor = "#D9D9D9",
  showBrand = true,
  panelRem = 48,
  panelBg = "#F2F2F2",
  reserveSpace = true,
}) => {
  const [open, setOpen] = useState(false);

  // 1rem = 10px + margen derecho opcional para que el contenido no pase por debajo del riel
  useEffect(() => {
    const root = document.documentElement;
    const prevFont = root.style.fontSize;
    const prevPR = document.body.style.paddingRight;
    const prevOverflow = document.body.style.overflow;

    if (!prevFont) root.style.fontSize = "62.5%";
    if (reserveSpace) document.body.style.paddingRight = `${widthRem}rem`;
    if (open) document.body.style.overflow = "hidden";

    return () => {
      if (!prevFont) root.style.fontSize = "";
      if (reserveSpace) document.body.style.paddingRight = prevPR;
      document.body.style.overflow = prevOverflow;
    };
  }, [widthRem, open, reserveSpace]);

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const railW = useMemo(() => `${widthRem}rem`, [widthRem]);
  const panelW = useMemo(() => `${panelRem}rem`, [panelRem]);

  // Overlay con blur (debajo del riel, encima del contenido)
  const overlay: CSSProperties = {
    position: "fixed",
    inset: 0 as any,
    background: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    opacity: open ? 1 : 0,
    pointerEvents: open ? "auto" : "none",
    transition: "opacity 300ms ease",
    zIndex: 2147482998,
  };

  // Panel deslizante ANCLADO a la izquierda del riel fijo
  const panelStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    right: railW,                // << clave: el panel “toca” al riel
    width: panelW,
    height: "100vh",
    background: panelBg,
    transform: open ? "translateX(0)" : "translateX(100%)",
    transition: "transform 300ms ease",
    zIndex: 2147482999,          // debajo del riel, encima del overlay
  };

  // ====== Icono Hamburguesa -> X (animado) ======
  const IconHamburgerX: React.FC<{ open: boolean }> = ({ open }) => {
    // Medidas en rem (match con tu diseño ~35×31 px y trazo “gordo”)
    const w = 3.516;              // 35.16px
    const h = 3.149;              // 31.49px
    const bar = 0.4;              // 4px
    const gap = 0.9;              // distancia entre barras

    const base: CSSProperties = {
      position: "absolute",
      left: 0,
      right: 0,
      top: "50%",
      width: `${w}rem`,
      height: `${bar}rem`,
      borderRadius: 9999,
      background: "#0F0F0F",
      transformOrigin: "50% 50%",
      transition: "transform 300ms ease, opacity 200ms ease",
    };

    return (
      <div
        aria-hidden="true"
        style={{
          position: "relative",
          width: `${w}rem`,
          height: `${h}rem`,
        }}
      >
        {/* Barra superior */}
        <span
          style={{
            ...base,
            transform: open
              ? "translateY(-50%) rotate(45deg)"
              : `translateY(calc(-50% - ${gap}rem)) rotate(0deg)`,
          }}
        />
        {/* Barra media */}
        <span
          style={{
            ...base,
            transform: open ? "translateY(-50%) scaleX(0)" : "translateY(-50%) scaleX(1)",
            opacity: open ? 0 : 1,
          }}
        />
        {/* Barra inferior */}
        <span
          style={{
            ...base,
            transform: open
              ? "translateY(-50%) rotate(-45deg)"
              : `translateY(calc(-50% + ${gap}rem)) rotate(0deg)`,
          }}
        />
      </div>
    );
  };

  // ---- UI ----

  // Riel fijo (siempre visible)
  const rail = (
    <aside
      className="border-l pointer-events-auto"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        width: railW,
        background,
        borderLeftColor: borderColor,
        zIndex: 2147483000, // por encima de panel y overlay
      }}
      aria-label="Barra lateral derecha"
    >
      {/* Top: botón (hamburguesa -> X) */}
      <div className="flex items-center justify-center h-[6.4rem]">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="
            p-[0.6rem] rounded-[0.8rem]
            bg-[#F2F2F2] hover:bg-[#ECECEC]
            transition border-0 outline-none focus:outline-none
          "
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <IconHamburgerX open={open} />
        </button>
      </div>

      {/* Centro: marca vertical */}
      {showBrand && (
        <div className="h-[calc(100%-6.4rem-9.6rem)] flex items-center justify-center">
          <img
            src={Brand}
            alt="@circular"
            className="w-[6.414rem] h-[25.64rem] rotate-180 select-none pointer-events-none"
            draggable={false}
          />
        </div>
      )}

      {/* Bottom: redes */}
      <div className="h-[9.6rem] flex flex-col items-center justify-end gap-[2rem] pb-[2.4rem]">
        <a href="#" aria-label="Instagram" className="hover:opacity-80">
          <img src={Instagram} alt="instagram" className="w-[5.2rem] h-[5.2rem]" />
        </a>
        <a href="#" aria-label="Facebook" className="hover:opacity-80">
          <img src={Facebook} alt="facebook" className="w-[5.2rem] h-[5.2rem]" />
        </a>
      </div>
    </aside>
  );

  // Panel pegado al riel (sin duplicar riel) — se cierra con overlay o con el mismo botón del riel
  const panel = (
    <>
      <div style={overlay} onClick={() => setOpen(false)} aria-hidden="true" />

      <section
        className="h-full flex flex-col pointer-events-auto font-soehne"
        style={panelStyle}
        aria-label="Menú lateral"
      >
        {/* Navegación (idéntica al mock) */}
        <nav className="px-[2.4rem] pt-[1.6rem] select-none">
          <a className="block text-[4.8rem] font-extrabold text-black leading-[6.4rem] mb-[2.4rem]" href="#empresa">
            EMPRESA
          </a>
          <a className="block text-[3.2rem] font-semibold text-[#989898] tracking-[0.02em] leading-[4.4rem] mb-[1.6rem]" href="#servicios">
            SERVICIOS
          </a>
          <a className="block text-[3.2rem] font-semibold text-[#989898] tracking-[0.02em] leading-[4.4rem]" href="#contacto">
            CONTACTO
          </a>
        </nav>

        {/* Dirección / Contacto (negro) */}
        <div className="mt-auto px-[2.4rem] pb-[2.4rem] text-black">
          <div className="mb-[1.6rem]">
            <div className="text-[1.6rem] font-semibold leading-[2rem]">DIRECCIÓN</div>
            <div className="text-[1.6rem] leading-[2.2rem]">
              Calle 10 #43, Herón Proal<br />
              Álvaro Obregón, 01640<br />
              CDMX
            </div>
          </div>
          <div>
            <div className="text-[1.6rem] font-semibold leading-[2rem] mb-[0.6rem]">CONTACTO</div>
            <div className="text-[1.6rem] leading-[2.2rem]">
              jp@circular.uno<br />
              www.circular.uno
            </div>
          </div>
        </div>
      </section>
    </>
  );

  return ReactDOM.createPortal(
    <>
      {rail}
      {panel}
    </>,
    document.body
  );
};

export default RightSidebar;
