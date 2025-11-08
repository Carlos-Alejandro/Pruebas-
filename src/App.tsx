// src/App.tsx
import { Outlet } from "react-router-dom";
import Header from "./common/header/Header";
import CustomCursor from "./common/cursor/CustomCursor";
import Footer from "./common/footer/Footer";

export default function App() {
  return (
    <div className=" flex flex-col bg-neutral-50 text-neutral-900 font-cabinet">
      <Header />

      {/* Zona de páginas: ocupa el espacio libre */}
        <Outlet />
      {/* Footer al fondo */}
      <Footer />

      {/* Cursor (fixed, no afecta el layout) */}
      <CustomCursor />
    </div>
  );
}
