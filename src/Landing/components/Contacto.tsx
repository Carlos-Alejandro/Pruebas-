import React, { useState, useRef, useEffect } from "react";

type Oficina = {
  nombre: string;
  detalle: string;
};

function AccordionItem({
  oficina,
  isOpen,
  onToggle,
  index,
}: {
  oficina: Oficina;
  isOpen: boolean;
  onToggle: (i: number) => void;
  index: number;
}) {
  const headerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [maxH, setMaxH] = useState<string>("80px");

  useEffect(() => {
    const update = () => {
      const headerH = headerRef.current?.offsetHeight ?? 80;
      const contentH = contentRef.current?.scrollHeight ?? 0;
      // add small padding (16px) so content isn't clipped
      setMaxH(isOpen ? `${headerH + contentH + 16}px` : `${headerH}px`);
    };

    // measure initially and on resize
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isOpen]);

  return (
    <div
      className="border-b border-[#333333] bg-transparent overflow-hidden transition-all duration-500 ease-in-out"
      style={{ maxHeight: maxH }}
    >
      <button
        ref={headerRef}
        type="button"
        onClick={() => onToggle(index)}
        className="w-full flex justify-between items-center text-left text-[#000000] text-[3.2rem] md:text-[4rem] lg:text-[4.8rem] font-bold py-[1rem] pb-[0.4rem] bg-transparent focus:outline-none border-none"
      >
        {oficina.nombre}
        <span className={`text-[2.4rem] md:text-[3rem] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
          +
        </span>
      </button>

      <div ref={contentRef} className="-mt-[1.5rem] px-[0.5rem]">
        <p className="text-[1.8rem] md:text-[2rem] text-[#333333] font-timesNow py-[0.5rem] bg-transparent">
          {oficina.detalle}
        </p>
      </div>
    </div>
  );
}

const Contacto: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Formulario enviado");
  };

  const oficinas = [
    {
      nombre: "Playa del Carmen, Quintana Roo",
      detalle:
        "Sucursal principal. Dirección: Av. Juárez #123, Playa del Carmen.",
    },
    {
      nombre: "Paraíso, Tabasco",
      detalle:
        "Sucursal regional. Dirección: Calle Central #45, Paraíso, Tabasco.",
    },
    {
      nombre: "Ciudad de México, CDMX",
      detalle:
        "Oficina corporativa. Dirección: Reforma #250, Ciudad de México.",
    },
  ];

  const [abiertas, setAbiertas] = useState<boolean[]>(oficinas.map(() => false));

  const toggleAcordeon = (index: number) => {
    setAbiertas((prev) =>
      prev.map((estado, i) => (i === index ? !estado : false))
    );
  };

  return (
    <section className="bg-[#FF7800] flex justify-center">
      <div className="w-full max-w-[179.4rem] px-[2.4rem] sm:px-[1.6rem] flex flex-wrap justify-center gap-[4rem] lg:min-h-[73.9rem]">

        {/* Bloque Contacto */}
        <div
          className="flex flex-col bg-[#FF7800] p-[2rem] xl:relative flex-shrink-0 w-full max-w-[81.9rem] lg:h-[61.3rem] h-auto"
        >
          <h2 className="text-[3.6rem] font-bold mb-[2rem] text-[#333333] font-testSohne">
            /CONTACTO
          </h2>

          <form className="flex flex-col gap-[2rem] xl:pb-[12rem]" onSubmit={handleSubmit}>
            <label className="flex flex-col text-[2rem] text-[#333333] max-w-[81.9rem] w-full font-timesNow">
              Nombre
              <input
                type="text"
                required
                className="mt-[0.5rem] p-[0.5rem] border-b-[2px] border-[#333333] border-t-0 border-l-0 border-r-0 text-[3.2rem] text-[#333333] bg-transparent focus:outline-none w-full"
              />
            </label>

            <label className="flex flex-col text-[2rem] text-[#333333] max-w-[81.9rem] w-full font-timesNow">
              Correo Electrónico
              <input
                type="email"
                required
                className="mt-[0.5rem] p-[0.5rem] border-b-[2px] border-[#333333] border-t-0 border-l-0 border-r-0 text-[3.2rem] text-[#333333] bg-transparent focus:outline-none w-full"
              />
            </label>

            <label className="flex flex-col text-[2rem] text-[#333333] max-w-[81.9rem] w-full font-timesNow">
              Mensaje
              <textarea
                required
                className="mt-[0.5rem] p-[0.5rem] border-b-[2px] border-[#333333] border-t-0 border-l-0 border-r-0 text-[3.2rem] text-[#333333] bg-transparent h-[12rem] resize-none focus:outline-none w-full"
              />
            </label>

            {/* Send button: flow on mobile, absolute positioned on lg screens */}
            <button
              type="submit"
              aria-label="Enviar formulario"
              className="mt-[1.6rem] xl:mt-0 self-end xl:absolute xl:bottom-[2rem] xl:right-[2rem] xl:z-20 text-[2.4rem] md:text-[3rem] xl:text-[4rem] underline text-[#333333] bg-transparent cursor-pointer border-none p-0"
            >
              Send
            </button>
          </form>
        </div>

        {/* Bloque Oficinas con acordeón */}
        <div
          className="flex flex-col bg-[#FF7800] p-[2rem] flex-shrink-0 justify-between w-full max-w-[81.9rem] lg:h-[61.3rem] h-auto"
        >
          <div>
            <h2 className="text-[3.6rem] font-bold mb-[2rem] font-testSohne text-[#000000]">
              OFICINAS
            </h2>
            {/* Acordeón */}
            <div className="flex flex-col">
              {oficinas.map((oficina, index) => (
                <AccordionItem
                  key={index}
                  oficina={oficina}
                  index={index}
                  isOpen={abiertas[index]}
                  onToggle={toggleAcordeon}
                />
              ))}
            </div>
          </div>

          {/* Bloque inferior Dirección / Contacto */}
          <div className="mt-[2rem] flex gap-[4rem]">
            {/* Dirección */}
            <div
              className="w-[16.5rem] h-[8.1rem] flex flex-col justify-start"
            >
              <span className="text-[1.6rem] font-bold text-[#000000] mb-[0.6rem]">
                Dirección
              </span>
              <p className="text-[1.6rem] text-[#000000] font-timesNow leading-snug">
                Calle 10 #43, Herón Proal, Álvaro Obregón, 01640 CDMX
              </p>
            </div>

            {/* Contacto */}
            <div
              className="w-[11.6rem] h-[6.3rem] flex flex-col justify-start"
            >
              <span className="text-[1.6rem] font-bold text-[#000000] mb-[0.6rem]">
                Contacto
              </span>
              <p className="text-[1.6rem] text-[#000000] font-timesNow leading-snug">
                jp@circular.uno
                www.circular.uno
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
