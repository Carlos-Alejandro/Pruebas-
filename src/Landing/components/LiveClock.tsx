import React, { useState, useEffect, useRef } from "react";

const LiveClock: React.FC = () => {
  const [hora, setHora] = useState<string>(() => {
    const ahora = new Date();
    return ahora.toUTCString().split(" ")[4] + " GMT"; // HH:MM:SS GMT
  });

  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const actualizarHora = () => {
      const ahora = new Date();
      const nuevaHora = ahora.toUTCString().split(" ")[4] + " GMT";
      setHora((prev) => (prev !== nuevaHora ? nuevaHora : prev));

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        rafRef.current = requestAnimationFrame(actualizarHora);
      } else {
        setTimeout(actualizarHora, 1000);
      }
    };

    actualizarHora();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="bg-[#FF7800] h-screen flex justify-center items-end">
      {/* Contenedor principal */}
      <div className="w-[179.4rem] max-h-[84.2rem]flex flex-col justify-end">
        {/* Reloj + texto en línea */}
        <div className="flex items-start">
          <span className="text-[#000000] font-bold text-[10rem]">
            {hora}
          </span>
          <span className="text-[#000000] text-[3.2rem] ml-[26.6rem]">
            Empresa líder en la construcción en México.
          </span>
        </div>

        {/* Aquí podrás agregar otros divs para más contenido */}
        <div className="mt-10">
          {/* Contenido adicional */}
        </div>
      </div>
    </section>
  );
};

export default LiveClock;
