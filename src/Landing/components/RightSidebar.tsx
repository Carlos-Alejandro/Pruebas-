import React, { useEffect, useMemo, useState, type CSSProperties } from "react";
import ReactDOM from "react-dom";

import Brand from "../../assets/Rigthbar/Circular.svg";
import Instagram from "../../assets/Rigthbar/instagram-brands-solid-full-2.svg";
import Facebook from "../../assets/Rigthbar/facebook.svg";

type RightSidebarProps = {
  widthRem?: number;      // ancho del rail de desktop
  background?: string;
  borderColor?: string;
  showBrand?: boolean;
  panelRem?: number;      // ancho del panel lateral en desktop
  panelBg?: string;
  reserveSpace?: boolean; // deja espacio en body para el rail en desktop
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
  // 🔒 Importante: arrancar con el valor real para evitar “parpadeos”
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 1279.98px)").matches
  );
  const [open, setOpen] = useState(false);

  // Reaccionar cuando cambie el viewport
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1279.98px)");
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // Desktop: deja padding-right fijo si así se pidió
  useEffect(() => {
    if (isMobile) return; // ❗️no tocar nada en mobile
    const prevPR = document.body.style.paddingRight;
    const prevRootFont = document.documentElement.style.fontSize;
    if (!prevRootFont) document.documentElement.style.fontSize = "62.5%";
    if (reserveSpace) document.body.style.paddingRight = `${widthRem}rem`;
    return () => {
      if (reserveSpace) document.body.style.paddingRight = prevPR;
      if (!prevRootFont) document.documentElement.style.fontSize = "";
    };
  }, [isMobile, widthRem, reserveSpace]);

  // Mobile: bloquear scroll cuando el panel está abierto
  useEffect(() => {
    if (!isMobile) return;
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, isMobile]);

  // Cierra con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const railW = useMemo(() => `${widthRem}rem`, [widthRem]);
  const panelW = useMemo(() => `${panelRem}rem`, [panelRem]);

  /** ---------- Icono Hamburguesa / X (reutilizado) ---------- */
  const IconHamburgerX: React.FC<{ open: boolean }> = ({ open }) => {
    const w = 28, h = 25, bar = 3, gap = 7;
    const base: CSSProperties = {
      position: "absolute",
      left: 0,
      right: 0,
      top: "50%",
      width: w,
      height: bar,
      borderRadius: 9999,
      background: "#0F0F0F",
      transformOrigin: "50% 50%",
      transition: "transform 260ms ease, opacity 180ms ease",
    };
    return (
      <div aria-hidden="true" style={{ position: "relative", width: w, height: h }}>
        <span style={{ ...base, transform: open ? "translateY(-50%) rotate(45deg)" : `translateY(calc(-50% - ${gap}px))` }} />
        <span style={{ ...base, transform: open ? "translateY(-50%) scaleX(0)" : "translateY(-50%)", opacity: open ? 0 : 1 }} />
        <span style={{ ...base, transform: open ? "translateY(-50%) rotate(-45deg)" : `translateY(calc(-50% + ${gap}px))` }} />
      </div>
    );
  };

  /** ===================== DESKTOP ===================== */
  const railDesktop = !isMobile && (
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
        zIndex: 2147483000,
      }}
      aria-label="Barra lateral derecha (desktop)"
    >
      {/* botón */}
      <div className="flex items-center justify-center h-[6.4rem]">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="p-[0.6rem] rounded-[0.8rem] bg-[#F2F2F2] hover:bg-[#ECECEC] transition border-0 outline-none focus:outline-none"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <IconHamburgerX open={open} />
        </button>
      </div>

      {/* logo vertical */}
      {showBrand && (
        <div className="h-[calc(100%-6.4rem-9.6rem)] flex items-center justify-center">
          <img
            src={Brand}
            alt="@circular"
            className="w-[6.414rem] h-[25.64rem] select-none pointer-events-none"
            draggable={false}
          />
        </div>
      )}

      {/* social */}
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

  const overlayDesktop: CSSProperties = {
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

  const panelDesktop: CSSProperties = {
    position: "fixed",
    top: 0,
    right: railW,
    width: panelW,
    height: "100vh",
    background: panelBg,
    transform: open ? "translateX(0)" : "translateX(100%)",
    transition: "transform 300ms ease",
    zIndex: 2147482999,
  };

  const panelContentDesktop = !isMobile && (
    <>
      <div style={overlayDesktop} onClick={() => setOpen(false)} aria-hidden="true" />
      <section
        className="h-full flex flex-col pointer-events-auto font-soehne"
        style={panelDesktop}
        aria-label="Menú lateral"
      >
        <nav className="pt-[6.5rem] pl-[4rem] pr-[2.4rem] select-none">
          <a href="#empresa" style={{ color: "#0F0F0F" }} className="block text-[4.8rem] leading-[6.4rem] font-extrabold mb-[2.4rem]">EMPRESA</a>
          <a href="#servicios" className="block text-[4.8rem] leading-[6.4rem] font-semibold tracking-[0.02em] text-[#989898] mb-[1.6rem]">SERVICIOS</a>
          <a href="#contacto" className="block text-[4.8rem] leading-[6.4rem] font-semibold tracking-[0.02em] text-[#989898]">CONTACTO</a>
        </nav>
        <div className="mt-auto px-[2.4rem] pb-[2.4rem] text-black">
          <div className="mb-[1.6rem]">
            <div className="text-[1.6rem] font-semibold leading-[2rem]">DIRECCIÓN</div>
            <div className="text-[1.6rem] leading-[2.2rem]">
              Calle 10 #43, Herón Proal<br />Álvaro Obregón, 01640<br />CDMX
            </div>
          </div>
          <div>
            <div className="text-[1.6rem] font-semibold leading-[2rem] mb-[0.6rem]">CONTACTO</div>
            <div className="text-[1.6rem] leading-[2.2rem]">
              jp@circular.uno<br />www.circular.uno
            </div>
          </div>
        </div>
      </section>
    </>
  );

  /** ===================== MOBILE ===================== */
  const topBarMobile = isMobile && (
    <header
      style={{
        position: "fixed",
        inset: "0 auto auto 0",
        width: "100vw",               // 💡 full-bleed
        height: "64px",
        background: "#F2F2F2",
        borderBottom: "1px solid #D9D9D9",
        zIndex: 2147483602,
        boxSizing: "border-box",
        transform: "translateZ(0)",   // evita sub-píxeles
      }}
      aria-label="Barra superior móvil"
    >
      <div className="h-full px-[16px] flex items-center justify-between">
        <img
          src={Brand}
          alt="Circular"
          className="h-[28px] w-auto select-none"
          style={{ objectFit: "contain" }}
          draggable={false}
        />
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="p-[8px] rounded-[8px] bg-[#F2F2F2] hover:bg-[#ECECEC] active:scale-[0.98] transition"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <IconHamburgerX open={open} />
        </button>
      </div>
    </header>
  );

  const overlayMobile: CSSProperties = {
    position: "fixed",
    inset: 0 as any,
    background: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    opacity: open ? 1 : 0,
    pointerEvents: open ? "auto" : "none",
    transition: "opacity 260ms ease",
    zIndex: 2147483600,
  };

  const panelMobile: CSSProperties = {
    position: "fixed",
    top: 0,
    right: 0,
    width: "100vw",                // panel full-screen
    height: "100vh",
    background: "#F2F2F2",
    transform: open ? "translateX(0)" : "translateX(100%)",
    transition: "transform 300ms ease",
    zIndex: 2147483601,
    display: "flex",
    flexDirection: "column",
  };

  const panelContentMobile = isMobile && (
    <>
      <div style={overlayMobile} onClick={() => setOpen(false)} aria-hidden="true" />
      <section style={panelMobile} aria-label="Menú lateral móvil">
        <nav className="pt-[96px] px-[24px] select-none">
          <a
            href="#empresa"
            style={{ color: "#0F0F0F" }}
            className="block text-[clamp(28px,7vw,48px)] leading-[clamp(36px,8vw,64px)] font-extrabold mb-[16px]"
            onClick={() => setOpen(false)}
          >
            EMPRESA
          </a>
          <a
            href="#servicios"
            className="block text-[clamp(28px,7vw,48px)] leading-[clamp(36px,8vw,64px)] font-semibold tracking-[0.02em] text-[#989898] mb-[12px]"
            onClick={() => setOpen(false)}
          >
            SERVICIOS
          </a>
          <a
            href="#contacto"
            className="block text-[clamp(28px,7vw,48px)] leading-[clamp(36px,8vw,64px)] font-semibold tracking-[0.02em] text-[#989898]"
            onClick={() => setOpen(false)}
          >
            CONTACTO
          </a>
        </nav>

        <div className="mt-auto px-[24px] pb-[24px] text-black">
          <div className="mb-[16px]">
            <div className="text-[16px] font-semibold leading-[20px]">DIRECCIÓN</div>
            <div className="text-[16px] leading-[22px]">
              Calle 10 #43, Herón Proal<br />Álvaro Obregón, 01640<br />CDMX
            </div>
          </div>
          <div>
            <div className="text-[16px] font-semibold leading-[20px] mb-[6px]">CONTACTO</div>
            <div className="text-[16px] leading-[22px]">
              jp@circular.uno<br />www.circular.uno
            </div>
          </div>

          <div className="flex gap-[16px] mt-[16px]">
            <a href="#" aria-label="Instagram" className="hover:opacity-80">
              <img src={Instagram} alt="instagram" className="w-[28px] h-[28px]" />
            </a>
            <a href="#" aria-label="Facebook" className="hover:opacity-80">
              <img src={Facebook} alt="facebook" className="w-[28px] h-[28px]" />
            </a>
          </div>
        </div>
      </section>
    </>
  );

  return ReactDOM.createPortal(
    <>
      {railDesktop}
      {panelContentDesktop}
      {topBarMobile}
      {panelContentMobile}
    </>,
    document.body
  );
};

export default RightSidebar;
