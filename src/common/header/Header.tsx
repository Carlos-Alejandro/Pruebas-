import { useState } from "react";
import Logo from "../../assets/logo.svg";
import LeftNav from "../../assets/Icons/MenuAmb/left-nav.svg";

const CATS = [
  "ARQUITECTURA",
  "CONSTRUCCIÓN",
  "INTERIORISMO",
  "BIM SYSTEM",
  "PRODUCTOS",
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const active = "ARQUITECTURA";

  return (
    <header className="bg-neutral-50/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-50/70 ">
      <div className="container mx-auto max-w-[1440px] px-4">
        <div className="py-6">
          {/* 140 | centro | 240 */}
          <div className="grid grid-cols-[140px_1fr_240px] items-start">
            {/* IZQUIERDA: hamburguesa y (si está abierto) la lista debajo */}
            <div className="flex flex-col items-start">
              <button
                data-cursor="link"
                aria-label={openMenu ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={openMenu}
                onClick={() => setOpenMenu(v => !v)}
                className="p-0"
              >
                <img
                  src={LeftNav}
                  alt="Menú"
                  className="w-[38px] h-[24px] select-none"
                  draggable={false}
                />
              </button>

              {/* Lista vertical SOLO cuando está abierto */}
              {openMenu && (
                <ul className="mt-3 flex flex-col gap-[2px] uppercase">
                  <li className="text-[17px] font-medium text-neutral-900">
                    PROYECTOS
                  </li>
                  <li className="text-[17px] font-medium text-neutral-400 hover:text-neutral-700">
                    NOSOTROS
                  </li>
                  <li className="text-[17px] font-medium text-neutral-400 hover:text-neutral-700">
                    SERVICIOS
                  </li>
                  <li className="text-[17px] font-medium text-neutral-400 hover:text-neutral-700">
                    BLOG
                  </li>
                  <li className="text-[17px] font-medium text-neutral-400 hover:text-neutral-700">
                    CAREERS
                  </li>
                  <li className="text-[17px] font-medium text-neutral-400 hover:text-neutral-700">
                    CONTACTO
                  </li>
                </ul>
              )}
            </div>

            {/* CENTRO: logo + categorías (siempre visibles) */}
            <div className="flex flex-col items-center">
              <div className="h-9 flex items-center">
                <img
                  src={Logo}
                  alt="Ouma"
                  className="w-[114px] h-[27px] object-contain select-none"
                  draggable={false}
                />
              </div>
              <nav className="mt-4 hidden md:flex items-center gap-8 text-[12px] uppercase">
                {CATS.map((cat) => (
                  <a
                    key={cat}
                    data-cursor="link"
                    href="#"
                    className={
                      cat === active
                        ? "font-semibold text-neutral-900"
                        : "text-neutral-400 hover:text-neutral-700"
                    }
                  >
                    {cat}
                  </a>
                ))}
              </nav>
            </div>

            {/* DERECHA: search (siempre visible) */}
            <div className="justify-self-end w-full max-w-[240px] hidden sm:flex items-center gap-2">
              <input
                data-cursor="link"
                type="text"
                placeholder="SEARCH"
                className="w-full bg-transparent outline-none border-b border-neutral-300 placeholder:text-neutral-400 text-[12px] py-1"
              />
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                className="text-neutral-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
