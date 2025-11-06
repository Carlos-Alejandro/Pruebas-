// src/routes/index.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import Inicio from "../Landing/page/Inicio";
import ProyectoDetalle from "../Landing/page/ProyectoDetalle";
import Careers from "../Landing/page/Careers";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Layout principal */}
      <Route element={<App />}>
        <Route index element={<Inicio />} />
        <Route path="proyectos/:slug" element={<ProyectoDetalle />} />
        <Route path="/careers" element={<Careers />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
