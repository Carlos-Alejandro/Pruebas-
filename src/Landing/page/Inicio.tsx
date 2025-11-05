// src/Landing/page/Inicio.tsx
import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

/** Carga de imágenes desde /assets/FotosInicio */
const imgs = import.meta.glob("../../assets/FotosInicio/*.{png,jpg,jpeg}", {
  eager: true,
  query: "?url",
}) as Record<string, { default: string }>;

const metaByFile: Record<string, { title: string; place: string }> = {
  "CASA MAY 2 3.png":              { title: "Casa May",            place: "MORELIA, MICHOACÁN" },
  "CASA ROBLE 2 1.png":            { title: "Casa Roble",          place: "CANCÚN, QUINTANA ROO" },
  "11 danubio lateral 1.png":      { title: "Danubio 11",          place: "CANCÚN, QUINTANA ROO" },
  "250429 - EXTERIOR FINAL 2.png": { title: "Casa Cascada de Luz", place: "CANCÚN, QUINTANA ROO" },
  "9 2.png":                       { title: "Casa del Mar",        place: "PUERTO VALLARTA, JALISCO" },
};

const ORDER = [
  "9 2.png",
  "CASA MAY 2 3.png",
  "250429 - EXTERIOR FINAL 2.png",
  "CASA ROBLE 2 1.png",
  "11 danubio lateral 1.png",
];

const slugify = (s: string) =>
  s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function Inicio() {
  const navigate = useNavigate();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const movedRef = useRef(0);

  const items = useMemo(() => {
    const raw = Object.entries(imgs).map(([path, mod]) => {
      const file = path.split("/").pop() || "";
      const meta = metaByFile[file] ?? { title: file.replace(/\.(png|jpg|jpeg)$/i, ""), place: "—" };
      const src = (mod as any).default as string;
      const slug = slugify(meta.title);
      return { src, file, slug, ...meta };
    });
    const pos = (f: string) => {
      const i = ORDER.indexOf(f);
      return i === -1 ? 9999 : i;
    };
    return raw.sort((a, b) => (pos(a.file) - pos(b.file)) || a.file.localeCompare(b.file));
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // --- Rueda del mouse: bloquear solo desplazamiento HORIZONTAL
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // horizontal → bloqueado (drag-only)
        e.preventDefault();
      } // vertical → dejar pasar para que la página se mueva
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    // --- Drag + inercia
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    // inercia
    let velocity = 0;
    let lastX = 0;
    let lastT = 0;
    let rafId = 0;

    // touch: para permitir pan-vertical y detectar pan-horizontal
    let startY = 0;

    const originalSnap = getComputedStyle(el).scrollSnapType || "x proximity";
    const setSnap = (v: string) => ((el.style as any).scrollSnapType = v);
    const getX = (clientX: number) => clientX - el.getBoundingClientRect().left;

    const stopMomentum = () => { if (rafId) cancelAnimationFrame(rafId); rafId = 0; };
    const momentum = () => {
      velocity *= 0.95;
      if (Math.abs(velocity) < 0.2) {
        stopMomentum(); setSnap(originalSnap); el.classList.remove("cursor-grabbing"); return;
      }
      el.scrollLeft -= velocity;
      if (el.scrollLeft <= 0 || el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        stopMomentum(); setSnap(originalSnap); el.classList.remove("cursor-grabbing"); return;
      }
      rafId = requestAnimationFrame(momentum);
    };

    const onDown = (clientX: number) => {
      isDragging = true;
      movedRef.current = 0;
      startX = getX(clientX);
      startScrollLeft = el.scrollLeft;
      lastX = startX;
      lastT = performance.now();
      velocity = 0;
      stopMomentum();
      setSnap("none");
      el.classList.add("cursor-grabbing");
      (document.activeElement as HTMLElement)?.blur?.();
    };

    const onMove = (clientX: number) => {
      if (!isDragging) return;
      const x = getX(clientX);
      const now = performance.now();
      const dx = x - lastX;
      const dt = now - lastT || 16.7;

      el.scrollLeft = startScrollLeft - (x - startX);

      velocity = dx * (16.7 / dt);
      lastX = x; lastT = now;
      movedRef.current += Math.abs(dx);
    };

    const onUp = () => {
      if (!isDragging) return;
      isDragging = false;
      rafId = requestAnimationFrame(momentum);
    };

    // Mouse
    const md = (e: MouseEvent) => { e.preventDefault(); onDown(e.clientX); };
    const mm = (e: MouseEvent) => { e.preventDefault(); onMove(e.clientX); };
    const mu = () => onUp();

    // Touch: solo bloqueamos si el gesto es mayormente horizontal
    const ts = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      startY = e.touches[0].clientY;
      onDown(e.touches[0].clientX);
    };
    const tm = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const dy = Math.abs(e.touches[0].clientY - startY);
      const dx = Math.abs(getX(e.touches[0].clientX) - startX);
      if (dx > dy) {
        // gesto horizontal → manejamos drag y bloqueamos default
        e.preventDefault();
        onMove(e.touches[0].clientX);
      } else {
        // gesto vertical → liberar: cancela drag para no interferir
        isDragging = false;
        setSnap(originalSnap);
        el.classList.remove("cursor-grabbing");
      }
    };
    const te = () => onUp();

    el.addEventListener("mousedown", md);
    window.addEventListener("mousemove", mm, { passive: false });
    window.addEventListener("mouseup", mu);

    el.addEventListener("touchstart", ts, { passive: false });
    el.addEventListener("touchmove", tm, { passive: false });
    el.addEventListener("touchend", te);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("mousedown", md);
      window.removeEventListener("mousemove", mm as any);
      window.removeEventListener("mouseup", mu);
      el.removeEventListener("touchstart", ts);
      el.removeEventListener("touchmove", tm);
      el.removeEventListener("touchend", te);
      stopMomentum(); setSnap(originalSnap);
    };
  }, []);

  const handleCardClick = (slug: string) => {
    // si casi no se movió (click real), navega
    if (movedRef.current < 10) navigate(`/proyectos/${slug}`);
  };

  return (
    <main className="container mx-auto max-w-[1440px] px-2 md:px-3 pt-8 md:pt-40">
      <div
        ref={scrollerRef}
        className="
          no-scrollbar overflow-x-auto overflow-y-hidden
          snap-x snap-proximity
          cursor-grab select-none
          touch-pan-y           /* permite pan vertical nativo */
          overscroll-x-contain
        "
      >
        <div className="flex gap-6 pr-0">
          {items.map((it) => (
            <article
              key={it.file}
              className="
                snap-start shrink-0
                basis-[90%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4
                max-w-[560px]
              "
              data-cursor="drag"
              data-cursor-label="Arrastra"
              onClick={() => handleCardClick(it.slug)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") handleCardClick(it.slug); }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={it.src}
                  alt={it.title}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>

              <div className="pt-3">
                <h3 className="font-medium text-neutral-900 text-[21px] leading-[1.25]">
                  {it.title}
                </h3>
                <p className="font-medium text-neutral-500 text-[17px] tracking-wide">
                  {it.place}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
