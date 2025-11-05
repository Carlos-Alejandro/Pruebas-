// src/App.tsx
import { Outlet } from "react-router-dom";
import Header from "./common/header/Header";
import CustomCursor from "./common/cursor/CustomCursor";

export default function App() {
  return (
    <div className="min-h-dvh bg-neutral-50 text-neutral-900 font-cabinet">
      {/* Header fijo para todo el sitio */}
      <Header />

      {/* Aquí se renderizan las páginas según la ruta */}
      <Outlet />

      {/* Cursor global */}
      <CustomCursor />
    </div>
  );
}
