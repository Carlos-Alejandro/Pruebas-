import React from "react";
import Logo from "../../assets/Footer/Logoalt.svg";
import { FaInstagram, FaFacebookF, FaLinkedin } from "react-icons/fa";
import footerData from "../../common/i18n/footer.json";
import { useLanguage } from "../../common/i18n/LanguageContext";
import { Link } from "react-router-dom";


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
								<a href="#" aria-label="Instagram" style={{ color: '#fff' }}>
									<FaInstagram style={{ width: 'clamp(18px,2vw,30px)', height: 'clamp(18px,2vw,30px)' }} />
								</a>
								<a href="#" aria-label="Facebook" style={{ color: '#fff' }}>
									<FaFacebookF style={{ width: 'clamp(18px,2vw,30px)', height: 'clamp(18px,2vw,30px)' }} />
								</a>
								<a href="#" aria-label="LinkedIn" style={{ color: '#fff' }}>
									<FaLinkedin style={{ width: 'clamp(18px,2vw,30px)', height: 'clamp(18px,2vw,30px)' }} />
								</a>
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
