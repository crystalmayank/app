import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { QuircleLogo } from "@/components/QuircleLogo";
import { NAV_LINKS, APP_PREVIEW_URL, scrollToHash } from "@/lib/content";
import { track } from "@/lib/analytics";
import { useLang } from "@/lib/i18n";

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center rounded-full border border-qp-line bg-white p-1"
    >
      <button
        type="button"
        data-testid="lang-en-button"
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
        className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors duration-200 ${
          lang === "en" ? "bg-qp-deep text-white" : "text-qp-muted hover:text-qp-deep"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        data-testid="lang-hi-button"
        aria-pressed={lang === "hi"}
        onClick={() => setLang("hi")}
        className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors duration-200 ${
          lang === "hi" ? "bg-qp-deep text-white" : "text-qp-muted hover:text-qp-deep"
        }`}
      >
        हिं
      </button>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { t } = useLang();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (hash: string) => {
    setOpen(false);
    scrollToHash(hash);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-qp-line bg-qp-cream/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 sm:px-7 lg:px-10">
        <a
          href="#top"
          data-testid="brand-logo-link"
          aria-label="Quircle — back to top"
          onClick={(e) => {
            e.preventDefault();
            go("#top");
          }}
        >
          <QuircleLogo size={38} />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.hash}
              href={l.hash}
              data-testid={l.testid}
              onClick={(e) => {
                e.preventDefault();
                go(l.hash);
              }}
              className="text-sm font-semibold text-qp-ink/80 transition-colors duration-200 hover:text-qp-orange"
            >
              {t(l.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangToggle />
          <a
            href={APP_PREVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-cta-app-preview-button"
            onClick={() => track("preview_click", "header")}
            className="hidden items-center gap-1.5 rounded-lg bg-qp-deep px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-qp-purple active:scale-[0.98] sm:inline-flex"
          >
            {t("nav_preview")}
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </a>
          <button
            ref={toggleRef}
            type="button"
            data-testid="mobile-menu-toggle-button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-qp-line bg-white text-qp-ink lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-qp-line bg-qp-cream px-5 pb-6 pt-2 lg:hidden"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.hash}
              href={l.hash}
              data-testid={`mobile-${l.testid}`}
              onClick={(e) => {
                e.preventDefault();
                go(l.hash);
              }}
              className="block border-b border-qp-line/60 py-3.5 text-base font-semibold text-qp-ink"
            >
              {t(l.key)}
            </a>
          ))}
          <a
            href={APP_PREVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="mobile-nav-cta-app-preview-button"
            onClick={() => track("preview_click", "mobile-menu")}
            className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-qp-deep px-5 py-3.5 text-sm font-bold text-white"
          >
            {t("nav_preview")}
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </a>
        </nav>
      )}
    </header>
  );
}
