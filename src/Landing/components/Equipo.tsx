import React from "react";
import img1 from "../../assets/Equipo/1.png";
import img2 from "../../assets/Equipo/2.png";
import img3 from "../../assets/Equipo/3.png";
import img4 from "../../assets/Equipo/4.png";

const Equipo: React.FC = () => {
  const members = [
    { name: "Guillermo C. Munozcano", role: "Director Administrativo y Socio Fundador", img: img1 },
    { name: "Jeronimo Prior-Mier y Teran", role: "Director Administrativo y Socio Fundador", img: img2 },
    { name: "First and Last Name", role: "Cargo", img: img3 },
    { name: "First and Last Name", role: "Cargo", img: img4 },
  ];

  return (
    <section id="equipo" className="bg-black py-[8rem] flex justify-center" style={{ backgroundColor: "#000000" }}>
      <div className="w-full max-w-[179.4rem] px-[4rem] flex flex-col">
        {/* Título */}
        <h2
          className="text-[3.6rem] font-bold ml-[4.5rem] mb-[4rem] uppercase tracking-wide"
          style={{ color: "#989898" }}
        >
          /EQUIPO
        </h2>

        {/* Grid de tarjetas */}
        <div className="grid gap-[4rem] justify-center"
             style={{ gridTemplateColumns: "repeat(auto-fit, minmax(19.9rem, 1fr))" }}>
          {members.map((m, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Imagen con aspect ratio */}
              <div className="w-full aspect-[39.8/57.1] overflow-hidden max-w-[39.8rem]">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Texto */}
              <div className="mt-[1.1rem] text-left w-full">
                <h3
                  className="text-[2.8rem] font-semibold leading-tight mb-[0.4rem]"
                  style={{ color: "#ffffff" }}
                >
                  {m.name}
                </h3>
                <p
                  className="text-[2rem] leading-snug"
                  style={{ color: "#ffffff" }}
                >
                  {m.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Equipo;
