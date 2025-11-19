import React, { useRef } from "react";
import { gsap } from "gsap";
import { useLanguage, type Language } from "../../common/i18n/LanguageContext";

import photo1 from "../../assets/Hero/Bicicleta.png";
import photo2 from "../../assets/Hero/PlatiloComida.png";
import photo3 from "../../assets/Hero/Entrada.png";
import photo4 from "../../assets/Hero/MujerGas.png";

// LOGOS DE MARCAS
import openfilmsLogo from "../../assets/Logos/openfilms.svg";
import karavanaLogo from "../../assets/Logos/karavana.svg";
import okkoLogo from "../../assets/Logos/okko.svg";
import neroliLogo from "../../assets/Logos/neroli.svg";
import garageLogo from "../../assets/Logos/garage.svg";
import oumaLogo from "../../assets/Logos/ouma.svg";
import aarhusLogo from "../../assets/Logos/aarhus.svg";

import heroJson from "../../common/i18n/hero.json";

const photos = [photo1, photo2, photo3, photo4];

type BrandLogo = {
  src: string;
  alt: string;
  invertOnDark?: boolean;
};

const brandLogos: BrandLogo[] = [
  { src: openfilmsLogo, alt: "Openfilms" },
  { src: karavanaLogo, alt: "Karavana" },
  { src: okkoLogo, alt: "OKKO" },
  { src: oumaLogo, alt: "Ouma", invertOnDark: true },
  { src: aarhusLogo, alt: "Aarhus", invertOnDark: true },
  { src: neroliLogo, alt: "Neroli", invertOnDark: true },
  { src: garageLogo, alt: "Garage", invertOnDark: true },
];

type HeroCopy = {
  tagline: string;
  clients: string[];
};

const heroDictionary = heroJson as Record<Language, HeroCopy>;

type HeroPhotoProps = {
  src: string;
  index: number;
};

function HeroPhoto({ src, index }: HeroPhotoProps) {
  const figureRef = useRef<HTMLElement | null>(null);
  const circleRef = useRef<SVGCircleElement | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!figureRef.current || !circleRef.current) return;

    const rect = figureRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / width) * 100;

    let transitionMultiplier =
      xPercent < 50 ? ((xPercent - 50) * -1) / 50 : (xPercent - 50) / 50;

    const baseSpeed = 1.4;
    const speed = baseSpeed - (baseSpeed * 0.4) * transitionMultiplier;

    const maxRadius = Math.sqrt(width * width + height * height);

    gsap.killTweensOf(circleRef.current);

    gsap.set(circleRef.current, {
      opacity: 1,
      attr: {
        r: 0,
        cx: x,
        cy: y,
      },
    });

    gsap.to(circleRef.current, {
      duration: speed,
      ease: "power2.out",
      attr: {
        r: maxRadius,
      },
    });
  };

  const handleMouseLeave = () => {
    if (!circleRef.current) return;

    gsap.killTweensOf(circleRef.current);

    gsap.to(circleRef.current, {
      duration: 0.6,
      ease: "power2.inOut",
      attr: { r: 0 },
      opacity: 0,
    });
  };

  return (
    <figure
      ref={figureRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="
        hero-figure
        group
        relative
        h-full
        flex-1
        overflow-hidden
        transition-[flex] duration-500 ease-out
        hover:flex-[1.5]
        md:hover:flex-[1.7]
      "
    >
      {/* Capa base en blanco y negro */}
      <img
        src={src}
        alt={`Hero ${index + 1}`}
        className="
          h-full w-full
          object-cover object-bottom
          filter grayscale contrast-[1.25]
        "
      />

      {/* Capa en color dentro de un SVG con máscara circular */}
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <mask id={`hero-mask-${index}`}>
            <rect width="100%" height="100%" fill="black" />
            <circle
              ref={circleRef}
              className="mask-circle"
              r={0}
              cx={0}
              cy={0}
              fill="white"
              opacity={0}
            />
          </mask>
        </defs>

        <image
          href={src}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
          mask={`url(#hero-mask-${index})`}
        />
      </svg>

      {/* Capa suave para oscurecer un poco en B/N (la quitamos al hover) */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-black/20
          transition-opacity duration-700
          group-hover:opacity-0
        "
      />

      {/* Degradado sutil en los extremos para integrarlo con el fondo */}
      {index === 0 && (
        <div
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-r from-black via-black/10 to-black/0
          "
        />
      )}
      {index === photos.length - 1 && (
        <div
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-l from-black via-black/10 to-black/0
          "
        />
      )}
    </figure>
  );
}

export default function HeroModule() {
  const { language } = useLanguage();
  const { tagline } = heroDictionary[language];

  return (
    <section className="w-full bg-white text-slate-900">
      {/* COPY DEL HERO */}
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-8 text-center">
        <p
          className="
            whitespace-pre-line
            text-[16px] sm:text-[18px] md:text-[22px]
            font-semibold
            tracking-[0.20em]
            uppercase
            text-black
            leading-tight
          "
        >
          “{tagline}”
        </p>
      </div>

      {/* HERO FOTOS */}
      <div className="w-full">
        <div
          className="
            w-full
            h-[68vh] md:h-[72vh] lg:h-[76vh]
            max-h-[900px]
            overflow-hidden
            bg-black
          "
        >
          <div className="flex w-full h-full">
            {photos.map((src, idx) => (
              <HeroPhoto key={idx} src={src} index={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* CARRUSEL DE MARCAS */}
      <div className="w-full bg-black border-t border-neutral-800 py-6 sm:py-8">
        <div className="relative overflow-hidden">
          {/* Degradado lateral izquierdo */}
          <div
            className="
              pointer-events-none
              absolute inset-y-0 left-0
              w-16 sm:w-20
              bg-gradient-to-r from-black to-transparent
              z-10
            "
          />
          {/* Degradado lateral derecho */}
          <div
            className="
              pointer-events-none
              absolute inset-y-0 right-0
              w-16 sm:w-20
              bg-gradient-to-l from-black to-transparent
              z-10
            "
          />

          {/* Track deslizante de logos */}
          <div className="brands-marquee">
            {[...brandLogos, ...brandLogos].map((brand, idx) => (
              <div
                key={`${brand.alt}-${idx}`}
                className="
                  flex items-center justify-center
                  h-14 sm:h-16 md:h-20          /* misma altura base + más grandes */
                  min-w-[140px] sm:min-w-[170px] md:min-w-[190px]
                  px-8
                "
              >
                <div
                  className={
                    brand.invertOnDark
                      ? "flex h-full items-center justify-center rounded-sm bg-white/[0.03]"
                      : "flex h-full items-center justify-center"
                  }
                >
                  <img
                    src={brand.src}
                    alt={brand.alt}
                    className={
                      "max-h-full w-auto object-contain opacity-80 transition-all duration-300 " +
                      (brand.invertOnDark
                        ? " invert brightness-[3] contrast-150"
                        : "") +
                      " hover:opacity-100 hover:scale-105"
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
