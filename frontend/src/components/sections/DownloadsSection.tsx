import { Download, FileText, BookOpen, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { BROCHURE_URL, CATALOGUE_URL, APP_PREVIEW_URL } from "@/lib/content";
import { track } from "@/lib/analytics";

const DOCS = [
  {
    testid: "download-brochure-btn",
    icon: FileText,
    meta: "PDF · 4 pages",
    title: "The brochure",
    body: "A concise introduction to Quircle’s purpose and benefits.",
    href: BROCHURE_URL,
    event: "brochure_download",
    cta: "Download brochure",
  },
  {
    testid: "download-catalogue-btn",
    icon: BookOpen,
    meta: "PDF · 10 pages",
    title: "The feature catalogue",
    body: "Use cases, information needs and availability notes.",
    href: CATALOGUE_URL,
    event: "catalogue_download",
    cta: "Download catalogue",
  },
];

export function DownloadsSection() {
  return (
    <section id="downloads" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-7 lg:px-10">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-qp-purple">
            Take a closer look
          </p>
          <h2 className="mt-4 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-qp-ink sm:text-5xl">
            Your Quircle
            <br />
            <span className="font-editorial font-medium italic text-qp-deep">introduction kit.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-qp-muted sm:text-lg">
            Share the overview, explore the feature catalogue, or open the app preview.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {DOCS.map((d, i) => (
            <Reveal key={d.testid} delay={i * 0.1}>
              <div className="group flex h-full flex-col rounded-3xl border border-qp-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-24px_rgba(67,33,106,0.3)] sm:p-10">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-qp-deep text-white transition-colors duration-300 group-hover:bg-qp-orange">
                    <d.icon size={24} strokeWidth={2} />
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-qp-muted">
                    {d.meta}
                  </span>
                </div>
                <h3 className="mt-6 font-heading text-2xl font-bold tracking-tight text-qp-ink sm:text-[28px]">
                  {d.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-qp-muted">{d.body}</p>
                <a
                  href={d.href}
                  download
                  data-testid={d.testid}
                  onClick={() => track(d.event, "downloads-section")}
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-qp-deep px-6 py-4 text-sm font-bold text-white transition-all duration-200 hover:bg-qp-purple active:scale-[0.98]"
                >
                  <Download size={17} strokeWidth={2.5} />
                  {d.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-8 text-sm text-qp-muted">
            Prefer to explore first?{" "}
            <a
              href={APP_PREVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="downloads-preview-link"
              onClick={() => track("preview_click", "downloads-section")}
              className="inline-flex items-center gap-1 font-bold text-qp-purple transition-colors hover:text-qp-ember"
            >
              Open the app preview
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
