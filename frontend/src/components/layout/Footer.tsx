import { QuircleLogo } from "@/components/QuircleLogo";
import { NAV_LINKS, APP_PREVIEW_URL, scrollToHash } from "@/lib/content";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();
  return (
    <footer data-testid="footer-container" className="border-t border-qp-line bg-white">
      <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-7 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a
              href="#top"
              data-testid="footer-brand-logo"
              aria-label="Quircle — back to top"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#top");
              }}
            >
              <QuircleLogo size={36} />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-qp-muted">
              Your family life, connected. Product overview · September 2026.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-qp-purple">Explore</p>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.hash}>
                    <a
                      href={l.hash}
                      data-testid={`footer-${l.testid}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToHash(l.hash);
                      }}
                      className="text-sm text-qp-ink/75 transition-colors hover:text-qp-orange"
                    >
                      {t(l.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-qp-purple">Product</p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={APP_PREVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="footer-link-app-preview"
                    className="text-sm text-qp-ink/75 transition-colors hover:text-qp-orange"
                  >
                    Open app preview
                  </a>
                </li>
                <li>
                  <a
                    href="#notify"
                    data-testid="footer-link-notify"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToHash("#notify");
                    }}
                    className="text-sm text-qp-ink/75 transition-colors hover:text-qp-orange"
                  >
                    Get launch updates
                  </a>
                </li>
                <li>
                  <a
                    href="#data"
                    data-testid="footer-link-info-choices"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToHash("#data");
                    }}
                    className="text-sm text-qp-ink/75 transition-colors hover:text-qp-orange"
                  >
                    Information &amp; choices
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-qp-line pt-6 text-xs leading-relaxed text-qp-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            Features and availability may change. Lifestyle and feature images are illustrative.
            This is a product preview website, not an app-store listing.
          </p>
          <a
            href="#data"
            data-testid="footer-info-choices-anchor"
            onClick={(e) => {
              e.preventDefault();
              scrollToHash("#data");
            }}
            className="shrink-0 font-semibold text-qp-purple hover:text-qp-orange"
          >
            Information &amp; choices ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
