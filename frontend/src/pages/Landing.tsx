import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { BenefitRibbon } from "@/components/sections/BenefitRibbon";
import { BentoFeaturesGrid } from "@/components/sections/BentoFeaturesGrid";
import { FamilySharingSteps } from "@/components/sections/FamilySharingSteps";
import { FindAFriendSection } from "@/components/sections/FindAFriendSection";
import { MarketplaceSection } from "@/components/sections/MarketplaceSection";
import { MoreFeaturesSection } from "@/components/sections/MoreFeaturesSection";
import { InfoUseTable } from "@/components/sections/InfoUseTable";
import { DownloadsSection } from "@/components/sections/DownloadsSection";
import { NotifySection } from "@/components/sections/NotifySection";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { track } from "@/lib/analytics";

export default function Landing() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    track("page_view", "landing");
  }, []);

  return (
    <div className="min-h-screen bg-qp-cream text-qp-ink">
      <a
        href="#features"
        data-testid="skip-to-content-link"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-qp-deep focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main>
        <HeroSection />
        <BenefitRibbon />
        <BentoFeaturesGrid />
        <FamilySharingSteps />
        <FindAFriendSection />
        <MarketplaceSection />
        <MoreFeaturesSection />
        <InfoUseTable />
        <DownloadsSection />
        <NotifySection />
        <ClosingCta />
      </main>
      <Footer />
      <Toaster richColors />
    </div>
  );
}
