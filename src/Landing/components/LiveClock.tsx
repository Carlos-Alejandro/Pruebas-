import React, { useState, useEffect, useRef } from "react";

const LiveClock: React.FC = () => {
  const [hora, setHora] = useState<string>(() => {
    const ahora = new Date();
    return ahora.toUTCString().split(" ")[4] + " GMT"; 
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

  const menuItems = ["empresa", "servicios", "proyectos", "equipos", "contactos"];

  return (
    <section className="bg-[#FF7800] flex justify-center items-end w-full min-h-screen">
      <div className="w-full max-w-[179.4rem] flex flex-col justify-end relative px-6 sm:px-8 md:px-12">
        
        {/* Reloj + texto */}
        <div className="flex items-start relative">
          <h1 className="text-[#000] font-bold font-[Test_Söhne] mb-0 text-[10rem] lg:text-[10rem] md:text-[8rem] sm:text-[6rem] xs:text-[4rem]">
            {hora}
          </h1>
          <span className="text-[#000] font-[Times_Now] uppercase ml-[26.6rem] lg:ml-[26.6rem] md:ml-[10rem] sm:ml-[5rem] xs:ml-[2rem] mt-[8rem] lg:mt-[8rem] md:mt-[4rem] sm:mt-[2rem] xs:mt-[1rem] text-[3.2rem] lg:text-[3.2rem] md:text-[2.5rem] sm:text-[2rem] xs:text-[1.5rem]">
            Empresa líder en la construcción en México.
          </span>
        </div>

        {/* Contenedor de cuadros */}
        <div className="w-full h-[23.8rem] lg:h-[23.8rem] md:h-[18rem] sm:h-[15rem] xs:h-[12rem] border-2 border-[#333333] grid grid-cols-5 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 divide-x-2 lg:divide-x-2 md:divide-x-2 sm:divide-x-2 xs:divide-x-0 divide-[#333333] font-[Times_Now] mt-8">
          {menuItems.map((item, index) => (
            <div key={index} className="flex justify-start items-start min-w-0 h-full pt-4 pl-6 sm:pl-4 xs:pl-2">
              <span className="ml-[4rem] mt-[2.4rem] text-black font-bold uppercase text-[3.2rem] lg:text-[3.2rem] md:text-[2.5rem] sm:text-[1.8rem] xs:text-[1.5rem]">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="w-full h-[8rem] lg:h-[8rem] md:h-[6rem] sm:h-[5rem] xs:h-[4rem] flex items-center justify-between px-6 sm:px-4 xs:px-2 mt-8">
          <span className="text-[#000] font-[Times_Now] text-[2rem] lg:text-[2rem] md:text-[1.6rem] sm:text-[1.4rem] xs:text-[1rem]">
            &copy; {new Date().getFullYear()} Circular.
          </span>
          <span className="text-[#000] font-[Times_Now] text-[2rem] lg:text-[2rem] md:text-[1.6rem] sm:text-[1.4rem] xs:text-[1rem]">
            Todos los derechos reservados.
          </span>
        </div>

      </div>
    </section>
  );
};

export default LiveClock;
