import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "link" | "drag" | "view";

// ⬇️ cambia a true si luego quieres un poquitito de suavizado
const USE_SMOOTHING = false;      // <- sin lag
const SMOOTHING = 0.25;           // si lo activas, 0.2–0.35 va bien

const isCoarsePointer = () =>
  typeof window !== "undefined" &&
  (window.matchMedia?.("(pointer: coarse)")?.matches || "ontouchstart" in window);

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [isDragging, setIsDragging] = useState(false);

  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const currentElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isCoarsePointer()) return;

    // seguimiento inmediato para eliminar "desfase"
    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      target.current = { x, y };
      setVisible(true);

      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      currentElement.current = el || null;
      
      // Si estamos arrastrando, mantener el modo drag
      if (!isDragging) {
        const m = (el?.dataset.cursor as CursorMode) || "default";
        setMode(m);
        if (labelRef.current) labelRef.current.textContent = el?.dataset.cursorLabel ?? "";
      }

      if (!USE_SMOOTHING) {
        pos.current = { x, y };
        if (dotRef.current) dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        if (labelRef.current) labelRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const onDown = (e: MouseEvent) => {
      const el = currentElement.current;
      if (el?.dataset.cursor === "drag") {
        setIsDragging(true);
      }
    };

    const onUp = () => {
      setIsDragging(false);
      // Restaurar el modo según el elemento actual
      if (currentElement.current) {
        const m = (currentElement.current.dataset.cursor as CursorMode) || "default";
        setMode(m);
        if (labelRef.current) labelRef.current.textContent = currentElement.current.dataset.cursorLabel ?? "";
      }
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    window.addEventListener("mouseout", onLeave, { passive: true });

    if (USE_SMOOTHING) {
      const loop = () => {
        pos.current.x = lerp(pos.current.x, target.current.x, SMOOTHING);
        pos.current.y = lerp(pos.current.y, target.current.y, SMOOTHING);
        const { x, y } = pos.current;
        if (dotRef.current) dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        if (labelRef.current) labelRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        raf.current = requestAnimationFrame(loop);
      };
      raf.current = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseout", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [isDragging]);

  if (isCoarsePointer()) return null;

  const size =
    mode === "default" ? 24 :
    mode === "link"    ? 36 :
    mode === "view"    ? 48 : 64;

  return (
    <>
      <div
        ref={dotRef}
        className={[
          "pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2",
          "left-0 top-0",                         // ⬅️ asegura referencia al viewport
          "rounded-full mix-blend-difference",
          "transition-[width,height,opacity] duration-120 ease-out will-change-transform",
          visible ? "opacity-100" : "opacity-0",
          "outline outline-1 outline-white/40"
        ].join(" ")}
        style={{ width: size, height: size, background: "white", transform: "translate3d(-9999px,-9999px,0)" }}
      />
      <div
        ref={labelRef}
        className={[
          "pointer-events-none fixed z-[10000] -translate-x-1/2 -translate-y-1/2",
          "left-0 top-0 select-none text-[11px] font-semibold uppercase tracking-wide",
          "mix-blend-difference text-white transition-opacity duration-120 will-change-transform",
          visible && (mode === "drag" || mode === "view") ? "opacity-100" : "opacity-0"
        ].join(" ")}
        style={{ transform: "translate3d(-9999px,-9999px,0)" }}
      />
    </>
  );
}
