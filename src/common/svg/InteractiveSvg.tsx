// src/common/svg/InteractiveSvg.tsx
import { useEffect, useRef } from "react";

type Props = {
  /** SVG como string (Vite: import icon from './file.svg?raw') */
  svg?: string;
  /** SVG servido desde /public (p.ej. "/Nosotros/columna1.svg") */
  svgUrl?: string;

  className?: string;
  style?: React.CSSProperties;

  // Opciones de “dibujado”
  drawOnHover?: boolean;   // default: true
  drawDurationMs?: number; // default: 900
  drawStaggerMs?: number;  // default: 45
  resetOnLeave?: boolean;  // default: true
  /** Si lo usas, solo dibuja los nodos que coincidan (ej: "g[data-draw] *") */
  drawSelector?: string;

  // Parallax inverso
  parallax?: boolean;      // default: true
  strength?: number;       // default: 10
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
  parallax = true,
  strength = 10,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Inyecta el SVG (string o URL a public/)
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
      svgRef.current = wrapRef.current.querySelector("svg");

      if (svgRef.current) {
        svgRef.current.style.display = "block";
        svgRef.current.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      }
    };

    mount();
    return () => { cancelled = true; };
  }, [svg, svgUrl]);

  // Efecto “dibujar” (stroke-dasharray/offset) al hover
  useEffect(() => {
    const el = svgRef.current;
    if (!el || !drawOnHover) return;

    const nodes = drawSelector
      ? Array.from(el.querySelectorAll<SVGGraphicsElement>(drawSelector))
      : Array.from(
          el.querySelectorAll<SVGGraphicsElement>(
            "path,line,polyline,polygon,rect,circle,ellipse"
          )
        );

    const geom = nodes.filter((n: any) => typeof n.getTotalLength === "function");
    if (!geom.length) return;

    // Preparar cada geometría
    geom.forEach((n: any, i) => {
      const len = n.getTotalLength();
      if (!n.hasAttribute("stroke")) n.setAttribute("stroke", "currentColor"); // fallback
      if (!n.hasAttribute("fill")) n.setAttribute("fill", "none");
      n.style.strokeDasharray = `${len}`;
      n.style.strokeDashoffset = `${len}`;
      n.style.transition = `stroke-dashoffset ${drawDurationMs}ms ease ${i * drawStaggerMs}ms`;
    });

    const onEnter = () => {
      // siguiente frame para respetar transition
      requestAnimationFrame(() => {
        geom.forEach((n: any) => (n.style.strokeDashoffset = "0"));
      });
    };
    const onLeave = () => {
      if (!resetOnLeave) return;
      geom.forEach((n: any) => {
        n.style.strokeDashoffset = n.style.strokeDasharray || "0";
      });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", onEnter, { passive: true });
    el.addEventListener("touchend", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", onEnter);
      el.removeEventListener("touchend", onLeave);
    };
  }, [drawOnHover, drawDurationMs, drawStaggerMs, resetOnLeave, drawSelector, svg, svgUrl]);

  // Parallax inverso (mueve <g data-depth="...">)
  useEffect(() => {
    const wrap = wrapRef.current;
    const el = svgRef.current;
    if (!wrap || !el || !parallax) return;

    const groups = Array.from(el.querySelectorAll<SVGGElement>("g[data-depth]"));
    if (!groups.length) return;

    let rect = wrap.getBoundingClientRect();
    let raf = 0;
    let mx = 0, my = 0;
    let dirty = false;

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
