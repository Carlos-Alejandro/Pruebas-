import React from "react";
import Logo from "../../assets/Footer/Logoalt.svg";
import footerData from "../../common/i18n/footer.json";
import { useLanguage } from "../../common/i18n/LanguageContext";
import { Link } from "react-router-dom";
const iconSvg = {
	instagram: (
		<svg width="clamp(18px,2vw,30px)" height="clamp(18px,2vw,30px)" fill="none" viewBox="0 0 24 24" style={{ width: 'clamp(18px,2vw,30px)', height: 'clamp(18px,2vw,30px)' }}>
			<rect width="18" height="18" rx="4" fill="none" />
			<path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5 1.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" stroke="currentColor" strokeWidth="1.5" />
		</svg>
	),
	facebook: (
		<svg width="clamp(18px,2vw,30px)" height="clamp(18px,2vw,30px)" viewBox="0 0 24 24" fill="none" style={{ width: 'clamp(18px,2vw,30px)', height: 'clamp(18px,2vw,30px)' }}>
			<path d="M17.525 2.25h-3.05c-2.7 0-4.45 1.7-4.45 4.33v2.02H7.25a.25.25 0 0 0-.25.25v3.13c0 .14.11.25.25.25h2.775v7.47c0 .14.11.25.25.25h3.23c.14 0 .25-.11.25-.25v-7.47h2.17c.13 0 .24-.09.26-.22l.5-3.13a.25.25 0 0 0-.25-.28h-2.68V6.83c0-.67.16-1.01 1.04-1.01h1.67c.14 0 .25-.11.25-.25V2.5a.25.25 0 0 0-.25-.25z" fill="#fff"/>
		</svg>
	),
	linkedin: (
		<svg width="clamp(18px,2vw,30px)" height="clamp(18px,2vw,30px)" viewBox="0 0 24 24" fill="none" style={{ width: 'clamp(18px,2vw,30px)', height: 'clamp(18px,2vw,30px)' }}>
			<rect x="2" y="2" width="20" height="20" rx="4" fill="#fff" />
			<path d="M7.75 17V10.75H5.75V17h2zm-1-7.25c.69 0 1.25-.56 1.25-1.25S7.44 7.25 6.75 7.25 5.5 7.81 5.5 8.5s.56 1.25 1.25 1.25zm3.25 7.25h2V13.5c0-.84.68-1.5 1.5-1.5s1.5.66 1.5 1.5V17h2v-4.25c0-1.52-1.23-2.75-2.75-2.75s-2.75 1.23-2.75 2.75V17z" fill="#111"/>
		</svg>
	),
};

const footerLinksKeys = [
	{ key: "inicio", href: "/" },
	{ key: "videos", href: "/videos" },
	{ key: "nosotros", href: "/nosotros" },
	{ key: "contacto", href: "/contacto" },
	{ key: "careers", href: "/careers" },
];
const Footer: React.FC = () => {
	const { language } = useLanguage();
	const t = footerData[language]?.footer;
	return (
		<footer style={{ width: '100%' }}>
			{/* Bloque negro principal */}
			<div style={{
				width: '100%',
				maxWidth: 1920,
				margin: '0 auto',
				background: '#111',
				color: '#fff',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'flex-start',
				paddingTop: 'clamp(32px, 4vw, 120px)',
                paddingLeft: 'clamp(32px, 4vw, 80px)',
                paddingRight: 'clamp(32px, 4vw, 80px)',
				minHeight: 'clamp(220px, 30vw, 563px)',
				fontFamily: 'Montserrat, sans-serif',
				fontWeight: 400,
				fontStyle: 'normal',
				fontSize: 'clamp(14px, 1vw, 24px)',
			}}>
				{/* Columna izquierda: logo y redes */}
				<div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 2vw, 29px)' }}>
					<img 
						src={Logo} 
						alt="Blank Logo" 
						style={{ 
							width: 'clamp(120px, 12vw, 207px)', 
							height: 'clamp(20px, 2vw, 34px)'
						}} 
					/>
					<div style={{ display: 'flex', gap: 18 }}>
						<a href="#" aria-label="Instagram" style={{ color: '#fff' }}>{iconSvg.instagram}</a>
						<a href="#" aria-label="Facebook" style={{ color: '#fff' }}>{iconSvg.facebook}</a>
						<a href="#" aria-label="LinkedIn" style={{ color: '#fff' }}>{iconSvg.linkedin}</a>
					</div>
				</div>
				{/* Columna centro: botón y contacto */}
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
					<button style={{
						background: '#fff',
						color: '#111',
						fontWeight: 700,
						fontFamily: 'Montserrat, sans-serif',
						fontSize: 'clamp(14px, 1vw, 24px)',
						padding: '0.5rem 2.5rem',
						border: 'none',
						marginBottom: 12,
						marginTop: 8,
						cursor: 'pointer',
						letterSpacing: 0.2,
						textDecoration: 'underline',
					}}>{t.button}</button>
					<div style={{ fontSize: 'clamp(13px, 1vw, 18px)', marginBottom: 2 }}>{t.email}</div>
					<div style={{ fontSize: 'clamp(13px, 1vw, 18px)' }}>{t.phone}</div>
				</div>
				{/* Columna derecha: links */}
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
					{footerLinksKeys.map(link => (
						<Link
							key={link.key}
							to={link.href}
							style={{
								color: '#fff',
								textDecoration: 'underline',
								fontSize: 'clamp(14px, 1vw, 24px)',
								fontFamily: 'Montserrat, sans-serif',
								marginBottom: 2,
								fontWeight: 400,
								fontStyle: 'normal',
								lineHeight: 1.4,
							}}
						>
							{t.links[link.key as keyof typeof t.links]}
						</Link>
					))}
				</div>
			</div>
			{/* Franja blanca inferior */}
			<div style={{
				width: '100%',
				maxWidth: 1920,
				margin: '0 auto',
				background: '#fff',
				color: '#111',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				fontSize: 12,
				minHeight: 'clamp(40px, 4vw, 63px)',
				padding: '0 2rem',
				fontFamily: 'Montserrat, sans-serif',
			}}>
				<div>{t.copyright}</div>
				<div style={{ display: 'flex', gap: 18 }}>
					<a href="#" style={{ color: '#111', textDecoration: 'underline' }}>{t.privacy}</a>
					<a href="#" style={{ color: '#111', textDecoration: 'underline' }}>{t.terms}</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
