// src/common/i18n/LanguageContext.tsx
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import globalJson from "./global.json";

export type Language = "es" | "en";

// Lo que hay dentro de cada idioma en global.json
export type GlobalTranslations = (typeof globalJson)["es"];

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: GlobalTranslations; // textos globales (header, etc.)
};

const dictionaries = globalJson as Record<Language, GlobalTranslations>;

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: dictionaries[language],
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
