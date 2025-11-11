import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

/** Carga de imágenes: tomamos SIEMPRE la versión Grande si existe */
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

type Rect = { top: number; left: number; width: number; height: number };

const fn = (p: string) => {
  const last = p.split("/").pop() || "";
  try { return decodeURIComponent(last); } catch { return last; }
};
const toGrandeIfExists = (filename: string) => {
  const m = filename.match(/^(.*)\.([^.]+)$/);
  const base = m ? m[1] : filename.replace(/\.[^.]+$/, "");
  const ext  = m ? m[2] : (filename.split(".").pop() ?? "png");
  const grandeName = `${base}Grande.${ext}`;
  const hitGrande = Object.entries(imgs).find(([p]) => p.endsWith("/" + grandeName));
  if (hitGrande) return hitGrande[1].default;
  const hit = Object.entries(imgs).find(([p]) => p.endsWith("/" + filename));
  return hit?.[1]?.default ?? "";
};
/** sharedKey estable sin "Grande" */
const sharedKeyOf = (anyFilename: string) =>
  fn(anyFilename).toLowerCase().replace(/(?:[_\-\s]?grande)(?=\.[^.]+$)/i, "");

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
   .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function Inicio() {
  const navigate = useNavigate();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const movedRef = useRef(0);

  // alturas dinámicas
  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector("header") as HTMLElement | null;
    const footer = document.querySelector("footer") as HTMLElement | null;
    const apply = () => {
      const hH = header?.getBoundingClientRect().height ?? 0;
      const fH = footer?.getBoundingClientRect().height ?? 0;
      root.style.setProperty("--header-h", `${Math.round(hH)}px`);
      root.style.setProperty("--footer-h", `${Math.round(fH)}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    header && ro.observe(header);
    footer && ro.observe(footer);
    window.addEventListener("resize", apply);
    return () => { ro.disconnect(); window.removeEventListener("resize", apply); };
  }, []);

  const items = useMemo(() => {
    const raw = Object.entries(imgs).map(([path]) => {
      const original = fn(path);
      const baseKey = sharedKeyOf(original);
      const grandeSrc = toGrandeIfExists(original);
      const meta = metaByFile[original] ?? { title: original.replace(/\.(png|jpg|jpeg)$/i, ""), place: "—" };
      const slug = slugify(meta.title);
      return { file: original, src: grandeSrc, slug, key: baseKey, ...meta };
    });
    const pos = (f: string) => {
      const i = ORDER.indexOf(f);
      return i === -1 ? 9999 : i;
    };
    return raw.sort((a, b) => (pos(a.file) - pos(b.file)) || a.file.localeCompare(b.file));
  }, []);

  // --- util local para placeholder
  function makePlaceholder(r: Rect) {
    const ph = document.createElement("div");
    ph.setAttribute("data-shared-placeholder", "1");
    Object.assign(ph.style, {
      position: "absolute",
      top: `${r.top}px`,
      left: `${r.left}px`,
      width: `${r.width}px`,
      height: `${r.height}px`,
      background: "#fff",
      borderRadius: "6px",
      zIndex: "9998",
      pointerEvents: "none",
    } as CSSStyleDeclaration);
    document.body.appendChild(ph);
    return ph;
  }

  /**
   * Al montar Inicio, si venimos de "back", ocultamos la miniatura
   * y creamos el placeholder ANTES del primer paint (sin parpadeo).
   */
  useLayoutEffect(() => {
    const pending = (window as any).__sharedImagePending as
      | { src: string; from: Rect; objectFit?: string; direction?: "back"; sharedKey?: string }
      | undefined;

    if (!pending || pending.direction !== "back") return;

    const tryBoot = () => {
      if (!pending.sharedKey) return false;
      const match = document.querySelector(
        `img[data-shared-key="${pending.sharedKey}"]`
      ) as HTMLImageElement | null;
      if (!match) return false;

      // Ocultar miniatura ANTES de pintar
      match.style.visibility = "hidden";

      const r = match.getBoundingClientRect();
      const to: Rect = {
        top: r.top + window.scrollY,
        left: r.left + window.scrollX,
        width: r.width,
        height: r.height,
      };

      // Crear hueco blanco ya mismo
      const ph = makePlaceholder(to);

      // Al terminar, quitamos placeholder y revelamos miniatura
      const onDone = () => {
        window.removeEventListener("shared-image-done", onDone as any);
        try { ph.remove(); } catch {}
        match.style.visibility = "visible";
        (window as any).__sharedImagePending = undefined;
      };
      window.addEventListener("shared-image-done", onDone as any, { once: true });

      // Crear clon y animar hacia el placeholder
      window.dispatchEvent(new CustomEvent("shared-image-start", { detail: pending }));
      requestAnimationFrame(() => {
        window.dispatchEvent(new CustomEvent("shared-image-animate", { detail: { to } }));
      });

      return true;
    };

    // Si aún no está la miniatura en el DOM, reintenta unos frames
    if (tryBoot()) return;
    let attempts = 0;
    const id = window.setInterval(() => {
      attempts++;
      if (tryBoot() || attempts > 10) window.clearInterval(id);
    }, 16);
    return () => window.clearInterval(id);
  }, []);

  // drag + inercia (igual)
  useEffect(() => {
    const el = scrollerRef.current; if (!el) return;
    const onWheel = (e: WheelEvent) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.preventDefault(); };
    el.addEventListener("wheel", onWheel, { passive: false });

    let isDragging = false, startX = 0, startScrollLeft = 0, velocity = 0, lastX = 0, lastT = 0, rafId = 0, startY = 0;
    const originalSnap = getComputedStyle(el).scrollSnapType || "x proximity";
    const setSnap = (v: string) => ((el.style as any).scrollSnapType = v);
    const getX = (cx: number) => cx - el.getBoundingClientRect().left;
    const stopMomentum = () => { if (rafId) cancelAnimationFrame(rafId); rafId = 0; };
    const momentum = () => {
      velocity *= 0.95;
      if (Math.abs(velocity) < 0.2) { stopMomentum(); setSnap(originalSnap); el.classList.remove("cursor-grabbing"); return; }
      el.scrollLeft -= velocity;
      if (el.scrollLeft <= 0 || el.scrollLeft >= el.scrollWidth - el.clientWidth) { stopMomentum(); setSnap(originalSnap); el.classList.remove("cursor-grabbing"); return; }
      rafId = requestAnimationFrame(momentum);
    };
    const onDown = (cx: number) => {
      isDragging = true; movedRef.current = 0;
      startX = getX(cx); startScrollLeft = el.scrollLeft; lastX = startX; lastT = performance.now();
      velocity = 0; stopMomentum(); setSnap("none"); el.classList.add("cursor-grabbing"); (document.activeElement as HTMLElement)?.blur?.();
    };
    const onMove = (cx: number) => {
      if (!isDragging) return; const x = getX(cx); const now = performance.now();
      const dx = x - lastX; const dt = now - lastT || 16.7;
      el.scrollLeft = startScrollLeft - (x - startX); velocity = dx * (16.7 / dt);
      lastX = x; lastT = now; movedRef.current += Math.abs(dx);
    };
    const onUp = () => { if (!isDragging) return; isDragging = false; rafId = requestAnimationFrame(momentum); };

    const md = (e: MouseEvent) => { e.preventDefault(); onDown(e.clientX); };
    const mm = (e: MouseEvent) => { e.preventDefault(); onMove(e.clientX); };
    const mu = () => onUp();

    const ts = (e: TouchEvent) => { if (!e.touches[0]) return; startY = e.touches[0].clientY; onDown(e.touches[0].clientX); };
    const tm = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const dy = Math.abs(e.touches[0].clientY - startY);
      const dx = Math.abs(getX(e.touches[0].clientX) - startX);
      if (dx > dy) { e.preventDefault(); onMove(e.touches[0].clientX); }
      else { isDragging = false; setSnap(originalSnap); el.classList.remove("cursor-grabbing"); }
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

  // click: forward
  const handleCardClick = useCallback((slug: string, ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
    if (movedRef.current >= 10) return;
    ev?.preventDefault?.();
    const articleEl = ev?.currentTarget as HTMLElement | null;
    const imgEl = articleEl?.querySelector("img") as HTMLImageElement | null;
    if (!imgEl) { navigate(`/proyectos/${slug}`); return; }

    const r = imgEl.getBoundingClientRect();
    const from = { top: r.top + window.scrollY, left: r.left + window.scrollX, width: r.width, height: r.height };
    const objectFit = getComputedStyle(imgEl).objectFit || "cover";

    window.dispatchEvent(new CustomEvent("shared-image-start", {
      detail: { src: imgEl.src, from, objectFit, direction: "forward" }
    }));
    navigate(`/proyectos/${slug}`);
  }, [navigate]);

  return (
    <section
      className="mx-auto w-full max-w-[1440px] px-2 md:px-3 pt-8 md:pt-40 flex-1 min-h-0 flex flex-col"
      style={{
        minHeight: "calc(100svh - var(--header-h,0px) - var(--footer-h,0px))",
        maxHeight: "calc(100svh - var(--header-h,0px) - var(--footer-h,0px))",
      }}
    >
      <div
        ref={scrollerRef}
        className="no-scrollbar overflow-x-auto overflow-y-hidden snap-x snap-proximity cursor-grab select-none touch-pan-y overscroll-x-contain flex-1 min-h-0"
      >
        <div className="flex gap-6 pr-0">
          {items.map((it) => (
            <article
              key={it.file}
              className="snap-start shrink-0 basis-[90%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 max-w-[560px]"
              data-cursor="drag"
              data-cursor-label="Arrastra"
              role="button"
              tabIndex={0}
              onClick={(e) => handleCardClick(it.slug, e)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleCardClick(it.slug, e); }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={it.src}
                  alt={it.title}
                  className="h-full w-full object-cover"
                  draggable={false}
                  data-shared-key={it.key}   // clave para match en “back”
                />
              </div>

              <div className="pt-3">
                <h3 className="font-medium text-neutral-900 text-[17px] leading-[1.25]">{it.title}</h3>
                <p className="font-medium text-neutral-500 text-[11px] tracking-wide">{it.place}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
