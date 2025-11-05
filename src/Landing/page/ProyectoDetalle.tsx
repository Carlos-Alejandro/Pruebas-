// src/Landing/page/ProyectoDetalle.tsx
import { Link, useParams } from "react-router-dom";
import { findProjectBySlug } from "../api/projects";

/* Cargamos todas las fotos (permite detectar versión Grande) */
const FOTOS = import.meta.glob("../../assets/FotosInicio/*", {
  eager: true,
  query: "?url",
}) as Record<string, { default: string }>;

function resolveFotoUrl(filename: string): string {
  const m = filename.match(/^(.*)\.([^.]+)$/);
  if (!m) {
    const hit = Object.entries(FOTOS).find(([p]) => p.endsWith("/" + filename));
    return hit?.[1]?.default ?? "";
  }
  const base = m[1];
  const ext = m[2];
  const grandeName = `${base}Grande.${ext}`;
  const grandeHit = Object.entries(FOTOS).find(([p]) => p.endsWith("/" + grandeName));
  if (grandeHit) return grandeHit[1].default;
  const hit = Object.entries(FOTOS).find(([p]) => p.endsWith("/" + filename));
  return hit?.[1]?.default ?? "";
}

export default function ProyectoDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? findProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <main className="container mx-auto max-w-[1440px] px-4 md:px-6 py-16">
        <p className="text-neutral-500">Proyecto no encontrado.</p>
        <Link to="/" className="text-neutral-800 underline">Volver</Link>
      </main>
    );
  }

  const imgUrl = resolveFotoUrl(project.file);

  // Descripción en un solo párrafo (sin saltos de línea)
  const description = (project.description || "").replace(/\n+/g, " ").trim();

  return (
    <main className="container mx-auto max-w-[1440px] px-3 md:px-6 pt-8 md:pt-24 pb-24">
      {/* Volver */}
      <div className="text-[12px] text-neutral-400 mb-4">
        <Link to="/" className="hover:text-neutral-700">← Volver</Link>
      </div>

      {/* Layout: izquierda fija (título), derecha = fila scrolleable (imagen + texto) */}
      <section className="grid grid-cols-12 gap-6 md:gap-10 items-start">
        {/* IZQUIERDA: Título / lugar / año (alineado a la derecha en desktop) */}
        <aside className="col-span-12 md:col-span-3 flex flex-col items-start md:items-end text-left md:text-right">
          <h1 className="font-medium text-[18px] md:text-[20px] leading-tight text-neutral-900">
            {project.title}
          </h1>
          <div className="mt-2 text-[12px] text-neutral-500 tracking-wide uppercase">
            {project.place}
          </div>
          {project.year && (
            <div className="mt-2 text-[12px] text-neutral-500">{project.year}</div>
          )}
        </aside>

        {/* DERECHA: fila horizontal scrolleable con IMAGEN a la izquierda y TEXTO a la derecha */}
        <HScrollRow className="col-span-12 md:col-span-9">
          {/* IMAGEN (ancha, sin escalado forzado para evitar pixelado) */}
          <div
            className="inline-block"
            data-cursor="drag"
            data-cursor-size="92"
            data-cursor-label="Arrastra"
          >
            <img
              src={imgUrl}
              alt={project.title}
              className="block h-auto max-h-[78vh] w-auto select-none"
              draggable={false}
              decoding="async"
              loading="eager"
              fetchPriority="high"
              style={{ imageRendering: "auto" }}
            />
          </div>

          {/* TEXTO (columna fija a la derecha de la imagen; footer pegado al fondo) */}
          <article className="w-[560px] lg:w-[600px] flex flex-col text-[13px] leading-relaxed text-neutral-800 pr-4">
            <p className="leading-[1.55]">
              {description}
            </p>

            {/* Footer pegado al pie de la imagen gracias a mt-auto */}
            {(project.brief || project.categories) && (
              <div className="mt-auto pt-8">
                {project.brief && (
                  <div className="text-[13px] text-neutral-800">
                    {project.brief}
                  </div>
                )}
                {project.categories && (
                  <div className="mt-1 text-[11px] text-neutral-500">
                    {project.categories}
                  </div>
                )}
              </div>
            )}
          </article>
        </HScrollRow>
      </section>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Componente de fila scrolleable horizontal (drag + inercia + wheel) */
/* ------------------------------------------------------------------ */
import { useEffect, useRef, PropsWithChildren } from "react";

function HScrollRow({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // Drag con inercia (solo horizontal)
    let isDown = false;
    let startX = 0;
    let startLeft = 0;

    // inercia
    let lastX = 0;
    let lastT = 0;
    let v = 0;
    let raf = 0;

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const momentum = () => {
      v *= 0.95;
      if (Math.abs(v) < 0.15) {
        stop();
        el.classList.remove("cursor-grabbing");
        return;
      }
      el.scrollLeft -= v;

      const max = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft <= 0 || el.scrollLeft >= max) {
        stop();
        el.classList.remove("cursor-grabbing");
        return;
      }
      raf = requestAnimationFrame(momentum);
    };

    const getX = (clientX: number) => clientX - el.getBoundingClientRect().left;

    const onDown = (clientX: number) => {
      isDown = true;
      stop();
      startX = getX(clientX);
      startLeft = el.scrollLeft;
      lastX = startX;
      lastT = performance.now();
      el.classList.add("cursor-grabbing");
      (document.activeElement as HTMLElement)?.blur?.();
    };

    const onMove = (clientX: number) => {
      if (!isDown) return;
      const x = getX(clientX);
      const now = performance.now();
      const dx = x - lastX;
      const dt = now - lastT || 16.7;

      el.scrollLeft = startLeft - (x - startX);
      v = dx * (16.7 / dt);
      lastX = x;
      lastT = now;
    };

    const onUp = () => {
      if (!isDown) return;
      isDown = false;
      raf = requestAnimationFrame(momentum);
    };

    // Rueda: si el gesto es mayormente horizontal, lo manejamos; si es vertical, dejamos que la página scrollee normal
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        el.scrollLeft += e.deltaX;
      }
    };

    // Listeners
    const md = (e: MouseEvent) => { e.preventDefault(); onDown(e.clientX); };
    const mm = (e: MouseEvent) => { e.preventDefault(); onMove(e.clientX); };
    const mu = () => onUp();

    const ts = (e: TouchEvent) => { if (e.touches[0]) onDown(e.touches[0].clientX); };
    const tm = (e: TouchEvent) => { if (e.touches[0]) { e.preventDefault(); onMove(e.touches[0].clientX); } };
    const te = () => onUp();

    el.addEventListener("mousedown", md);
    window.addEventListener("mousemove", mm, { passive: false });
    window.addEventListener("mouseup", mu);

    el.addEventListener("touchstart", ts, { passive: false });
    el.addEventListener("touchmove", tm, { passive: false });
    el.addEventListener("touchend", te);

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("mousedown", md);
      window.removeEventListener("mousemove", mm as any);
      window.removeEventListener("mouseup", mu);
      el.removeEventListener("touchstart", ts);
      el.removeEventListener("touchmove", tm);
      el.removeEventListener("touchend", te);
      el.removeEventListener("wheel", onWheel);
      stop();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={
        "no-scrollbar overflow-x-auto overflow-y-hidden cursor-grab select-none " +
        className
      }
      // Permite que en móvil el gesto vertical siga haciendo scroll de la página
      style={{ touchAction: "pan-y" }}
    >
      {/* Fila “real” (imagen + texto). inline-flex para mantener todo en una fila */}
      <div className="inline-flex gap-10 items-stretch pr-1">
        {children}
      </div>
    </div>
  );
}
