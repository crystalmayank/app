import { ArrowUpRight, Download } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { APP_PREVIEW_URL, BROCHURE_URL } from "@/lib/content";
import { track } from "@/lib/analytics";
import { useLang } from "@/lib/i18n";

export function ClosingCta() {
  const { t } = useLang();
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-7 lg:px-10">
        <Reveal>
          <div
            data-testid="closing-cta-container"
            className="relative overflow-hidden rounded-[36px] bg-qp-night px-7 py-16 text-center sm:px-12 sm:py-20 lg:py-24"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-qp-purple/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-qp-orange/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-3 rounded-[28px] border border-white/10"
            />

            <p className="relative text-xs font-bold uppercase tracking-[0.24em] text-[#B9A6D9]">
              {t("cl_eyebrow")}
            </p>
            <h2 className="relative mx-auto mt-5 max-w-3xl font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t("closing_h2a")}
              <br />
              <span className="font-editorial font-medium italic text-[#FFB787]">
                {t("closing_h2b")}
              </span>
            </h2>

            <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={APP_PREVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="closing-cta-preview-button"
                onClick={() => track("preview_click", "closing-cta")}
                className="inline-flex items-center gap-2 rounded-xl bg-qp-orange px-8 py-4 text-base font-bold text-white shadow-[0_18px_40px_-14px_rgba(236,119,45,0.65)] transition-all duration-200 hover:bg-[#FF8A3D] active:scale-[0.98]"
              >
                {t("closing_cta1")}
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </a>
              <a
                href={BROCHURE_URL}
                download
                data-testid="closing-cta-brochure-button"
                onClick={() => track("brochure_download", "closing-cta")}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/25 px-8 py-[14px] text-base font-bold text-white transition-all duration-200 hover:border-white/60 active:scale-[0.98]"
              >
                {t("closing_cta2")}
                <Download size={18} strokeWidth={2.5} />
              </a>
            </div>

            <p className="relative mx-auto mt-8 max-w-md text-xs leading-relaxed text-[#B9A6D9]">
              {t("cl_note")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
