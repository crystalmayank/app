import { Reveal } from "@/components/Reveal";

const STEPS = [
  {
    n: "1",
    title: "Bring it together",
    body: "Add the documents, records or photos relevant to you.",
    testid: "family-step-1",
  },
  {
    n: "2",
    title: "Choose what to share",
    body: "Review the file, audience and access options before sending.",
    testid: "family-step-2",
  },
  {
    n: "3",
    title: "Keep access intentional",
    body: "Use the available sharing controls and review who can see your information. Downloaded copies may remain with recipients.",
    testid: "family-step-3",
  },
];

export function FamilySharingSteps() {
  return (
    <section id="sharing" className="scroll-mt-24 bg-qp-lav/70 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-7 lg:px-10">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-qp-purple">
            A practical family benefit
          </p>
          <h2 className="mt-4 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-qp-ink sm:text-5xl">
            Be there.
            <br />
            <span className="font-editorial font-medium italic text-qp-deep">Even from elsewhere.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-qp-muted sm:text-lg">
            A selected document for a sibling. A report ready for an appointment. A photograph that
            brings everyone back to the same moment.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-qp-muted">
            Quircle’s family, vault and health areas are designed around these everyday needs. A
            family connection should never be treated as permission to see every private record.
          </p>
        </Reveal>

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
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-qp-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
