
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../Landing/components/Navbar";
import Footer from "../Landing/components/Footer";
import Inicio from "../Landing/page/Inicio";
import Careers from "../Landing/page/Carrers";

// Puedes agregar los demás componentes de página aquí
const Videos = () => <div style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Videos</div>;
const Nosotros = () => <div style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Nosotros</div>;
const Contacto = () => <div style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Contacto</div>;

const AppRoutes: React.FC = () => (
	<Router>
		<Navbar />
		<Routes>
			<Route path="/" element={<Inicio />} />
			<Route path="/videos" element={<Videos />} />
			<Route path="/nosotros" element={<Nosotros />} />
			<Route path="/contacto" element={<Contacto />} />
			<Route path="/careers" element={<Careers />} />
		</Routes>
		<Footer />
	</Router>
);

export default AppRoutes;
