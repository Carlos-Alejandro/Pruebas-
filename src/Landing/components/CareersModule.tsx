import { useEffect, useRef, useState } from "react";
import CareersSvg from "../../assets/Icons/Carrers/Recurso 12 1.svg";

export default function CareersModule() {
  // ---------- Paneo fino del SVG (no cambia tamaño, solo translateX) ----------
  const imgRef = useRef<HTMLImageElement>(null);
  const startX = useRef(0);
  const startTx = useRef(0);
  const [draggingArt, setDraggingArt] = useState(false);
  const ART_MAX_SHIFT = 48;

  const setArtTx = (tx: number) => {
    const el = imgRef.current;
    if (!el) return;
    const clamped = Math.max(-ART_MAX_SHIFT, Math.min(ART_MAX_SHIFT, tx));
    el.style.transform = `translateX(${clamped}px)`;
  };

  const onArtPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    setDraggingArt(true);
    startX.current = e.clientX;
    const m = imgRef.current?.style.transform.match(/translateX\((-?\d+(?:\.\d+)?)px\)/);
    startTx.current = m ? parseFloat(m[1]) : 0;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    e.preventDefault();
  };
  const onArtPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!draggingArt) return;
    e.preventDefault();
    const delta = e.clientX - startX.current;
    setArtTx(startTx.current + delta);
  };
  const onArtPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    setDraggingArt(false);
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  // ---------- Scroller horizontal con snap y DRAG para navegar entre paneles ----------
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [draggingScroll, setDraggingScroll] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  // Arrancar SIEMPRE en el panel 1 bien centrado
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    // Forzamos al primer snap al montar
    el.scrollTo({ left: 0, behavior: "auto" });
  }, []);

  // Convertir rueda vertical a horizontal (para trackpads/ratón)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (ev: WheelEvent) => {
      if (Math.abs(ev.deltaY) > Math.abs(ev.deltaX)) {
        ev.preventDefault();
        el.scrollLeft += ev.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Drag horizontal sobre el scroller (como “arrastrar carrusel”)
  const onScrollPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const el = scrollerRef.current;
    if (!el) return;
    setDraggingScroll(true);
    dragStartX.current = e.clientX;
    dragStartScroll.current = el.scrollLeft;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    e.preventDefault();
  };
  const onScrollPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!draggingScroll) return;
    const el = scrollerRef.current;
    if (!el) return;
    e.preventDefault();
    const dx = e.clientX - dragStartX.current;
    el.scrollLeft = dragStartScroll.current - dx;
  };
  const onScrollPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    setDraggingScroll(false);
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    // El snap se encarga de alinear, no hace falta más.
  };

  const goToForm = () => {
    const target = document.getElementById("careers-form-panel");
    target?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  return (
    <main className="bg-white">
      {/* Scroller horizontal a pantalla completa (snap por panel) */}
      <div
        ref={scrollerRef}
        className="
          w-full overflow-x-auto overflow-y-hidden
          snap-x snap-mandatory snap-always
          select-none
          [overscroll-behavior-x:contain]
          [&::-webkit-scrollbar]:hidden
          cursor-grab active:cursor-grabbing
        "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onPointerDown={onScrollPointerDown}
        onPointerMove={onScrollPointerMove}
        onPointerUp={onScrollPointerUp}
        onPointerCancel={onScrollPointerUp}
      >
        {/* Dos paneles; cada uno ocupa exactamente el ancho visible */}
        <div className="flex w-[200%]">
          {/* ---------- Panel 1: Arte + copy ---------- */}
          <section className="min-w-full snap-start">
            <div className="container mx-auto max-w-[1440px] px-4">
              <div className="grid md:grid-cols-[1fr_1fr] gap-8 md:gap-12 items-start py-12 md:py-16">
                {/* Ilustración (paneo fino) */}
                <div
                  className="
                    w-full overflow-hidden
                    cursor-grab active:cursor-grabbing
                    touch-none overscroll-none
                  "
                  data-cursor={draggingArt ? "drag-active" : "drag"}
                  onPointerDown={onArtPointerDown}
                  onPointerMove={onArtPointerMove}
                  onPointerUp={onArtPointerUp}
                  onPointerCancel={onArtPointerUp}
                >
                  <img
                    ref={imgRef}
                    src={CareersSvg}
                    alt="Gráfica OUMA"
                    className="w-full h-auto will-change-transform transition-[transform] duration-75 ease-linear"
                    style={{ transform: "translateX(0px)" }}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    loading="lazy"
                  />
                </div>

                {/* Copy (20px negro) */}
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

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={goToForm}
                      className="inline-flex items-center gap-2 text-[20px] text-black hover:opacity-80"
                    >
                      Desliza →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---------- Panel 2: Formulario ---------- */}
          <section id="careers-form-panel" className="min-w-full snap-start">
            <div className="container mx-auto max-w-[1440px] px-4 py-12 md:py-16">
              <h2 className="text-[40px] md:text-[56px] font-semibold">Tus datos</h2>

              <div className="mt-8 grid md:grid-cols-2 gap-8">
                {/* Nombre */}
                <div>
                  <label className="block text-[12px] tracking-wide text-neutral-500 mb-2">
                    NOMBRE COMPLETO
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none border-b border-neutral-300 py-2 text-[14px] md:text-[15px]"
                    placeholder=""
                  />
                </div>

                {/* Edad */}
                <div>
                  <label className="block text-[12px] tracking-wide text-neutral-500 mb-2">EDAD</label>
                  <input
                    type="number"
                    className="w-full bg-transparent outline-none border-b border-neutral-300 py-2 text-[14px] md:text-[15px] appearance-none"
                    placeholder=""
                  />
                </div>

                {/* Correo */}
                <div>
                  <label className="block text-[12px] tracking-wide text-neutral-500 mb-2">
                    CORREO ELECTRÓNICO
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent outline-none border-b border-neutral-300 py-2 text-[14px] md:text-[15px]"
                    placeholder=""
                  />
                </div>

                {/* Teléfono (prefijo + número) */}
                <div className="grid grid-cols-[100px_1fr] gap-4">
                  <div>
                    <label className="block text-[12px] tracking-wide text-neutral-500 mb-2 opacity-0 select-none">
                      PREFIJO
                    </label>
                    <input
                      type="text"
                      defaultValue="+52"
                      className="w-full bg-transparent outline-none border-b border-neutral-300 py-2 text-[14px] md:text-[15px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] tracking-wide text-neutral-500 mb-2 opacity-0 select-none">
                      TELÉFONO
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-transparent outline-none border-b border-neutral-300 py-2 text-[14px] md:text-[15px]"
                      placeholder="000 000 - 0000"
                    />
                  </div>
                </div>

                {/* Área de interés */}
                <div>
                  <label className="block text-[12px] tracking-wide text-neutral-500 mb-2">
                    ÁREA DE INTERÉS
                  </label>
                  <select
                    className="w-full bg-transparent outline-none border-b border-neutral-300 py-2 text-[14px] md:text-[15px]"
                    defaultValue=""
                  >
                    <option value="" disabled hidden></option>
                    <option value="arquitectura">Arquitectura</option>
                    <option value="construccion">Construcción</option>
                    <option value="interiorismo">Interiorismo</option>
                    <option value="bim">BIM System</option>
                    <option value="productos">Productos</option>
                  </select>
                </div>

                {/* Spacer */}
                <div />

                {/* Uploader (maqueta visual) */}
                <div className="md:col-span-2">
                  <label className="block text-[12px] tracking-wide text-neutral-500 mb-2">
                    ADJUNTA TU CV Y PORTAFOLIO AQUÍ
                  </label>
                  <div className="w-full border border-neutral-300 bg-neutral-50 py-10 text-center text-neutral-500">
                    <div className="text-[14px]">HAZ CLICK O ARRASTRA LOS ARCHIVOS AQUÍ</div>
                    <div className="text-[11px] mt-1">Peso máximo 3 MB</div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  className="text-[14px] md:text-[15px] underline underline-offset-4 hover:opacity-80"
                >
                  SEND
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
