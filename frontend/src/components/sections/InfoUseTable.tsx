import { Reveal } from "@/components/Reveal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ROWS = [
  {
    testid: "info-table-row-account",
    info: "Account & profile details",
    why: "Access your account and identify yourself to connections.",
    review: "Which profile fields are visible.",
  },
  {
    testid: "info-table-row-documents",
    info: "Documents & file details",
    why: "Organize, search and share chosen records.",
    review: "Recipients, scope and link access.",
  },
  {
    testid: "info-table-row-health",
    info: "Health records",
    why: "Keep a history for you and authorized care conversations.",
    review: "Patient, selected reports and sharing consent.",
  },
  {
    testid: "info-table-row-photos",
    info: "Photos & social activity",
    why: "Share memories and keep conversations going.",
    review: "Audience and location before posting.",
  },
  {
    testid: "info-table-row-education",
    info: "Education & work details",
    planned: true,
    why: "Suggest people with a relevant shared institution or period.",
    review: "Optional discovery and connection choices.",
  },
  {
    testid: "info-table-row-marketplace",
    info: "Listings, bids & order details",
    why: "Support product discovery and transaction follow-up.",
    review: "Total cost, seller terms and delivery details.",
  },
];

export function InfoUseTable() {
  return (
    <section id="data" className="scroll-mt-24 bg-qp-lav/70 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-7 lg:px-10">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-qp-purple">
            Understand your information
          </p>
          <h2 className="mt-4 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-qp-ink sm:text-5xl">
            Useful details.
            <br />
            <span className="font-editorial font-medium italic text-qp-deep">A clear purpose.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-qp-muted sm:text-lg">
            These examples explain how information supports Quircle’s features. Check the app’s
            current notices and permission screens for the exact collection, access and retention
            terms.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            data-testid="info-table-container"
            className="mt-12 overflow-hidden rounded-3xl border border-qp-line bg-white"
          >
            <Table>
              <TableHeader>
                <TableRow className="bg-qp-deep hover:bg-qp-deep">
                  <TableHead className="px-6 py-5 text-xs font-bold uppercase tracking-[0.14em] text-white">
                    Information
                  </TableHead>
                  <TableHead className="px-6 py-5 text-xs font-bold uppercase tracking-[0.14em] text-white">
                    Why it is useful
                  </TableHead>
                  <TableHead className="px-6 py-5 text-xs font-bold uppercase tracking-[0.14em] text-white">
                    What to review
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ROWS.map((r) => (
                  <TableRow key={r.testid} data-testid={r.testid} className="border-qp-line">
                    <TableCell className="px-6 py-5 align-top font-semibold text-qp-ink">
                      <span className="flex flex-wrap items-center gap-2">
                        {r.info}
                        {r.planned && (
                          <span className="rounded-full bg-qp-orange px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                            Planned matching
                          </span>
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-5 align-top text-[15px] leading-relaxed text-qp-muted">
                      {r.why}
                    </TableCell>
                    <TableCell className="px-6 py-5 align-top text-[15px] leading-relaxed text-qp-muted">
                      {r.review}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-qp-muted">
            This page explains product use; it is not a privacy policy or a security certification.
            This website stores the details you submit in the early-access form and records simple,
            anonymous counts of button clicks (downloads and preview opens) — nothing else is
            tracked.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
