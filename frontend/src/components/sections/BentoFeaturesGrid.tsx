import { Search, FolderOpen, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { scrollToHash } from "@/lib/content";
import { useLang, type StringKey } from "@/lib/i18n";

function CardShell({
  testid,
  className,
  children,
}: {
  testid: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-testid={testid}
      className={`group relative overflow-hidden rounded-3xl border border-qp-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-24px_rgba(67,33,106,0.3)] sm:p-9 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function CardMeta({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.2em] text-qp-purple">{children}</p>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-qp-line bg-qp-cream px-3.5 py-1.5 text-xs font-semibold text-qp-ink/80">
      {children}
    </span>
  );
}

function CardArt({ src, alt, testid }: { src: string; alt: string; testid: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      data-testid={testid}
      className="mb-6 h-44 w-full rounded-2xl border border-qp-line object-cover"
    />
  );
}

const HEALTH_CHIPS: StringKey[] = ["feat2_c1", "feat2_c2", "feat2_c3", "feat2_c4", "feat2_c5", "feat2_c6"];
const FAMILY_CHIPS: StringKey[] = ["feat3_c1", "feat3_c2", "feat3_c3", "feat3_c4", "feat3_c5"];
const FOLDERS: StringKey[] = ["feat1_f1", "feat1_f2", "feat1_f3", "feat1_f4"];

export function BentoFeaturesGrid() {
  const { t } = useLang();
  return (
    <section id="features" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-7 lg:px-10">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-qp-purple">
            {t("feat_eyebrow")}
          </p>
          <h2 className="mt-4 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-qp-ink sm:text-5xl">
            {t("features_h2a")}
            <br />
            <span className="font-editorial font-medium italic text-qp-deep">{t("features_h2b")}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-qp-muted sm:text-lg">
            {t("feat_intro")}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" delay={0.05}>
            <CardShell testid="bento-vault-card" className="h-full">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-qp-lav transition-transform duration-500 group-hover:scale-125" aria-hidden="true" />
              <div className="relative">
                <CardArt
                  src="/assets/document-vault.jpg"
                  alt="Illustration of the Quircle document vault with organized folders"
                  testid="bento-vault-art"
                />
                <CardMeta>{t("feat1_meta")}</CardMeta>
                <h3 className="mt-3 font-heading text-2xl font-bold tracking-tight text-qp-ink sm:text-[28px]">
                  {t("feat1_h")}
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-qp-muted">
                  {t("feat1_b")}
                </p>
                <p className="mt-3 font-editorial text-[15px] italic text-qp-deep/80">
                  {t("feat1_q")}
                </p>

                <div aria-hidden="true" className="mt-7 rounded-2xl border border-qp-line bg-qp-cream/60 p-4">
                  <div className="flex items-center gap-2.5 rounded-full border border-qp-line bg-white px-4 py-2.5 text-sm text-qp-muted">
                    <Search size={15} className="text-qp-purple" />
                    {t("feat1_search")}
                  </div>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {FOLDERS.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-qp-line bg-white px-3 py-1.5 text-xs font-semibold text-qp-ink/75"
                      >
                        <FolderOpen size={13} className="text-qp-orange" />
                        {t(f)}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="#sharing"
                  data-testid="vault-sharing-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash("#sharing");
                  }}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-qp-purple transition-colors hover:text-qp-ember"
                >
                  {t("feat1_link")}
                  <ArrowRight size={15} strokeWidth={2.5} />
                </a>
              </div>
            </CardShell>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.12}>
            <CardShell testid="bento-health-card" className="h-full bg-qp-lav/60">
              <CardArt
                src="/assets/health-records.jpg"
                alt="Illustration of family members reviewing shared health records with permission"
                testid="bento-health-art"
              />
              <CardMeta>{t("feat2_meta")}</CardMeta>
              <h3 className="mt-3 font-heading text-2xl font-bold tracking-tight text-qp-ink sm:text-[28px]">
                {t("feat2_h")}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-qp-muted">{t("feat2_b")}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {HEALTH_CHIPS.map((c) => (
                  <Chip key={c}>{t(c)}</Chip>
                ))}
              </div>
              <p className="mt-6 border-l-[3px] border-qp-orange pl-4 font-editorial text-sm italic text-qp-deep/80">
                {t("feat2_note")}
              </p>
            </CardShell>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.05}>
            <CardShell testid="bento-family-card" className="h-full">
              <CardArt
                src="/assets/photo-memories.jpg"
                alt="Illustration of a family sharing photo memories with a chosen audience in Quircle"
                testid="bento-family-art"
              />
              <CardMeta>{t("feat3_meta")}</CardMeta>
              <h3 className="mt-3 font-heading text-2xl font-bold tracking-tight text-qp-ink sm:text-[28px]">
                {t("feat3_h")}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-qp-muted">{t("feat3_b")}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {FAMILY_CHIPS.map((c) => (
                  <Chip key={c}>{t(c)}</Chip>
                ))}
              </div>
              <p className="mt-6 border-l-[3px] border-qp-purple pl-4 font-editorial text-sm italic text-qp-deep/80">
                {t("feat3_note")}
              </p>
            </CardShell>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.12}>
            <CardShell testid="bento-marketplace-card" className="h-full bg-qp-warm/70">
              <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-qp-orange/10 transition-transform duration-500 group-hover:scale-125" aria-hidden="true" />
              <div className="relative">
                <CardArt
                  src="/assets/live-bidding.jpg"
                  alt="Illustration of live bidding on a smartphone with a gavel and countdown"
                  testid="bento-marketplace-art"
                />
                <CardMeta>{t("feat4_meta")}</CardMeta>
                <h3 className="mt-3 font-heading text-2xl font-bold tracking-tight text-qp-ink sm:text-[28px]">
                  {t("feat4_h")}
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-qp-muted">
                  {t("feat4_b")}
                </p>

                <div
                  aria-hidden="true"
                  className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-qp-orange/25 bg-white p-5"
                >
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-qp-muted">
                      {t("feat4_auction")}
                    </p>
                    <p className="mt-1 font-heading text-lg font-bold text-qp-ink">
                      {t("feat4_item")}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-qp-muted">{t("feat4_bid")}</p>
                      <p className="font-heading text-xl font-extrabold text-qp-ember">Rs 1,850</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-qp-muted">{t("feat4_bids")}</p>
                      <p className="font-heading text-xl font-extrabold text-qp-ink">6</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-qp-muted">{t("feat4_ends")}</p>
                      <p className="font-mono text-xl font-bold text-qp-deep">02:14:33</p>
                    </div>
                  </div>
                </div>

                <p className="mt-5 font-editorial text-sm italic text-qp-deep/80">
                  {t("feat4_note")}
                </p>
              </div>
            </CardShell>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
