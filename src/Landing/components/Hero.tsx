import React from "react";
import heroImage from "../../assets/Hero/Hero-Circular.png";

/**
 * Hero principal — versión responsive final
 * - Cubre 100% del ancho y alto del viewport (100vh)
 * - Imagen centrada con proporción correcta
 * - Overlay gris (#D9D9D9 con opacidad)
 * - Texto centrado perfectamente
 * - Tipografía y layout 100% responsive en rem
 */

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo */}
      <img
        src={heroImage}
        alt="Fondo hero"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay gris del diseño Figma */}
      <div className="absolute inset-0 bg-[#D9D9D9]/[0.24]" />

      {/* Texto centrado */}
      <div className="relative z-10 text-center mx-auto px-[3.2rem] max-w-[80.6rem] sm:max-w-[60.6rem]">
        <h1
          className="
            font-soehne font-bold leading-[1] 
            text-[2.4rem] sm:text-[3rem] md:text-[3.6rem] lg:text-[4rem]
          "
          style={{ color: "#F2F2F2" }}
        >
          Creamos entornos de alta calidad.
        </h1>
      </div>
    </section>
  );
};

export default Hero;
