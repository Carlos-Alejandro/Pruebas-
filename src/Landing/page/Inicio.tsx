// src/Landing/page/Inicio.tsx
import HeroModule from "../components/HeroModule";
import { useLanguage } from "../../common/i18n/LanguageContext";
import FeatureSection from "../components/DifferentiatorsSection";
import BrandSeparatorSection from "../components/BrandSeparatorSection";
import LensSection from "../components/LensSection";

export default function Inicio() {
  useLanguage();




  return (
    <div className="">
      <HeroModule />
      <FeatureSection />
      <BrandSeparatorSection />
      <LensSection />
    </div>
  );
}
