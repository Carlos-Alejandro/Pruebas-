// src/Landing/page/Inicio.tsx
import HeroModule from "../components/HeroModule";
import { useLanguage } from "../../common/i18n/LanguageContext";

export default function Inicio() {
  const { language } = useLanguage();

  const sectionTitle =
    language === "es"
      ? "Un Blank listo para tus próximos proyectos"
      : "A Blank ready for your next projects";

  const sectionBody1 =
    language === "es"
      ? "Este proyecto está pensado como un punto de partida limpio para sitios de fotografía, estudios creativos o cualquier proyecto donde quieras iterar rápido en diseño."
      : "This project is designed as a clean starting point for photography sites, creative studios, or any project where you want to iterate fast on design.";

  const sectionBody2 =
    language === "es"
      ? "A partir de aquí puedes añadir secciones como servicios, proyectos, clientes y un portafolio completo, manteniendo siempre la estructura organizada por módulos."
      : "From here you can add sections like services, projects, clients and a full portfolio, while keeping the codebase organized by modules.";

  return (
    <div className="flex flex-col bg-slate-950 text-slate-50">
      {/* HERO principal con las 4 fotos B/N -> color */}
      <HeroModule />

      {/* Sección de texto bajo el hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 text-sm text-slate-200">
        <h2 className="text-lg font-semibold tracking-tight text-slate-50">
          {sectionTitle}
        </h2>

        <p className="mt-4 max-w-2xl leading-relaxed text-slate-300">
          {sectionBody1}
        </p>

        <p className="mt-3 max-w-2xl leading-relaxed text-slate-300">
          {sectionBody2}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
              React · Vite · TS
            </h3>
            <p className="mt-3 text-xs text-slate-300">
              Estructura pensada para proyectos modernos, con tipado fuerte y
              build rápido.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
              TailwindCSS
            </h3>
            <p className="mt-3 text-xs text-slate-300">
              Utiliza utilidades para construir diseños limpios y coherentes sin
              pelearte con CSS.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
              ES / EN Ready
            </h3>
            <p className="mt-3 text-xs text-slate-300">
              Sistema de traducciones simple pero escalable, listo para crecer
              por secciones.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
