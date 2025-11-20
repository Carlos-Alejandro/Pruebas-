import { useLanguage } from "../../common/i18n/LanguageContext";
import differentiatorsJson from "../../common/i18n/differentiators.json";
import { useEffect, useRef, useState } from "react";

import img1 from "../../assets/Differentiators/img.png";
import img2 from "../../assets/Differentiators/img1.png";
import img3 from "../../assets/Differentiators/img2.png";

export default function DifferentiatorsSection() {
  const { language } = useLanguage();
  const t = differentiatorsJson[language];
  const images = [img1, img2, img3];

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  // 🎯 Animación activada SOLO cuando se ve la sección
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect(); // Se activa solo una vez
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100%",
        minHeight: "100vh",
        maxWidth: "1920px",
        margin: "0 auto",
        background: "#fff",
        color: "#141313",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8rem 0",

      }}
    >
      {/* TÍTULO */}
      <h2
        style={{
          fontFamily:
            "Montserrat, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(26px, 2.6vw, 40px)",
          lineHeight: "130%",
          letterSpacing: "0.5px",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease",
        }}
      >
        {t.title}
      </h2>

      {/* SUBTÍTULO */}
      <p
        style={{
          fontFamily:
            "Montserrat, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontWeight: 400,
          fontSize: "clamp(18px, 1.7vw, 32px)",
          lineHeight: "130%",
          textAlign: "center",
          marginTop: "clamp(4px, 0.6vw, 8px)",
          marginBottom: "clamp(40px, 7.135vw, 137px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease 0.15s",
        }}
      >
        {t.subtitle}
      </p>

      {/* CARDS */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          width: "100%",
          padding: "0 clamp(20px, 4vw, 80px)",
        }}
      >
        {t.items.map((item, index) => (
          <div
            key={item.title}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              maxWidth: "573px",
              width: "100%",
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translateY(0)"
                : "translateY(40px)",
              transition: `all 0.9s ease ${0.25 + index * 0.2}s`,
            }}
          >
            {/* TÍTULO */}
            <h3
              style={{
                fontFamily:
                  "Montserrat, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(12px, 1.4vw, 26px)",
                lineHeight: "130%",
                textAlign: "center",
                color: "#141313",
                marginBottom: "clamp(10px, 1vw, 20px)",
                maxWidth: "573px",
              }}
            >
              {item.title}
            </h3>

            {/* IMAGEN (tu animación actual, sin cambios) */}
            <img
              src={images[index]}
              alt={item.title}
              style={{
                width: "min(573px, 100%)",
                aspectRatio: "573 / 346",
                objectFit: "cover",
                display: "block",
                transition: "all 0.4s ease",
                filter: "grayscale(100%)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.filter = "grayscale(0%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.filter = "grayscale(100%)";
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
