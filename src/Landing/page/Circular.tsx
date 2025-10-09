// src/Landing/page/Circular.tsx
import React from "react";
import Hero from "../components/Hero";
import Contacto from "../components/Contacto";
import { Empresa } from "../components/Empresa";
import LiveClock from "../components/LiveClock";

const Circular: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Empresa />
      <Contacto />
      <LiveClock />
    </div>
  );
};

export default Circular;
