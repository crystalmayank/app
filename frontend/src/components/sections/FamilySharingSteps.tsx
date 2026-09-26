import { Reveal } from "@/components/Reveal";
import { useLang, type StringKey } from "@/lib/i18n";

const STEPS: { n: string; title: StringKey; body: StringKey; testid: string }[] = [
  { n: "1", title: "share_s1t", body: "share_s1b", testid: "family-step-1" },
  { n: "2", title: "share_s2t", body: "share_s2b", testid: "family-step-2" },
  { n: "3", title: "share_s3t", body: "share_s3b", testid: "family-step-3" },
];

export function FamilySharingSteps() {
  const { t } = useLang();
  return (
    <section id="sharing" className="scroll-mt-24 bg-qp-lav/70 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-7 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-qp-purple">
              {t("share_eyebrow")}
            </p>
            <h2 className="mt-4 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-qp-ink sm:text-5xl">
              {t("sharing_h2a")}
              <br />
              <span className="font-editorial font-medium italic text-qp-deep">{t("sharing_h2b")}</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-qp-muted sm:text-lg">
              {t("share_p1")}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-qp-muted">
              {t("share_p2")}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <img
              src="/assets/family-tree.jpg"
              alt="Illustration of a multi-generation Quircle family tree around a connected home"
              loading="lazy"
              data-testid="family-tree-art"
              className="w-full rounded-3xl border border-qp-line object-cover shadow-[0_30px_70px_-30px_rgba(67,33,106,0.4)]"
            />
          </Reveal>
        </div>

        <div className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden border-t-2 border-dashed border-qp-purple/25 md:block"
          />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12}>
              <div data-testid={s.testid} className="relative">
                <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-qp-deep font-editorial text-2xl font-bold italic text-white shadow-[0_14px_30px_-12px_rgba(67,33,106,0.55)]">
                  {s.n}
                </span>
                <h3 className="mt-5 font-heading text-xl font-bold tracking-tight text-qp-ink sm:text-2xl">
                  {t(s.title)}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-qp-muted">{t(s.body)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
