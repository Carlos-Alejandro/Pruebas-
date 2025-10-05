import React from "react";
import heroImage from "../../assets/Hero/Hero-Circular.png";

/**
 * Hero principal — versión final
 * Centrado perfecto + fondo cubriendo todo el viewport
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.25)]" />

      {/* Texto centrado */}
      <div className="relative z-10 max-w-[60.6rem] px-[3.2rem] text-center">
        <h1 className="text-white font-bold text-[4rem] sm:text-[2.4rem] leading-tight">
          Creamos entornos de alta calidad.
        </h1>
      </div>
    </section>
  );
};

export default Hero;
