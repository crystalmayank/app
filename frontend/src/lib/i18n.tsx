import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "en" | "hi";

const STRINGS = {
  en: {
    nav_features: "What you can do",
    nav_people: "Find a Friend",
    nav_services: "Quick Help",
    nav_data: "Your information",
    nav_downloads: "Brochure & catalogue",
    nav_preview: "Open app preview",
    hero_eyebrow: "Documents. Memories. Your people.",
    hero_h1a: "Your family life,",
    hero_h1b: "connected",
    hero_sub:
      "Keep important records close. Share meaningful moments. Reconnect with people and discover everyday value — all within Quircle.",
    hero_cta1: "Discover Quircle",
    hero_cta2: "Get the brochure",
    hero_note: "Product preview · Explore the features below",
    hero_caption: "More together. Less scattered.",
    ribbon_1: "One place for what matters",
    ribbon_2: "Family & friends",
    ribbon_3: "Personal records",
    ribbon_4: "Everyday possibilities",
    features_h2a: "Less searching.",
    features_h2b: "More living.",
    sharing_h2a: "Be there.",
    sharing_h2b: "Even from elsewhere.",
    people_h2a: "Remember the place.",
    people_h2b: "Rediscover the people.",
    people_badge: "Planned matching experience",
    market_h2a: "Everyday finds.",
    market_h2b: "Your price decision.",
    services_h2a: "Help around the house.",
    services_h2b: "People around your life.",
    data_h2a: "Useful details.",
    data_h2b: "A clear purpose.",
    downloads_h2a: "Your Quircle",
    downloads_h2b: "introduction kit.",
    notify_h2a: "Be the first to know",
    notify_h2b: "when Quircle opens up.",
    closing_h2a: "Your records. Your memories.",
    closing_h2b: "Your people. Your Quircle.",
    closing_cta1: "Open app preview",
    closing_cta2: "Get the brochure",
  },
  hi: {
    nav_features: "आप क्या कर सकते हैं",
    nav_people: "दोस्त खोजें",
    nav_services: "क्विक हेल्प",
    nav_data: "आपकी जानकारी",
    nav_downloads: "ब्रोशर और कैटलॉग",
    nav_preview: "ऐप प्रीव्यू खोलें",
    hero_eyebrow: "दस्तावेज़. यादें. आपके अपने.",
    hero_h1a: "आपके परिवार का जीवन,",
    hero_h1b: "जुड़ा हुआ",
    hero_sub:
      "Quircle पर ज़रूरी दस्तावेज़ व्यवस्थित करें, स्वास्थ्य रिकॉर्ड एक जगह रखें और अपनों के साथ फोटो यादें साझा करें। खरीदारी और बोली के विकल्प भी देखें। साझा करने से पहले सही व्यक्ति और अनुमति जाँचें।",
    hero_cta1: "Quircle को जानें",
    hero_cta2: "ब्रोशर डाउनलोड करें",
    hero_note: "प्रोडक्ट प्रीव्यू · नीचे सुविधाएँ देखें",
    hero_caption: "ज़रूरी कागज़, सेहत के रिकॉर्ड और अपनों की यादें — सब एक जगह।",
    ribbon_1: "जो मायने रखता है, सब एक जगह",
    ribbon_2: "परिवार और दोस्त",
    ribbon_3: "निजी रिकॉर्ड",
    ribbon_4: "रोज़ की नई संभावनाएँ",
    features_h2a: "कम खोज.",
    features_h2b: "ज़्यादा ज़िंदगी.",
    sharing_h2a: "साथ रहें.",
    sharing_h2b: "दूर से भी.",
    people_h2a: "जगह याद है?",
    people_h2b: "लोगों को फिर से खोजें.",
    people_badge: "योजनाबद्ध मिलान सुविधा",
    market_h2a: "रोज़ की खोजें.",
    market_h2b: "कीमत का फ़ैसला आपका.",
    services_h2a: "घर के कामों में मदद.",
    services_h2b: "आपके लोग, आपके साथ.",
    data_h2a: "उपयोगी जानकारी.",
    data_h2b: "स्पष्ट उद्देश्य.",
    downloads_h2a: "आपकी Quircle",
    downloads_h2b: "परिचय किट.",
    notify_h2a: "सबसे पहले जानें",
    notify_h2b: "जब Quircle सबके लिए खुले.",
    closing_h2a: "आपके रिकॉर्ड. आपकी यादें.",
    closing_h2b: "आपके लोग. आपका Quircle.",
    closing_cta1: "ऐप प्रीव्यू खोलें",
    closing_cta2: "ब्रोशर पाएँ",
  },
} as const;

export type StringKey = keyof (typeof STRINGS)["en"];

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: StringKey) => string;
}>({
  lang: "en",
  setLang: () => {},
  t: (k) => STRINGS.en[k],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = (k: StringKey) => STRINGS[lang][k];
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
