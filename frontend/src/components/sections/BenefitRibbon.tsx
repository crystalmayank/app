import { useLang, type StringKey } from "@/lib/i18n";

const ITEM_KEYS: StringKey[] = ["ribbon_1", "ribbon_2", "ribbon_3", "ribbon_4"];

export function BenefitRibbon() {
  const { t } = useLang();
  const row = [...ITEM_KEYS, ...ITEM_KEYS, ...ITEM_KEYS];
  return (
    <section
      data-testid="benefit-ribbon-container"
      aria-label="Quircle benefits"
      className="overflow-hidden bg-qp-deep py-5"
    >
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} aria-hidden={half === 1} className="flex items-center">
            {row.map((key, i) => (
              <span
                key={`${half}-${i}`}
                data-testid={half === 0 ? `benefit-ribbon-item-${i % ITEM_KEYS.length}` : undefined}
                className="flex items-center whitespace-nowrap"
              >
                <span className="px-8 font-heading text-lg font-bold tracking-wide text-white sm:text-xl">
                  {t(key)}
                </span>
                <span className="text-xl text-qp-orange" aria-hidden="true">
                  ✦
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
