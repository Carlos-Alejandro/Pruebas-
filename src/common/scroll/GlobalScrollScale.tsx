// src/common/ux/GlobalScrollScale.tsx
import { useEffect } from "react";

/**
 * GlobalScrollScale
 * - Escala el PRIMER HIJO del scroller al scrollear y compensa con translateX
 *   para que el centro visible no “salte”.
 * - Al quedar en reposo, vuelve a escala 1 y hace snap suave al item más cercano.
 * - Excluir un scroller con: data-no-global-scale
 */
export default function GlobalScrollScale({
  activeScale = 0.98,
  enterMs = 150,
  exitMs = 320,
  idleMs = 170,
  snapBehavior = "smooth", // "auto" | "smooth"
}: {
  activeScale?: number;
  enterMs?: number;
  exitMs?: number;
  idleMs?: number;
  snapBehavior?: ScrollBehavior;
}) {
  useEffect(() => {
    type Timer = number;
    const idleTimers = new WeakMap<HTMLElement, Timer>();

    const isHorizontalScrollable = (el: HTMLElement) => {
      if (el.dataset.noGlobalScale !== undefined) return false;
      const over = getComputedStyle(el).overflowX;
      const allows =
        over === "auto" || over === "scroll" || (over as any) === "overlay";
      return allows && el.scrollWidth > el.clientWidth + 2;
    };

    const targetOf = (el: HTMLElement) =>
      (el.firstElementChild as HTMLElement | null) ?? el;

    // Aplica scale + translate para mantener el centro visible estable
    const applyTransform = (scroller: HTMLElement, s: number) => {
      const target = targetOf(scroller);
      if (!target) return;

      const center = scroller.scrollLeft + scroller.clientWidth / 2;
      const tx = center * (1 - s);

      target.style.transitionProperty = "transform";
      target.style.transitionDuration = `${enterMs}ms`;
      target.style.transitionTimingFunction = "cubic-bezier(.2,.7,0,1)";
      target.style.transformOrigin = "0% 50%";
      target.style.willChange = "transform";
      target.style.contain = "paint";
      target.style.transform = `translateX(${tx}px) scale(${s})`;
    };

    // Encuentra el snap-start más cercano al scroll actual
    const snapToNearest = (scroller: HTMLElement) => {
      const container = targetOf(scroller);
      if (!container) return;

      const children = Array.from(container.children) as HTMLElement[];
      if (children.length === 0) return;

      // Usamos offsetLeft relativo al contenedor (ignora el transform visual)
      const lefts = children.map((ch) => ch.offsetLeft);
      const current = scroller.scrollLeft;

      // Localiza el más cercano al scroll actual
      let nearest = lefts[0];
      let bestDist = Math.abs(current - nearest);
      for (let i = 1; i < lefts.length; i++) {
        const d = Math.abs(current - lefts[i]);
        if (d < bestDist) {
          bestDist = d;
          nearest = lefts[i];
        }
      }

      // Desplazamiento suave hacia ese snap
      // (si tienes CSS `snap-x snap-proximity`, el navegador terminará de encajar)
      scroller.scrollTo({ left: nearest, behavior: snapBehavior });
    };

    // Programa el regreso a escala 1 + snap cercano
    const scheduleIdleReset = (scroller: HTMLElement) => {
      const target = targetOf(scroller);
      if (!target) return;

      const prev = idleTimers.get(scroller);
      if (prev) window.clearTimeout(prev);

      const id = window.setTimeout(() => {
        // Primero quitamos la traslación/escala
        target.style.transitionProperty = "transform";
        target.style.transitionDuration = `${exitMs}ms`;
        target.style.transitionTimingFunction = "cubic-bezier(.2,.7,0,1)";
        target.style.transform = "translateX(0px) scale(1)";

        // Y, en paralelo, hacemos “snap” al item más cercano
        snapToNearest(scroller);
      }, idleMs);

      idleTimers.set(scroller, id);
    };

    const onScroll = (e: Event) => {
      const scroller = e.currentTarget as HTMLElement;
      applyTransform(scroller, activeScale);
      scheduleIdleReset(scroller);
    };

    const onPointerDown = (e: Event) => {
      const scroller = e.currentTarget as HTMLElement;
      applyTransform(scroller, activeScale);
      scheduleIdleReset(scroller);
    };

    const attach = (el: HTMLElement) => {
      if (!isHorizontalScrollable(el)) return;
      if ((el as any)._gssBound) return;
      (el as any)._gssBound = true;

      const target = targetOf(el);
      if (target) {
        target.style.transformOrigin = "0% 50%";
        target.style.willChange = "transform";
        target.style.contain = "paint";
      }

      el.addEventListener("scroll", onScroll, { passive: true });
      el.addEventListener("pointerdown", onPointerDown, { passive: true });
    };

    const scanTree = (root: ParentNode) => {
      const all = Array.from(root.querySelectorAll<HTMLElement>("*"));
      for (const el of all) attach(el);
      if (root instanceof HTMLElement) attach(root);
    };

    // Primera pasada + observar nuevos nodos
    scanTree(document.body);
    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) scanTree(n);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => mo.disconnect();
  }, [activeScale, enterMs, exitMs, idleMs, snapBehavior]);

  return null;
}
