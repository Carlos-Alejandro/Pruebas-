import React from "react";
import Hero from "../components/Hero";
import Contacto from "../components/Contacto";
import Equipo from "../components/Equipo";


const Garage: React.FC = () => {
  // return <><NuestraHistoria /><Contacto /></>;
  return (
    <>      
    <Hero />
    <Equipo />
    <Contacto />
    </>
  );
};

export default Garage;