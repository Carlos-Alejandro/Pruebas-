// src/Landing/page/Circular.tsx
import React from "react";
import Hero from "../components/Hero";
import Contacto from "../components/Contacto";
import Equipo from "../components/Equipo";
import { Empresa } from "../components/Empresa";
import Servicios from "../components/Servicios";

const Circular: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Empresa />
      <Servicios />
      <Equipo />
      <Contacto />
    </div>
  );
};

export default Circular;
