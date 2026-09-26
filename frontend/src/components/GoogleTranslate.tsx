import { useEffect } from "react";
import { Languages } from "lucide-react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          opts: Record<string, unknown>,
          el: string
        ) => unknown;
      };
    };
  }
}

export function GoogleTranslate() {
  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;
    window.googleTranslateElementInit = () => {
      if (!window.google) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "hi,mr,bn,ta,te,gu,kn,ml,pa,ur",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };
    const s = document.createElement("script");
    s.id = "google-translate-script";
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div
      data-testid="google-translate-widget"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-qp-line bg-white/95 py-2.5 pl-4 pr-3 shadow-[0_16px_40px_-16px_rgba(67,33,106,0.45)] backdrop-blur"
    >
      <Languages size={16} className="shrink-0 text-qp-purple" aria-hidden="true" />
      <div id="google_translate_element" />
    </div>
  );
}
