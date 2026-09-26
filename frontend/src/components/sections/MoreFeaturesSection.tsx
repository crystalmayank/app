import { Wrench, MessagesSquare, HeartPulse, Newspaper, Zap, GraduationCap, Car, Home, Stethoscope, Baby } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/lib/i18n";

const SERVICES = [
  { icon: Zap, label: "Electricians" },
  { icon: Wrench, label: "Plumbers" },
  { icon: Stethoscope, label: "Caregivers" },
  { icon: GraduationCap, label: "Tutors" },
  { icon: Car, label: "Drivers" },
  { icon: Home, label: "Home help" },
  { icon: Baby, label: "Babysitters" },
];

interface FeatureCard {
  testid: string;
  icon: typeof Wrench;
  title: string;
  body: string;
  img?: string;
  imgAlt?: string;
}

const CARDS: FeatureCard[] = [
  {
    testid: "quick-help-card",
    icon: Wrench,
    title: "Quick Help & Hire Pro",
    body: "Explore service categories, professional profiles and booking options. Availability depends on location and providers.",
    img: "/assets/quick-help.jpg",
    imgAlt: "Illustration of booking trusted home services through Quircle Quick Help",
  },
  {
    testid: "private-chat-card",
    icon: MessagesSquare,
    title: "Chat & circles",
    body: "Continue conversations and keep personal connections within your Quircle experience.",
    img: "/assets/chat.jpg",
    imgAlt: "Illustration of family members chatting in the Quircle app",
  },
  {
    testid: "news-room-card",
    icon: Newspaper,
    title: "News Room",
    body: "Explore stories across topics and follow each one back to its original source — inside the same Quircle experience.",
    img: "/assets/news-room.jpg",
    imgAlt: "Illustration of reading news by category in the Quircle News Room",
  },
  {
    testid: "health-sharing-card",
    icon: HeartPulse,
    title: "Health sharing",
    body: "The preview includes doctor-sharing and consultation-request options. Live consultation readiness and new payment flows remain under review.",
  },
];

export function MoreFeaturesSection() {
  const { t } = useLang();
  return (
    <section id="services" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-7 lg:px-10">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-qp-purple">
            More of daily life, in the same place
          </p>
          <h2 className="mt-4 max-w-3xl font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-qp-ink sm:text-5xl">
            {t("services_h2a")}
            <br />
            <span className="font-editorial font-medium italic text-qp-deep">{t("services_h2b")}</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {CARDS.map((c, i) => (
            <Reveal key={c.testid} delay={i * 0.08}>
              <div
                data-testid={c.testid}
                className="flex h-full flex-col rounded-3xl border border-qp-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-24px_rgba(67,33,106,0.3)]"
              >
                {c.img && (
                  <img
                    src={c.img}
                    alt={c.imgAlt}
                    loading="lazy"
                    className="mb-5 h-36 w-full rounded-2xl border border-qp-line object-cover"
                  />
                )}
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-qp-lav text-qp-purple">
                  <c.icon size={22} strokeWidth={2.2} />
                </span>
                <h3 className="mt-5 font-heading text-xl font-bold tracking-tight text-qp-ink">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-qp-muted">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div data-testid="hire-pro-service-list" className="mt-8 rounded-3xl border border-qp-line bg-qp-lav/50 p-7 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-qp-purple">
              Service categories seen in the preview
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {SERVICES.map((s) => (
                <span
                  key={s.label}
                  data-testid="hire-pro-service-item"
                  className="inline-flex items-center gap-2 rounded-full border border-qp-line bg-white px-4 py-2 text-sm font-semibold text-qp-ink/80 transition-colors hover:border-qp-orange"
                >
                  <s.icon size={15} className="text-qp-orange" />
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
