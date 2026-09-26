import { GraduationCap, CalendarDays, Handshake } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { scrollToHash } from "@/lib/content";

const STEPS = [
  { n: "01", icon: GraduationCap, title: "Your institution", body: "School, college or workplace" },
  { n: "02", icon: CalendarDays, title: "Your time there", body: "Campus, batch or overlapping years" },
  { n: "03", icon: Handshake, title: "Your choice", body: "Opt in, review a suggestion, send a request" },
];

export function FindAFriendSection() {
  return (
    <section id="people" data-testid="find-friend-container" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 sm:px-7 lg:grid-cols-2 lg:px-10">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-qp-purple">
              Find a Friend
            </p>
            <span
              data-testid="find-friend-badge-planned"
              className="inline-flex items-center gap-1.5 rounded-full bg-qp-orange px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_8px_22px_-8px_rgba(236,119,45,0.7)]"
            >
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-white" />
              Planned matching experience
            </span>
          </div>

          <h2 className="mt-5 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-qp-ink sm:text-5xl">
            Remember the place.
            <br />
            <span className="font-editorial font-medium italic text-qp-deep">Rediscover the people.</span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-qp-muted sm:text-lg">
            The school where it started. The college batch you still remember. The workplace where
            friendships grew.
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-qp-muted">
            Quircle’s planned “Find your people” experience uses optional school, college, workplace
            and year details to suggest relevant connections. You choose whether to be discoverable
            and whether to connect.
          </p>

          <div className="mt-6 max-w-xl rounded-2xl border border-qp-line bg-white p-5">
            <p className="text-sm leading-relaxed text-qp-muted">
              <span className="font-bold text-qp-ink">Where it stands today:</span> existing family
              search was visible in the preview. Institution and batch matching is specified for
              development; release availability is not confirmed.
            </p>
          </div>

          <button
            type="button"
            data-testid="find-friend-waitlist-btn"
            onClick={() => scrollToHash("#notify")}
            className="mt-7 inline-flex items-center gap-2 rounded-xl border-2 border-qp-deep px-6 py-3.5 text-sm font-bold text-qp-deep transition-all duration-200 hover:bg-qp-deep hover:text-white active:scale-[0.98]"
          >
            Get notified when it ships
          </button>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="rounded-3xl border border-qp-line bg-qp-lav/60 p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-qp-purple">
              The connection starts with common ground
            </p>
            <div className="mt-6 space-y-4">
              {STEPS.map((s) => (
                <div
                  key={s.n}
                  data-testid={`find-friend-pill-${s.n}`}
                  className="flex items-center gap-4 rounded-2xl border border-qp-line bg-white p-5 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-qp-deep text-white">
                    <s.icon size={20} strokeWidth={2.2} />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] font-bold tracking-widest text-qp-orange">{s.n}</p>
                    <h3 className="font-heading text-lg font-bold text-qp-ink">{s.title}</h3>
                    <p className="text-sm text-qp-muted">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-7 border-t border-qp-line pt-5 font-editorial text-base italic text-qp-deep/85">
              A shared past can be the start of a new conversation.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
