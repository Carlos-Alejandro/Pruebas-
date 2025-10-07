// src/Landing/page/Circular.tsx
import React from "react";
import Hero from "../components/Hero";
import Contacto from "../components/Contacto";
import Equipo from "../components/Equipo";

const Circular: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Equipo />
    </div>
  );
};

export default Circular;
