import { Reveal } from "@/components/Reveal";
import { useLang, type StringKey } from "@/lib/i18n";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ROWS: { testid: string; info: StringKey; why: StringKey; review: StringKey; planned?: boolean }[] = [
  { testid: "info-table-row-account", info: "data_r1a", why: "data_r1b", review: "data_r1c" },
  { testid: "info-table-row-documents", info: "data_r2a", why: "data_r2b", review: "data_r2c" },
  { testid: "info-table-row-health", info: "data_r3a", why: "data_r3b", review: "data_r3c" },
  { testid: "info-table-row-photos", info: "data_r4a", why: "data_r4b", review: "data_r4c" },
  { testid: "info-table-row-education", info: "data_r5a", why: "data_r5b", review: "data_r5c", planned: true },
  { testid: "info-table-row-marketplace", info: "data_r6a", why: "data_r6b", review: "data_r6c" },
];

export function InfoUseTable() {
  const { t } = useLang();
  return (
    <section id="data" className="scroll-mt-24 bg-qp-lav/70 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-7 lg:px-10">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-qp-purple">
            {t("data_eyebrow")}
          </p>
          <h2 className="mt-4 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-qp-ink sm:text-5xl">
            {t("data_h2a")}
            <br />
            <span className="font-editorial font-medium italic text-qp-deep">{t("data_h2b")}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-qp-muted sm:text-lg">
            {t("data_p")}
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
                    {t("data_th1")}
                  </TableHead>
                  <TableHead className="px-6 py-5 text-xs font-bold uppercase tracking-[0.14em] text-white">
                    {t("data_th2")}
                  </TableHead>
                  <TableHead className="px-6 py-5 text-xs font-bold uppercase tracking-[0.14em] text-white">
                    {t("data_th3")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ROWS.map((r) => (
                  <TableRow key={r.testid} data-testid={r.testid} className="border-qp-line">
                    <TableCell className="px-6 py-5 align-top font-semibold text-qp-ink">
                      <span className="flex flex-wrap items-center gap-2">
                        {t(r.info)}
                        {r.planned && (
                          <span className="rounded-full bg-qp-orange px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                            {t("data_r5badge")}
                          </span>
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-5 align-top text-[15px] leading-relaxed text-qp-muted">
                      {t(r.why)}
                    </TableCell>
                    <TableCell className="px-6 py-5 align-top text-[15px] leading-relaxed text-qp-muted">
                      {t(r.review)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-qp-muted">
            {t("data_note")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
