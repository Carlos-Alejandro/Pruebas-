import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import LeftNav from "../../assets/Icons/MenuAmb/left-nav.svg";

const CATS = [
  { label: "ARQUITECTURA", to: "/" },
  { label: "CONSTRUCCIÓN", to: "/construccion" },
  { label: "INTERIORISMO", to: "/interiorismo" },
  { label: "BIM SYSTEM", to: "/bim" },
  { label: "PRODUCTOS", to: "/productos" },
];

// Rutas del menú lateral (izquierdo)
const MENU = [
  { label: "PROYECTOS", to: "/" },
  { label: "NOSOTROS", to: "/nosotros" },
  { label: "SERVICIOS", to: "/servicios" },
  { label: "BLOG", to: "/blog" },
  { label: "CAREERS", to: "/careers" },
  { label: "CONTACTO", to: "/contacto" },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  
  // Verificar si estamos en alguna de las rutas de categorías
  const showCategories = CATS.some(cat => location.pathname === cat.to);


  return (
    <header className="bg-neutral-50/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-50/70 ">
      <div className="mx-auto max-w-[1440px] px-2 md:px-4">
        {/* altura fija para que no cambie al abrir/cerrar */}
        <div className="py-6 min-h-[130px]">
          {/* Móvil: columnas flexibles | Desktop: 140 | centro | 240 */}
          <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[140px_1fr_240px] items-start gap-1 md:gap-0">
            {/* IZQUIERDA: hamburguesa y (si está abierto) la lista debajo */}
            <div className="flex flex-col items-start relative">
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

              {/* Lista vertical: absoluta para no empujar el layout (sin recuadro) */}
              <ul
                className={[
                  "absolute left-0 top-[calc(100%+12px)]",
                  "flex flex-col gap-[2px] uppercase",
                  "transition-opacity duration-150",
                  openMenu
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none",
                ].join(" ")}
              >
                {MENU.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={() => setOpenMenu(false)}
                      className={({ isActive }) =>
                        [
                          "text-[17px] font-medium",
                          isActive
                            ? "text-neutral-900" // ACTIVO -> negro
                            : "text-neutral-400 hover:text-neutral-700",
                        ].join(" ")
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* CENTRO: logo + categorías (solo visibles en rutas de categorías) */}
            <div className="flex flex-col items-center">
              <div className="h-9 flex items-center">
                <img
                  src={Logo}
                  alt="Ouma"
                  className="w-[114px] h-[27px] object-contain select-none"
                  draggable={false}
                />
              </div>
              {showCategories && (
                <>
                  {/* Desktop */}
                  <nav className="mt-4 hidden md:flex items-center gap-8 text-[12px] uppercase">
                    {CATS.map((cat) => (
                      <NavLink
                        key={cat.label}
                        to={cat.to}
                        data-cursor="link"
                        className={({ isActive }) =>
                          isActive
                            ? "font-semibold text-neutral-900"
                            : "text-neutral-400 hover:text-neutral-700"
                        }
                      >
                        {cat.label}
                      </NavLink>
                    ))}
                  </nav>
                  {/* Mobile */}
                  <nav className="mt-2 flex md:hidden flex-col items-center gap-1 text-[10px] uppercase">
                    <div className="flex gap-3">
                      {CATS.slice(0, 3).map((cat) => (
                        <NavLink
                          key={cat.label}
                          to={cat.to}
                          data-cursor="link"
                          className={({ isActive }) =>
                            isActive
                              ? "font-semibold text-neutral-900"
                              : "text-neutral-400 hover:text-neutral-700"
                          }
                        >
                          {cat.label}
                        </NavLink>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {CATS.slice(3).map((cat) => (
                        <NavLink
                          key={cat.label}
                          to={cat.to}
                          data-cursor="link"
                          className={({ isActive }) =>
                            isActive
                              ? "font-semibold text-neutral-900"
                              : "text-neutral-400 hover:text-neutral-700"
                          }
                        >
                          {cat.label}
                        </NavLink>
                      ))}
                    </div>
                  </nav>
                </>
              )}
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
