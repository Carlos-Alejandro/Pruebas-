import React from "react";
import heroImage from "../../assets/Hero/Hero-Circular.png";

/**
 * Hero principal — versión responsive fiel a Figma.
 * Desktop (1794x1080) sin alterar; mobile/tablet se adapta.
 */
const Hero: React.FC = () => {
  return (
    <section
      className="
        relative
        w-full
        max-w-[179.4rem]   /* 1794px */
        h-[108rem]         /* 1080px */
        mx-auto
        overflow-hidden
        aspect-[1794/1080] /* mantiene proporción */
      "
    >
      {/* Fondo gris base */}
      <div className="absolute inset-0 bg-[#D9D9D9]" />

      {/* Imagen principal */}
      <img
        src={heroImage}
        alt="Fondo hero"
        className="
          absolute
          object-cover
          object-center
          w-[197.8rem]   /* 1978px */
          h-[111.3rem]   /* 1113px */
          left-[-15rem]  /* -150px */
          top-[-1.7rem]  /* -17px */
          max-w-none
          
          /* 🟡 Responsive */
          xl:w-[197.8rem] xl:h-[111.3rem] xl:left-[-15rem] xl:top-[-1.7rem]
          lg:w-[160rem] lg:h-[90rem] lg:left-[-10rem] lg:top-[-2rem]
          md:w-[120rem] md:h-[70rem] md:left-[-5rem] md:top-[-2rem]
          sm:w-[100rem] sm:h-[60rem] sm:left-[-3rem] sm:top-[-1rem]
        "
      />

      {/* Texto central */}
      <h1
        className="
          absolute
          text-[#F2F2F2]
          font-[Test_Söhne]
          font-medium
          text-center
          left-1/2
          -translate-x-1/2

          /* 🟢 Desktop (Figma exacto) */
          top-[51.3rem]    /* 513px */
          w-[60.6rem]      /* 606px */
          text-[4rem]      /* 40px */
          leading-[5.3rem] /* 53px */

          /* 🔵 Responsivo */
          lg:top-[40rem] lg:w-[50rem] lg:text-[3.4rem] lg:leading-[4.5rem]
          md:top-[32rem] md:w-[40rem] md:text-[2.8rem] md:leading-[3.8rem]
          sm:top-[25rem] sm:w-[30rem] sm:text-[2.2rem] sm:leading-[3rem]
          xs:top-[20rem] xs:w-[80%] xs:text-[1.8rem] xs:leading-[2.6rem]
        "
      >
        Creamos entornos de alta calidad.
      </h1>
    </section>
  );
};

export default Hero;
