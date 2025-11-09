// src/routes/index.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import Inicio from "../Landing/page/Inicio";
import ProyectoDetalle from "../Landing/page/ProyectoDetalle";
import Careers from "../Landing/page/Careers";
import Nosotros from "../Landing/page/Nosotros";
import Bim from "../Landing/page/Bim";
import Contacto from "../Landing/page/Contacto";
import Services from "../Landing/page/Services";
import ServiceDetail from "../Landing/page/ServiceDetail";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Layout principal */}
      <Route element={<App />}>
        <Route index element={<Inicio />} />
        <Route path="proyectos/:slug" element={<ProyectoDetalle />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/bim" element={<Bim />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/servicios/:slug" element={<ServiceDetail />} />

      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
