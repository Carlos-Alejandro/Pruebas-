import React from "react";
import trabajadorImg from "../../assets/Empresa/Trabajador.jpg";

/**
 * Sección EMPRESA — Figma 1794x1195px
 * Mantiene medidas exactas en desktop (≥1280px)
 * y escala fluidamente en tablet y móvil
 */
export const Empresa: React.FC = () => {
  return (
    <section
      className="
        relative
        w-full
        max-w-[179.4rem]     /* 1794px */
        h-auto
        bg-[#E5E5E4]
        text-[#000]
        mx-auto
        overflow-hidden
        flex flex-col
        lg:flex-row
      "
    >
      {/* 🔹 Columna izquierda (texto) */}
      <div
        className="
          relative
          flex
          flex-col
          justify-center
          lg:justify-start
          items-start
          w-full
          lg:w-[85.7rem]     /* 937px espacio antes de la imagen */
          px-[4rem]
          py-[6rem]
          lg:py-0
          text-justify
        "
      >
        {/* Línea horizontal superior */}
        <div
          className="
            hidden lg:block
            absolute
            left-[4rem] top-[59rem]
            w-[81.7rem]      /* 817px */
            border border-[#333333]
          "
        />

        {/* Título */}
        <h2
          className="
            font-[Test_Söhne]
            font-medium
            text-[3.6rem] leading-[4.6rem]
            lg:text-[4.8rem] lg:leading-[6.4rem]
            text-left
            mb-[2rem]
          "
        >
          EMPRESA
        </h2>

        {/* Texto descriptivo */}
        <p
          className="
            font-[Times_Now]
            text-[1.8rem] leading-[2.6rem]
            lg:text-[3.2rem] lg:leading-[3.7rem]
            max-w-[81.7rem]  /* 817px */
          "
        >
          Somos una empresa mexicana con más de 13 años de experiencia en
          construcción, dedicada al desarrollo de soluciones integrales.
          <br />
          <br />
          Nuestra especialización abarca proyectos de obra pública, hotelería,
          desarrollos habitacionales, infraestructura marítima y construcción
          para la industria petrolera.
          <br />
          <br />
          Nuestro propósito principal es transformar espacios funcionales en
          entornos de alta calidad, alineados con las necesidades y expectativas
          de nuestros clientes.
        </p>
      </div>

      {/* 🔹 Columna derecha (imagen) */}
      <div
        className="
          relative
          w-full
          lg:w-[81.7rem]      /* 817px */
          h-[60rem]
          lg:h-[111.5rem]     /* 1115px */
          bg-[#D9D9D9]
          overflow-hidden
        "
      >
        {/* Imagen principal */}
        <img
          src={trabajadorImg}
          alt="Trabajador Circular"
          className="
            w-full h-full object-cover object-center
          "
        />

        {/* Línea vertical decorativa (solo desktop) */}
        <div
          className="
            hidden lg:block
            absolute
            left-[-4rem]
            top-0
            h-full
            border border-[#333333]
          "
        />
      </div>
    </section>
  );
};
