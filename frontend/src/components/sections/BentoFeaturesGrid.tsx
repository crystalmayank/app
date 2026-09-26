import { Search, FolderOpen, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { scrollToHash } from "@/lib/content";

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

export function BentoFeaturesGrid() {
  return (
    <section id="features" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-7 lg:px-10">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-qp-purple">
            Meet your everyday Quircle
          </p>
          <h2 className="mt-4 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-qp-ink sm:text-5xl">
            Less searching.
            <br />
            <span className="font-editorial font-medium italic text-qp-deep">More living.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-qp-muted sm:text-lg">
            From finding a document to finding a familiar face, Quircle brings useful parts of
            daily life into one connected space.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" delay={0.05}>
            <CardShell testid="bento-vault-card" className="h-full">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-qp-lav transition-transform duration-500 group-hover:scale-125" aria-hidden="true" />
              <div className="relative">
                <CardMeta>01 / Documents</CardMeta>
                <h3 className="mt-3 font-heading text-2xl font-bold tracking-tight text-qp-ink sm:text-[28px]">
                  Your important papers. A place to belong.
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-qp-muted">
                  Organize IDs, certificates and other files in a document vault. Use folders,
                  search and sharing controls to make chosen documents easier to reach.
                </p>
                <p className="mt-3 font-editorial text-[15px] italic text-qp-deep/80">
                  For the moment someone asks, “Can you send that document?”
                </p>

                <div aria-hidden="true" className="mt-7 rounded-2xl border border-qp-line bg-qp-cream/60 p-4">
                  <div className="flex items-center gap-2.5 rounded-full border border-qp-line bg-white px-4 py-2.5 text-sm text-qp-muted">
                    <Search size={15} className="text-qp-purple" />
                    Search “birth certificate”
                  </div>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {["IDs & certificates", "Property papers", "School records", "Insurance"].map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-qp-line bg-white px-3 py-1.5 text-xs font-semibold text-qp-ink/75"
                      >
                        <FolderOpen size={13} className="text-qp-orange" />
                        {f}
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
                  See how sharing fits your life
                  <ArrowRight size={15} strokeWidth={2.5} />
                </a>
              </div>
            </CardShell>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.12}>
            <CardShell testid="bento-health-card" className="h-full bg-qp-lav/60">
              <CardMeta>02 / Health Records</CardMeta>
              <h3 className="mt-3 font-heading text-2xl font-bold tracking-tight text-qp-ink sm:text-[28px]">
                A clearer health history.
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-qp-muted">
                Keep reports, prescriptions, medicine details and hospital records together. Bring
                the right information to your next doctor conversation.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Prescriptions", "Lab reports", "Medicines", "Allergies", "Vaccines", "Reminders"].map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
              <p className="mt-6 border-l-[3px] border-qp-orange pl-4 font-editorial text-sm italic text-qp-deep/80">
                Records support care; they do not replace it.
              </p>
            </CardShell>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.05}>
            <CardShell testid="bento-family-card" className="h-full">
              <CardMeta>03 / Family &amp; Memories</CardMeta>
              <h3 className="mt-3 font-heading text-2xl font-bold tracking-tight text-qp-ink sm:text-[28px]">
                Keep the connection going.
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-qp-muted">
                Explore your family network, share photo memories, and stay in touch through chat.
                Choose the audience for each social post.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Family tree", "Circles", "Timeline", "Photo memories", "Chat"].map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
              <p className="mt-6 border-l-[3px] border-qp-purple pl-4 font-editorial text-sm italic text-qp-deep/80">
                Everyday moments, shared thoughtfully.
              </p>
            </CardShell>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.12}>
            <CardShell testid="bento-marketplace-card" className="h-full bg-qp-warm/70">
              <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-qp-orange/10 transition-transform duration-500 group-hover:scale-125" aria-hidden="true" />
              <div className="relative">
                <CardMeta>04 / Marketplace &amp; Live Bid</CardMeta>
                <h3 className="mt-3 font-heading text-2xl font-bold tracking-tight text-qp-ink sm:text-[28px]">
                  Discover it. Compare it. Bid for it.
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-qp-muted">
                  Browse products, explore selling, and take part in bidding. Compare the full cost
                  with your budget before committing.
                </p>

                <div
                  aria-hidden="true"
                  className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-qp-orange/25 bg-white p-5"
                >
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-qp-muted">
                      Illustrative auction
                    </p>
                    <p className="mt-1 font-heading text-lg font-bold text-qp-ink">
                      Pre-loved teak bookshelf
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-qp-muted">Current bid</p>
                      <p className="font-heading text-xl font-extrabold text-qp-ember">Rs 1,850</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-qp-muted">Bids</p>
                      <p className="font-heading text-xl font-extrabold text-qp-ink">6</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-qp-muted">Ends in</p>
                      <p className="font-mono text-xl font-bold text-qp-deep">02:14:33</p>
                    </div>
                  </div>
                </div>

                <p className="mt-5 font-editorial text-sm italic text-qp-deep/80">
                  A chance to find better value. Savings are not guaranteed.
                </p>
              </div>
            </CardShell>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
