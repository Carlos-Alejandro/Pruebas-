import { useEffect, useLayoutEffect, useRef } from "react";
import CareersSvg from "../../assets/Icons/Carrers/Recurso 12 1.svg";

export default function CareersModule() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const vwRef = useRef<number>(window.innerWidth);

  // Arranca en panel 1 y guarda el ancho de viewport para snapping
  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    vwRef.current = window.innerWidth;
    el.scrollLeft = 0;
    requestAnimationFrame(() => (el.scrollLeft = 0));
  }, []);

  // Recalcular ancho en resize (por si hay cambios de breakpoint/zoom)
  useEffect(() => {
    const onResize = () => (vwRef.current = window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Drag + snap animado al soltar
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let lastX = 0;
    let lastT = 0;
    let v = 0;        // velocidad en px/frame aproximada
    let animId = 0;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const stopAnim = () => {
      if (animId) cancelAnimationFrame(animId);
      animId = 0;
    };

    const animateScrollTo = (to: number, dur = 450) => {
      // Desactivar snap CSS para que el tween sea suave y no “pelee”
      const prevSnap = el.style.scrollSnapType;
      el.style.scrollSnapType = "none";

      const from = el.scrollLeft;
      const delta = to - from;
      if (Math.abs(delta) < 1) {
        el.scrollLeft = to;
        el.style.scrollSnapType = prevSnap || "";
        return;
      }

      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const k = easeOutCubic(t);
        el.scrollLeft = from + delta * k;
        if (t < 1) {
          animId = requestAnimationFrame(step);
        } else {
          // Restablecer snap CSS (usa tus clases: snap-x snap-mandatory)
          el.style.scrollSnapType = prevSnap || "";
        }
      };
      stopAnim();
      animId = requestAnimationFrame(step);
    };

    const onDown = (e: PointerEvent) => {
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      dragging = true;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      lastX = e.clientX;
      lastT = performance.now();
      v = 0;
      stopAnim();
      el.classList.add("cursor-grabbing");
      e.preventDefault();
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - lastX;     // +dx => moviste a la derecha el puntero
      const dt = now - lastT || 16.7;
      // arrastrar a la derecha (dx+) reduce scrollLeft, a la izquierda (dx-) lo aumenta
      el.scrollLeft = startScroll - (e.clientX - startX);
      v = dx * (16.7 / dt);             // estimación de velocidad
      lastX = e.clientX;
      lastT = now;
      e.preventDefault();
    };

    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
      el.classList.remove("cursor-grabbing");

      // Decidir destino por velocidad o por umbral de posición
      const vw = vwRef.current;
      const halfway = vw / 2;
      const goingRight = v < -0.5; // ojo: v<0 significa arrastrar hacia la izquierda (ver cálculo), por tanto “ir a panel 2”
      const goingLeft = v > 0.5;

      let target = 0;
      if (goingRight) {
        target = vw; // “flick” claro hacia el panel 2
      } else if (goingLeft) {
        target = 0;  // “flick” claro hacia el panel 1
      } else {
        // Sin flick, usa posición actual
        target = el.scrollLeft > halfway ? vw : 0;
      }

      // Clamp por si en móviles hay sobre/underscroll
      target = Math.max(0, Math.min(vw, target));
      animateScrollTo(target, 450);
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      stopAnim();
    };
  }, []);

  return (
    <main className="bg-white overflow-x-hidden">
      {/* Scroller horizontal a pantalla completa */}
      <div
        ref={scrollerRef}
        className="
          w-[100svw] overflow-x-auto overflow-y-hidden
          snap-x snap-mandatory snap-always
          select-none
          [overscroll-behavior-x:contain]
          [&::-webkit-scrollbar]:hidden
          cursor-grab active:cursor-grabbing
          [touch-action:pan-y]   /* gestos verticales siguen desplazando la página */
        "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Dos paneles EXACTOS al viewport */}
        <div className="flex w-[200svw]">
          {/* ---------- Panel 1 ---------- */}
          <section className="w-[100svw] flex-none snap-start overflow-visible">
            <div className="mx-auto max-w-[1440px] px-4">
              <div className="grid md:grid-cols-[1fr_1fr] gap-8 md:gap-12 items-start py-12 md:py-16">
                {/* Ilustración fija */}
                <div className="relative">
                  <div className="sticky left-0 top-0">
                    <img
                      src={CareersSvg}
                      alt="Gráfica OUMA"
                      className="block w-full h-auto object-contain select-none pointer-events-none"
                      draggable={false}
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Copy (diseño intacto) */}
                <div className="max-w-[640px] mx-auto md:mx-0">
                  <h1 className="leading-tight">
                    <span className="text-[40px] md:text-[56px] font-medium text-neutral-400">
                      Careers –{" "}
                    </span>
                    <span className="text-[40px] md:text-[56px] font-semibold text-neutral-900">
                      Únete a OUMA
                    </span>
                  </h1>

                  <div className="mt-6 space-y-4 text-[20px] leading-[28px] text-black">
                    <p>
                      En <strong className="font-semibold">OUMA</strong> creemos que cada proyecto es tan humano
                      como quienes lo construyen. Nuestra filosofía se centra en la sensibilidad, la precisión y
                      el compromiso, y buscamos colaboradores que compartan esa visión.
                    </p>
                    <p>
                      Queremos rodearnos de personas que amen el diseño, que valoren el detalle y que comprendan
                      que la arquitectura es más que espacio: es experiencia y acompañamiento. Profesionales que
                      sepan escuchar, proponer y ejecutar con claridad; que encuentren equilibrio entre lo técnico
                      y lo humano.
                    </p>
                    <p>
                      En <strong className="font-semibold">OUMA</strong> no buscamos volumen, buscamos esencia.
                      Si compartes nuestra convicción de que la arquitectura debe tener espacio & alma, entonces
                      aquí hay un lugar para ti.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---------- Panel 2 ---------- */}
          <section id="careers-form-panel" className="w-[100svw] flex-none snap-start">
            <div className="mx-auto max-w-[1440px] px-4 py-12 md:py-16">
              <h2 className="text-[40px] md:text-[56px] font-semibold">Tus datos</h2>

              <div className="mt-8 grid md:grid-cols-2 gap-8">
                {/* …tus campos originales… */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
