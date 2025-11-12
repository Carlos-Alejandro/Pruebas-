import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { BLOG_ARTICLES, getBlogImageUrl } from "../api/blog";

type Rect = { top: number; left: number; width: number; height: number };

const sharedKeyOf = (file: string) =>
  file.toLowerCase().replace(/\.[^.]+$/, "");

export default function BlogSection() {
  const navigate = useNavigate();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  const draggingRef = useRef(false);
  const movedRef = useRef(0);
  const startXRef = useRef(0);
  const startTimeRef = useRef(0);

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

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);

  const items = useMemo(
    () =>
      BLOG_ARTICLES.map((article) => ({
        ...article,
        src: getBlogImageUrl(article.file),
        key: sharedKeyOf(article.file),
      })),
    []
  );

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

  useLayoutEffect(() => {
    const pending = (window as any).__sharedImagePending as
      | {
          src: string;
          from: Rect;
          objectFit?: string;
          direction?: "back";
          sharedKey?: string;
        }
      | undefined;

    if (!pending || pending.direction !== "back") return;

    const tryBoot = () => {
      if (!pending.sharedKey) return false;
      const match = document.querySelector(
        `img[data-shared-key="${pending.sharedKey}"]`
      ) as HTMLImageElement | null;
      if (!match) return false;

      match.style.visibility = "hidden";

      const r = match.getBoundingClientRect();
      const to: Rect = {
        top: r.top + window.scrollY,
        left: r.left + window.scrollX,
        width: r.width,
        height: r.height,
      };

      const ph = makePlaceholder(to);

      const onDone = () => {
        window.removeEventListener("shared-image-done", onDone as any);
        try {
          ph.remove();
        } catch {}
        match.style.visibility = "visible";
        (window as any).__sharedImagePending = undefined;
      };
      window.addEventListener("shared-image-done", onDone as any, { once: true });

      window.dispatchEvent(new CustomEvent("shared-image-start", { detail: pending }));
      requestAnimationFrame(() => {
        window.dispatchEvent(
          new CustomEvent("shared-image-animate", { detail: { to } })
        );
      });

      return true;
    };

    if (tryBoot()) return;
    let attempts = 0;
    const id = window.setInterval(() => {
      attempts++;
      if (tryBoot() || attempts > 10) window.clearInterval(id);
    }, 16);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const originalSnap = getComputedStyle(el).scrollSnapType || "x proximity";
    let snapIdle: number | null = null;
    const setSnap = (v: string) => ((el.style as any).scrollSnapType = v);
    const armIdle = (ms = 220) => {
      if (snapIdle) window.clearTimeout(snapIdle);
      snapIdle = window.setTimeout(() => setSnap(originalSnap), ms);
    };

    let raf = 0;
    let target = 0;
    const stopRAF = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const step = () => {
      const cur = el.scrollLeft;
      const next = cur + (target - cur) * 0.18;
      el.scrollLeft = Math.abs(next - cur) < 0.5 ? target : next;
      if (Math.abs(target - el.scrollLeft) > 0.5) raf = requestAnimationFrame(step);
      else {
        stopRAF();
        armIdle(180);
      }
    };

    const onWheel = (e: WheelEvent) => {
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (d === 0) return;
      const before = el.scrollLeft;

      setSnap("none");
      if (!raf) target = el.scrollLeft;
      target += d;
      const max = el.scrollWidth - el.clientWidth;
      if (target < 0) target = 0;
      if (target > max) target = max;
      if (!raf) raf = requestAnimationFrame(step);

      if (el.scrollLeft !== before) e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    let startX = 0,
      lastX = 0,
      lastT = 0,
      v = 0,
      rafMom = 0;
    const stopMomentum = () => {
      if (rafMom) cancelAnimationFrame(rafMom);
      rafMom = 0;
    };
    const momentum = () => {
      v *= 0.95;
      if (Math.abs(v) < 0.25) {
        stopMomentum();
        armIdle(120);
        return;
      }
      el.scrollLeft -= v;
      if (
        el.scrollLeft <= 0 ||
        el.scrollLeft >= el.scrollWidth - el.clientWidth
      ) {
        stopMomentum();
        armIdle(120);
        return;
      }
      rafMom = requestAnimationFrame(momentum);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      draggingRef.current = true;
      movedRef.current = 0;
      startXRef.current = e.clientX;
      startTimeRef.current = performance.now();

      setSnap("none");
      stopMomentum();
      stopRAF();
      el.setPointerCapture(e.pointerId);

      startX = e.clientX;
      lastX = startX;
      lastT = performance.now();
      v = 0;
      (document.activeElement as HTMLElement)?.blur?.();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      const dt = now - lastT || 16.7;

      el.scrollLeft -= dx;

      v = dx * (16.7 / dt);
      lastX = e.clientX;
      lastT = now;

      movedRef.current += Math.abs(dx);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}

      const totalMoved = Math.abs(e.clientX - startXRef.current);
      const elapsed = performance.now() - startTimeRef.current;

      if (totalMoved <= 10 && elapsed <= 250) {
        const hit = document.elementFromPoint(
          e.clientX,
          e.clientY
        ) as HTMLElement | null;
        const card = hit?.closest?.("article[role='button']") as
          | HTMLElement
          | null;
        if (card) {
          const imgEl = card.querySelector("img") as HTMLImageElement | null;
          if (imgEl) {
            const r = imgEl.getBoundingClientRect();
            const from = {
              top: r.top + window.scrollY,
              left: r.left + window.scrollX,
              width: r.width,
              height: r.height,
            };
            const objectFit = getComputedStyle(imgEl).objectFit || "cover";
            window.dispatchEvent(
              new CustomEvent("shared-image-start", {
                detail: { src: imgEl.src, from, objectFit, direction: "forward" },
              })
            );
          }
          const slug = card.getAttribute("data-slug");
          if (slug) navigate(`/blog/${slug}`);
          return;
        }
      }

      rafMom = requestAnimationFrame(momentum);
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("lostpointercapture", onPointerUp);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("lostpointercapture", onPointerUp);
      stopMomentum();
      stopRAF();
      setSnap(originalSnap);
    };
  }, [navigate]);

  const goDetail = useCallback(
    (slug: string, imgEl?: HTMLImageElement | null) => {
      if (!imgEl) {
        navigate(`/blog/${slug}`);
        return;
      }
      const r = imgEl.getBoundingClientRect();
      const from = {
        top: r.top + window.scrollY,
        left: r.left + window.scrollX,
        width: r.width,
        height: r.height,
      };
      const objectFit = getComputedStyle(imgEl).objectFit || "cover";
      window.dispatchEvent(
        new CustomEvent("shared-image-start", {
          detail: { src: imgEl.src, from, objectFit, direction: "forward" },
        })
      );
      navigate(`/blog/${slug}`);
    },
    [navigate]
  );

  const handleCardClick = useCallback(
    (
      slug: string,
      ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
    ) => {
      if (draggingRef.current || movedRef.current > 18) return;
      const articleEl = ev?.currentTarget as HTMLElement | null;
      const imgEl = articleEl?.querySelector("img") as HTMLImageElement | null;
      goDetail(slug, imgEl);
    },
    [goDetail]
  );

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
        className="no-scrollbar overflow-x-auto overflow-y-hidden snap-x snap-proximity cursor-grab select-none overscroll-x-contain flex-1 min-h-0"
        style={{ touchAction: "pan-y" }}
        data-cursor="drag"
        data-cursor-label="Arrastra"
      >
        <div ref={innerRef} className="flex w-max gap-6 pr-0">
          {items.map((article) => (
            <article
              key={article.slug}
              data-slug={article.slug}
              className="snap-start shrink-0 w-[85vw] sm:w-[48vw] lg:w-[340px] xl:w-[320px] max-w-[360px]"
              role="button"
              tabIndex={0}
              onClick={(e) => handleCardClick(article.slug, e)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleCardClick(article.slug, e);
              }}
            >
              <div
                className="aspect-[4/3] overflow-hidden"
                data-cursor="drag"
                data-cursor-label="Arrastra"
              >
                <img
                  src={article.src}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-[1.03]"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  data-shared-key={article.key}
                />
              </div>

              <div className="pt-3 space-y-[4px]">
                <h3 className="font-medium text-neutral-900 text-[17px] leading-[1.25]">
                  {article.title}
                </h3>
                <p className="font-medium text-neutral-500 text-[11px] tracking-wide uppercase">
                  {article.category ?? ""}
                </p>
                <p className="font-medium text-neutral-500 text-[13px] leading-[1.3]">
                  {article.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
