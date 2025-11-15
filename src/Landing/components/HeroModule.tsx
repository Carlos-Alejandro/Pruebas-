import { useLanguage, type Language } from "../../common/i18n/LanguageContext";

import photo1 from "../../assets/Hero/Bicicleta.png";
import photo2 from "../../assets/Hero/PlatiloComida.png";
import photo3 from "../../assets/Hero/Entrada.png";
import photo4 from "../../assets/Hero/MujerGas.png";

// IMPORTA EL JSON DEL HERO (src/Landing/i18n/hero.json)
import heroJson from "../../common/i18n/hero.json";

const photos = [photo1, photo2, photo3, photo4];

type HeroCopy = {
  tagline: string;
  clients: string[];
};

const heroDictionary = heroJson as Record<Language, HeroCopy>;

export default function HeroModule() {
  const { language } = useLanguage();
  const { tagline, clients } = heroDictionary[language];

  return (
    <section className="w-full bg-white text-slate-900">
      {/* Tagline */}
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-6 text-center">
        <p className="text-xs font-semibold tracking-[0.35em] text-slate-800 sm:text-sm">
          “{tagline}”
        </p>
      </div>

      {/* Fila de fotos */}
      <div className="relative mx-auto max-w-6xl px-4 pb-8">
        {/* Strip de fotos */}
        <div className="relative z-0 grid grid-cols-2 gap-2 overflow-hidden bg-black sm:grid-cols-4 sm:gap-3">
          {photos.map((src, idx) => (
            <figure
              key={idx}
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <img
                src={src}
                alt={`Hero ${idx + 1}`}
                className="h-full w-full object-cover
                           filter grayscale contrast-[1.25]
                           transition duration-700 ease-out
                           group-hover:grayscale-0 group-hover:scale-[1.02]"
              />
              {/* Capa suave para oscurecer un poco en B/N */}
              <div
                className="pointer-events-none absolute inset-0
                           bg-black/20 opacity-100
                           transition duration-700
                           group-hover:opacity-0"
              />
              {/* Degradado gris (transparente) → negro de lado a lado (solo primera foto) */}
              {idx === 0 && (
                <div
                  className="pointer-events-none absolute inset-0
                             bg-gradient-to-r from-[#D9D9D9]/0 to-black"
                />
              )}
              {/* Degradado gris (transparente) → negro de lado a lado (solo última foto) */}
              {idx === photos.length - 1 && (
                <div
                  className="pointer-events-none absolute inset-0
                             bg-gradient-to-l from-[#D9D9D9]/0 to-black"
                />
              )}
            </figure>
          ))}
        </div>
      </div>

      {/* Logos / clientes */}
      <div className="mx-auto max-w-6xl px-4 pb-10">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-slate-200 pt-6">
          {clients.map((client) => (
            <span
              key={client}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
