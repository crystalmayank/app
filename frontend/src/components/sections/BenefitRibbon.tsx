const ITEMS = [
  "One place for what matters",
  "Family & friends",
  "Personal records",
  "Everyday possibilities",
];

export function BenefitRibbon() {
  const row = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <section
      data-testid="benefit-ribbon-container"
      aria-label="Quircle benefits"
      className="overflow-hidden bg-qp-deep py-5"
    >
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} aria-hidden={half === 1} className="flex items-center">
            {row.map((item, i) => (
              <span
                key={`${half}-${i}`}
                data-testid={half === 0 ? `benefit-ribbon-item-${i % ITEMS.length}` : undefined}
                className="flex items-center whitespace-nowrap"
              >
                <span className="px-8 font-heading text-lg font-bold tracking-wide text-white sm:text-xl">
                  {item}
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
