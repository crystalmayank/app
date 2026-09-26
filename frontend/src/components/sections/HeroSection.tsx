import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, Download, FolderLock, BellRing, Gavel } from "lucide-react";
import { BROCHURE_URL, scrollToHash } from "@/lib/content";
import { track } from "@/lib/analytics";

const HEADLINE_LINES = ["Your family life,", "connected."];

function FloatingChip({
  icon,
  title,
  sub,
  className,
  delay,
  testid,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  className: string;
  delay: number;
  testid: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      data-testid={testid}
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute z-10 ${className}`}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -9, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex items-center gap-2.5 rounded-2xl border border-qp-line bg-white/95 px-4 py-3 shadow-[0_18px_40px_-16px_rgba(67,33,106,0.35)] backdrop-blur"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-qp-lav text-qp-purple">
          {icon}
        </span>
        <span>
          <span className="block text-xs font-bold text-qp-ink">{title}</span>
          <span className="block text-[11px] text-qp-muted">{sub}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const chipY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden pt-[76px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-qp-lav blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-64 h-[420px] w-[420px] rounded-full bg-qp-warm blur-3xl"
      />

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-5 pb-20 pt-14 sm:px-7 lg:grid-cols-2 lg:gap-10 lg:px-10 lg:pb-28 lg:pt-20">
        <div>
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 rounded-full border border-qp-line bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-qp-purple"
          >
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-qp-orange" />
            Documents. Memories. Your people.
          </motion.p>

          <h1
            data-testid="hero-headline"
            aria-label="Your family life, connected."
            className="mt-7 font-heading text-[44px] font-extrabold leading-[1.05] tracking-tight text-qp-ink sm:text-6xl lg:text-[68px]"
          >
            {HEADLINE_LINES.map((line, i) => (
              <span key={line} aria-hidden="true" className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: reduce ? 0 : "112%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.95, delay: 0.15 + i * 0.17, ease: [0.16, 1, 0.3, 1] }}
                >
                  {i === 1 ? (
                    <>
                      <span className="font-editorial italic text-qp-deep">connected</span>
                      <span className="text-qp-orange">.</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            data-testid="hero-subtitle"
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-qp-muted"
          >
            Keep important records close. Share meaningful moments. Reconnect with people and
            discover everyday value — all within Quircle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#features"
              data-testid="hero-cta-discover-btn"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#features");
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-qp-deep px-7 py-4 text-base font-bold text-white shadow-[0_16px_36px_-14px_rgba(67,33,106,0.55)] transition-all duration-200 hover:bg-qp-purple hover:shadow-[0_20px_44px_-14px_rgba(112,68,183,0.6)] active:scale-[0.98]"
            >
              Discover Quircle
              <ArrowDownRight size={18} strokeWidth={2.5} />
            </a>
            <a
              href={BROCHURE_URL}
              download
              data-testid="hero-cta-brochure-btn"
              onClick={() => track("brochure_download", "hero")}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-qp-line bg-white px-7 py-[14px] text-base font-bold text-qp-deep transition-all duration-200 hover:border-qp-orange hover:text-qp-ember active:scale-[0.98]"
            >
              Get the brochure
              <Download size={18} strokeWidth={2.5} />
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-6 flex items-center gap-2 text-xs font-medium tracking-wide text-qp-muted"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-qp-orange" />
            Product preview · Explore the features below
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.96, y: reduce ? 0 : 26 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[40px_120px_40px_120px] bg-gradient-to-br from-qp-lav via-white to-qp-warm"
          />
          <motion.div style={{ y: photoY }} className="relative">
            <div
              data-testid="hero-family-photo-card"
              className="relative overflow-hidden rounded-[32px_110px_32px_110px] border-4 border-white shadow-[0_40px_90px_-30px_rgba(67,33,106,0.45)]"
            >
              <img
                src="/assets/family.jpg"
                alt="A family enjoying a moment together around a phone."
                width={1536}
                height={1024}
                className="h-[350px] w-full object-cover lg:h-[470px]"
                fetchPriority="high"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-qp-deep/25 via-transparent to-transparent"
              />
              <p className="absolute bottom-5 left-6 right-6 font-editorial text-lg italic text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
                More together. Less scattered.
              </p>
            </div>
          </motion.div>

          <motion.div style={{ y: chipY }} className="absolute inset-0" aria-hidden="true">
            <FloatingChip
              testid="hero-floating-badge-docs"
              icon={<FolderLock size={17} strokeWidth={2.4} />}
              title="Document Vault"
              sub="Folders, search & sharing"
              className="-left-3 top-8 sm:-left-8"
              delay={1}
            />
            <FloatingChip
              testid="hero-floating-badge-health"
              icon={<BellRing size={17} strokeWidth={2.4} />}
              title="Health reminders"
              sub="Records ready for a visit"
              className="-right-2 top-1/3 sm:-right-6"
              delay={1.2}
            />
            <FloatingChip
              testid="hero-floating-badge-bid"
              icon={<Gavel size={17} strokeWidth={2.4} />}
              title="Live Bid"
              sub="Everyday value, your budget"
              className="-left-2 bottom-24 sm:-left-6"
              delay={1.4}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
