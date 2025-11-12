import { useEffect, useRef } from "react";

type Props = {
  /** Opción A: pasa el SVG como string (import ...?raw desde src/) */
  svg?: string;
  /** Opción B: ruta pública (ej. "/Nosotros/columna1.svg" en /public) */
  svgUrl?: string;

  className?: string;
  style?: React.CSSProperties;

  /** Animación de “trazo” */
  drawOnHover?: boolean;     // default: true
  drawDurationMs?: number;   // default: 900
  drawStaggerMs?: number;    // default: 45
  resetOnLeave?: boolean;    // default: true
  drawSelector?: string;     // ej: "g[data-draw] *"
  autoPlayOnMount?: boolean; // para probar sin hover

  /** Fallbacks de visibilidad */
  strokeWidthFallback?: number; // default: 1.5
  forceCurrentColor?: boolean;  // default: true  -> stroke="currentColor"

  /** Parallax inverso por mouse */
  parallax?: boolean; // default: true
  strength?: number;  // default: 10
};

export default function InteractiveSvg({
  svg,
  svgUrl,
  className,
  style,
  drawOnHover = true,
  drawDurationMs = 900,
  drawStaggerMs = 45,
  resetOnLeave = true,
  drawSelector,
  autoPlayOnMount = false,
  strokeWidthFallback = 1.5,
  forceCurrentColor = true,
  parallax = true,
  strength = 10,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // 1) Monta el SVG dentro del wrapper
  useEffect(() => {
    let cancelled = false;
    const mount = async () => {
      if (!wrapRef.current) return;
      let markup = svg ?? "";
      if (!markup && svgUrl) {
        const res = await fetch(svgUrl);
        markup = await res.text();
      }
      if (cancelled) return;

      wrapRef.current.innerHTML = markup;
      const el = wrapRef.current.querySelector("svg") as SVGSVGElement | null;
      svgRef.current = el;

      if (el) {
        el.style.display = "block";
        el.style.pointerEvents = "auto"; // importante para hover
        el.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      }
    };
    mount();
    return () => {
      cancelled = true;
    };
  }, [svg, svgUrl]);

  // 2) Animación “dibujar” — listeners en el WRAPPER (robusto)
  useEffect(() => {
    const el = svgRef.current;
    const host = wrapRef.current;
    if (!el || !host) return;

    const nodes = drawSelector
      ? Array.from(el.querySelectorAll<SVGGraphicsElement>(drawSelector))
      : Array.from(
          el.querySelectorAll<SVGGraphicsElement>(
            "path,line,polyline,polygon,rect,circle,ellipse"
          )
        );

    // Sólo elementos geométricos con longitud
    const geom = nodes.filter((n: any) => typeof n.getTotalLength === "function");
    if (!geom.length) return;

    // Preparación de trazos
    geom.forEach((n: any, i) => {
      const len = n.getTotalLength();
      if (forceCurrentColor && !n.hasAttribute("stroke")) n.setAttribute("stroke", "currentColor");
      n.setAttribute("fill", "none");
      if (!n.hasAttribute("stroke-width")) n.setAttribute("stroke-width", String(strokeWidthFallback));
      n.style.strokeDasharray = `${len}`;
      n.style.strokeDashoffset = `${len}`;
      n.style.transition = `stroke-dashoffset ${drawDurationMs}ms ease ${i * drawStaggerMs}ms`;
    });

    const play = () =>
      requestAnimationFrame(() => {
        geom.forEach((n: any) => (n.style.strokeDashoffset = "0"));
      });

    const reset = () => {
      if (!resetOnLeave) return;
      geom.forEach(
        (n: any) => (n.style.strokeDashoffset = n.style.strokeDasharray || "0")
      );
    };

    // Hover en el wrapper (entra/sale)
    if (drawOnHover) {
      host.addEventListener("mouseenter", play);
      host.addEventListener("mouseleave", reset);
      host.addEventListener("touchstart", play, { passive: true });
      host.addEventListener("touchend", reset);
    }

    // Auto (para test rápido)
    if (autoPlayOnMount) play();

    return () => {
      if (drawOnHover) {
        host.removeEventListener("mouseenter", play);
        host.removeEventListener("mouseleave", reset);
        host.removeEventListener("touchstart", play);
        host.removeEventListener("touchend", reset);
      }
    };
  }, [
    drawOnHover,
    drawDurationMs,
    drawStaggerMs,
    resetOnLeave,
    drawSelector,
    autoPlayOnMount,
    strokeWidthFallback,
    forceCurrentColor,
    svg,
    svgUrl,
  ]);

  // 3) Parallax inverso por mouse (g[data-depth])
  useEffect(() => {
    const wrap = wrapRef.current;
    const el = svgRef.current;
    if (!wrap || !el || !parallax) return;

    const groups = Array.from(el.querySelectorAll<SVGGElement>("g[data-depth]"));
    if (!groups.length) return;

    let rect = wrap.getBoundingClientRect();
    let raf = 0,
      mx = 0,
      my = 0,
      dirty = false;

    const tick = () => {
      raf = 0;
      if (!dirty) return;
      dirty = false;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (mx - cx) / rect.width;
      const dy = (my - cy) / rect.height;

      groups.forEach((g) => {
        const d = parseFloat(g.getAttribute("data-depth") || "1");
        g.style.transform = `translate(${-dx * strength * d}px, ${-dy * strength * d}px)`;
        g.style.transformOrigin = "center";
        g.style.willChange = "transform";
      });
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dirty = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onResize = () => {
      rect = wrap.getBoundingClientRect();
    };

    wrap.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [parallax, strength, svg, svgUrl]);

  return <div ref={wrapRef} className={className} style={style} />;
}
