import { ShoppingBag, Tag, ShieldQuestion } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export function MarketplaceSection() {
  return (
    <section id="marketplace" className="scroll-mt-24 bg-qp-warm/80 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-7 lg:px-10">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-qp-ember">
            Buy • Sell • Bid
          </p>
          <h2 className="mt-4 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-qp-ink sm:text-5xl">
            Everyday finds.
            <br />
            <span className="font-editorial font-medium italic text-qp-deep">Your price decision.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-qp-muted sm:text-lg">
            Look for products you need. Give useful items a new home. Explore live auctions with a
            clear spending limit.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal delay={0.05}>
            <div
              data-testid="marketplace-buyers-card"
              className="h-full rounded-3xl border border-qp-orange/20 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-24px_rgba(236,119,45,0.35)] sm:p-9"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-qp-warm text-qp-ember">
                <ShoppingBag size={22} strokeWidth={2.2} />
              </span>
              <h3 className="mt-5 font-heading text-2xl font-bold tracking-tight text-qp-ink">For buyers</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-qp-muted">
                Check the item’s condition, seller details, delivery charges and total price. Bid
                only within the amount you are comfortable paying.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div
              data-testid="marketplace-sellers-card"
              className="h-full rounded-3xl border border-qp-orange/20 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-24px_rgba(236,119,45,0.35)] sm:p-9"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-qp-warm text-qp-ember">
                <Tag size={22} strokeWidth={2.2} />
              </span>
              <h3 className="mt-5 font-heading text-2xl font-bold tracking-tight text-qp-ink">For sellers</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-qp-muted">
                Present products clearly, set accurate terms and follow the app’s eligibility and
                verification process before selling.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div
            data-testid="marketplace-caveat-note"
            className="mt-8 flex items-start gap-3.5 rounded-2xl border border-qp-orange/25 bg-white/80 p-5"
          >
            <ShieldQuestion size={20} className="mt-0.5 shrink-0 text-qp-ember" />
            <p className="text-sm leading-relaxed text-qp-ink/80">
              An auction’s final price can rise. Winning, discounts, stock and delivery depend on
              the listing and applicable terms.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
