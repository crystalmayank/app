import { Download, FileText, BookOpen, ArrowUpRight, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { BROCHURE_URL, CATALOGUE_URL, APP_PREVIEW_URL } from "@/lib/content";
import { track } from "@/lib/analytics";
import { useLang } from "@/lib/i18n";

interface DocDef {
  testid: string;
  previewTestid: string;
  icon: typeof FileText;
  meta: string;
  title: string;
  body: string;
  href: string;
  event: string;
  cta: string;
  slug: string;
  pages: number;
}

const DOCS: DocDef[] = [
  {
    testid: "download-brochure-btn",
    previewTestid: "preview-brochure-btn",
    icon: FileText,
    meta: "PDF · 4 pages",
    title: "The brochure",
    body: "A concise introduction to Quircle’s purpose and benefits.",
    href: BROCHURE_URL,
    event: "brochure_download",
    cta: "Download brochure",
    slug: "brochure",
    pages: 4,
  },
  {
    testid: "download-catalogue-btn",
    previewTestid: "preview-catalogue-btn",
    icon: BookOpen,
    meta: "PDF · 10 pages",
    title: "The feature catalogue",
    body: "Use cases, information needs and availability notes.",
    href: CATALOGUE_URL,
    event: "catalogue_download",
    cta: "Download catalogue",
    slug: "catalogue",
    pages: 10,
  },
];

export function DownloadsSection() {
  const { t } = useLang();
  const [preview, setPreview] = useState<DocDef | null>(null);
  const [page, setPage] = useState(1);

  const openPreview = (d: DocDef) => {
    setPreview(d);
    setPage(1);
    track(`${d.slug}_preview`, "downloads-section");
  };

  return (
    <section id="downloads" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-7 lg:px-10">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-qp-purple">
            Take a closer look
          </p>
          <h2 className="mt-4 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-qp-ink sm:text-5xl">
            {t("downloads_h2a")}
            <br />
            <span className="font-editorial font-medium italic text-qp-deep">{t("downloads_h2b")}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-qp-muted sm:text-lg">
            Share the overview, explore the feature catalogue, or open the app preview.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {DOCS.map((d, i) => (
            <Reveal key={d.testid} delay={i * 0.1}>
              <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-qp-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-24px_rgba(67,33,106,0.3)]">
                <button
                  type="button"
                  data-testid={d.previewTestid}
                  onClick={() => openPreview(d)}
                  aria-label={`Preview ${d.title}`}
                  className="relative block w-full cursor-pointer"
                >
                  <img
                    src={`/downloads/preview/${d.slug}-1.jpg`}
                    alt={`${d.title} cover page`}
                    loading="lazy"
                    className="h-56 w-full border-b border-qp-line object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-qp-deep/90 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur">
                    <Eye size={13} strokeWidth={2.5} />
                    Flip through
                  </span>
                </button>
                <div className="flex flex-1 flex-col p-8">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-qp-deep text-white transition-colors duration-300 group-hover:bg-qp-orange">
                      <d.icon size={22} strokeWidth={2} />
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-qp-muted">
                      {d.meta}
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-2xl font-bold tracking-tight text-qp-ink sm:text-[28px]">
                    {d.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-qp-muted">{d.body}</p>
                  <a
                    href={d.href}
                    download
                    data-testid={d.testid}
                    onClick={() => track(d.event, "downloads-section")}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-qp-deep px-4 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-qp-purple active:scale-[0.98]"
                  >
                    <Download size={17} strokeWidth={2.5} />
                    {d.cta}
                  </a>
                </div>
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

      <Dialog
        open={preview !== null}
        onOpenChange={(open: boolean) => {
          if (!open) setPreview(null);
        }}
      >
        <DialogContent
          data-testid="pdf-preview-modal"
          className="flex h-[90vh] max-w-[calc(100%-1.5rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl"
        >
          <div className="flex items-center justify-between gap-4 border-b border-qp-line px-5 py-3.5 pr-14">
            <div>
              <DialogTitle className="font-heading text-lg font-bold text-qp-ink">
                {preview?.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-qp-muted">
                {preview?.meta} · flip with the arrows
              </DialogDescription>
            </div>
            {preview && (
              <a
                href={preview.href}
                download
                data-testid="pdf-preview-download-btn"
                onClick={() => track(preview.event, "preview-modal")}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-qp-deep px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-qp-purple"
              >
                <Download size={14} strokeWidth={2.5} />
                Download
              </a>
            )}
          </div>

          {preview && (
            <div className="relative min-h-0 flex-1 bg-qp-lav/50">
              <img
                key={page}
                src={`/downloads/preview/${preview.slug}-${page}.jpg`}
                alt={`${preview.title}, page ${page} of ${preview.pages}`}
                data-testid="pdf-preview-page"
                className="absolute inset-0 mx-auto h-full w-auto max-w-full object-contain py-3"
              />
              <button
                type="button"
                data-testid="pdf-preview-prev-btn"
                aria-label="Previous page"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-qp-line bg-white/95 text-qp-deep shadow-md transition-all hover:bg-qp-deep hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-qp-deep"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                data-testid="pdf-preview-next-btn"
                aria-label="Next page"
                disabled={page === preview.pages}
                onClick={() => setPage((p) => Math.min(preview.pages, p + 1))}
                className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-qp-line bg-white/95 text-qp-deep shadow-md transition-all hover:bg-qp-deep hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-qp-deep"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {preview && (
            <div className="flex items-center justify-center gap-3 border-t border-qp-line px-5 py-3">
              <span className="flex gap-1.5" aria-hidden="true">
                {Array.from({ length: preview.pages }, (_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      i + 1 === page ? "w-5 bg-qp-orange" : "w-1.5 bg-qp-line"
                    }`}
                  />
                ))}
              </span>
              <span
                data-testid="pdf-preview-page-indicator"
                className="font-mono text-xs font-bold text-qp-muted"
              >
                {page} / {preview.pages}
              </span>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
