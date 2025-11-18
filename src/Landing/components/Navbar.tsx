import React from "react";
import Logo from "../../assets/Navar/Logo.svg";
import navarData from "../../common/i18n/navar.json";
import { useLanguage } from "../../common/i18n/LanguageContext";
import { Link, useLocation } from "react-router-dom";

const navLinksKeys = [
    { key: "inicio", href: "/" },
    { key: "videos", href: "/videos" },
    { key: "nosotros", href: "/nosotros" },
    { key: "contacto", href: "/contacto" },
    { key: "careers", href: "/careers" },
];

const socialLinks = [
    { icon: "instagram", href: "#", key: "instagram" },
    { icon: "facebook", href: "#", key: "facebook" },
    { icon: "linkedin", href: "#", key: "linkedin" },
];

const iconSvg = {
    instagram: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" style={{ width: 'clamp(18px,2vw,24px)', height: 'clamp(18px,2vw,24px)' }}>
            <rect width="18" height="18" rx="4" fill="none" />
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5 1.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    ),
    facebook: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ width: 'clamp(18px,2vw,24px)', height: 'clamp(18px,2vw,24px)' }}>
            <path d="M17.525 2.25h-3.05c-2.7 0-4.45 1.7-4.45 4.33v2.02H7.25a.25.25 0 0 0-.25.25v3.13c0 .14.11.25.25.25h2.775v7.47c0 .14.11.25.25.25h3.23c.14 0 .25-.11.25-.25v-7.47h2.17c.13 0 .24-.09.26-.22l.5-3.13a.25.25 0 0 0-.25-.28h-2.68V6.83c0-.67.16-1.01 1.04-1.01h1.67c.14 0 .25-.11.25-.25V2.5a.25.25 0 0 0-.25-.25z" fill="#111"/>
        </svg>
    ),
    linkedin: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ width: 'clamp(18px,2vw,24px)', height: 'clamp(18px,2vw,24px)' }}>
            <rect x="2" y="2" width="20" height="20" rx="4" fill="#111" />
            <path d="M7.75 17V10.75H5.75V17h2zm-1-7.25c.69 0 1.25-.56 1.25-1.25S7.44 7.25 6.75 7.25 5.5 7.81 5.5 8.5s.56 1.25 1.25 1.25zm3.25 7.25h2V13.5c0-.84.68-1.5 1.5-1.5s1.5.66 1.5 1.5V17h2v-4.25c0-1.52-1.23-2.75-2.75-2.75s-2.75 1.23-2.75 2.75V17z" fill="#fff"/>
        </svg>
    ),
};

const Navbar: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const t = navarData[language]?.nav;
    const location = useLocation();
    const toggleLanguage = () => setLanguage(language === "es" ? "en" : "es");
    return (
        <nav
            style={{
                width: "100%",
                background: "#fff",
                borderBottom: "1px solid #f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "inherit",
                minHeight: "clamp(56px, 6vw, 172px)",
                padding: 0,
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 1920,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "0 auto",
                    padding: "0 clamp(10px, 2vw, 32px)",
                    minHeight: "inherit",
                    gap: "clamp(8px, 2vw, 32px)",
                }}
            >
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={Logo} alt="Blank Logo" style={{ height: 38 }} />
                </div>
                {/* Nav Links */}
                <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 2vw, 32px)" }}>
                    {navLinksKeys.map((link) => {
                        const isActive = location.pathname === link.href;
                        return (
                            <Link
                                key={link.key}
                                to={link.href}
                                style={{
                                    color: "#222",
                                    fontSize: "clamp(14px, 1vw, 20px)",
                                    letterSpacing: 0.5,
                                    textDecoration: "none",
                                    borderBottom: isActive ? "2px solid #222" : "none",
                                    paddingBottom: isActive ? 2 : 0,
                                    fontWeight: 400,
                                    transition: "border-bottom 0.2s",
                                    fontFamily: 'Montserrat, sans-serif',
                                }}
                            >
                                {t[link.key as keyof typeof t]}
                            </Link>
                        );
                    })}
                </div>
                {/* Social & Language */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: 90 }}>
                    <div style={{ display: "flex", gap: "clamp(8px, 1.5vw, 24px)", justifyContent: "center", alignItems: "center" }}>
                        {socialLinks.map((s) => (
                            <a
                                key={s.key}
                                href={s.href}
                                aria-label={t[s.key as keyof typeof t]}
                                style={{ color: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {iconSvg[s.icon as keyof typeof iconSvg]}
                            </a>
                        ))}
                    </div>
                    <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
                        <button
                            onClick={() => setLanguage('es')}
                            style={{
                                fontSize: "clamp(12px, 0.8vw, 16px)",
                                color: language === 'es' ? "#222" : "#888",
                                fontWeight: 400,
                                letterSpacing: 0.1,
                                fontFamily: 'Montserrat, sans-serif',
                                background: 'none',
                                border: 'none',
                                borderBottom: language === 'es' ? '2px solid #222' : 'none',
                                cursor: 'pointer',
                                padding: 0,
                                marginRight: 4,
                            }}
                            aria-label="Cambiar a español"
                        >
                            Español
                        </button>
                        <span style={{ color: '#888', fontSize: "clamp(14px, 1vw, 16px)" }}>/</span>
                        <button
                            onClick={() => setLanguage('en')}
                            style={{
                                fontSize: "clamp(12px, 0.8vw, 16px)",
                                color: language === 'en' ? "#222" : "#888",
                                fontWeight: 400,
                                letterSpacing: 0.1,
                                fontFamily: 'Montserrat, sans-serif',
                                background: 'none',
                                border: 'none',
                                borderBottom: language === 'en' ? '2px solid #222' : 'none',
                                cursor: 'pointer',
                                padding: 0,
                                marginLeft: 4,
                            }}
                            aria-label="Switch to English"
                        >
                            English
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

