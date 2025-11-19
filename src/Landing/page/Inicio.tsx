// src/Landing/page/Inicio.tsx
import HeroModule from "../components/HeroModule";
import { useLanguage } from "../../common/i18n/LanguageContext";

export default function Inicio() {
  useLanguage();




  return (
    <div className="">
      <HeroModule />
    </div>
  );
}
