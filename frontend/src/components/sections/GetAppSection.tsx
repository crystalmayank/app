import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, Link2, MessageCircle, Smartphone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Input } from "@/components/ui/input";
import { APP_PREVIEW_URL } from "@/lib/content";
import { track } from "@/lib/analytics";
import { useLang } from "@/lib/i18n";

async function copyAppLink() {
  try {
    await navigator.clipboard.writeText(APP_PREVIEW_URL);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = APP_PREVIEW_URL;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  toast.success("App link copied — paste it anywhere to share.");
  track("copy_link", "get-app");
}

export function GetAppSection() {
  const { t } = useLang();
  const [phone, setPhone] = useState("");

  const sendToMobile = () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      toast.error("Enter a valid mobile number (10–15 digits, with country code if outside India).");
      return;
    }
    const withCode = digits.length === 10 ? `91${digits}` : digits;
    const text = encodeURIComponent(
      `Quircle — your family life, connected. Explore the app preview: ${APP_PREVIEW_URL}`
    );
    window.open(`https://wa.me/${withCode}?text=${text}`, "_blank", "noopener,noreferrer");
    track("share_mobile", "get-app");
    toast.success("Opening WhatsApp with the link ready to send.");
  };

  return (
    <section id="get-app" className="scroll-mt-24 overflow-hidden py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 sm:px-7 lg:grid-cols-2 lg:px-10">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-qp-purple">Get the app</p>
          <h2 className="mt-4 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-qp-ink sm:text-5xl">
            {t("getapp_h2a")}
            <br />
            <span className="font-editorial font-medium italic text-qp-deep">{t("getapp_h2b")}</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-qp-muted sm:text-lg">
            See your family life come together on your phone — documents, health, memories and the
            marketplace in one Quircle home screen.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={APP_PREVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="get-app-preview-btn"
              onClick={() => track("preview_click", "get-app")}
              className="inline-flex items-center gap-2 rounded-xl bg-qp-deep px-7 py-4 text-base font-bold text-white shadow-[0_16px_36px_-14px_rgba(67,33,106,0.55)] transition-all duration-200 hover:bg-qp-purple active:scale-[0.98]"
            >
              <Smartphone size={18} strokeWidth={2.4} />
              Open app preview
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </a>
            <button
              type="button"
              data-testid="copy-link-btn"
              onClick={copyAppLink}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-qp-line bg-white px-6 py-[14px] text-base font-bold text-qp-deep transition-all duration-200 hover:border-qp-orange hover:text-qp-ember active:scale-[0.98]"
            >
              <Link2 size={18} strokeWidth={2.4} />
              Copy app link
            </button>
          </div>

          <div className="mt-8 max-w-lg rounded-2xl border border-qp-line bg-white p-5">
            <p className="text-sm font-bold text-qp-ink">Send the link to a mobile number</p>
            <div className="mt-3 flex gap-2.5">
              <Input
                type="tel"
                inputMode="tel"
                data-testid="share-phone-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    sendToMobile();
                  }
                }}
                placeholder="e.g. 98765 43210"
                aria-label="Mobile number"
                className="h-12 flex-1 rounded-xl border-qp-line"
              />
              <button
                type="button"
                data-testid="share-phone-btn"
                onClick={sendToMobile}
                className="inline-flex h-12 shrink-0 items-center gap-2 rounded-xl bg-qp-orange px-5 text-sm font-bold text-white transition-all duration-200 hover:bg-qp-ember active:scale-[0.98]"
              >
                <MessageCircle size={16} strokeWidth={2.5} />
                Send
              </button>
            </div>
            <p className="mt-2.5 text-xs leading-relaxed text-qp-muted">
              Opens WhatsApp with the app link ready to send to that number. For numbers outside
              India, include the country code.
            </p>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-qp-muted">
            The current preview may require Expo Go or renewed access. App-store availability and a
            permanent download link are not yet confirmed.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative mx-auto w-[280px] sm:w-[330px]">
            <div
              aria-hidden="true"
              className="absolute -inset-10 rounded-full bg-gradient-to-br from-qp-lav via-qp-warm to-qp-lav blur-2xl"
            />
            <div
              data-testid="get-app-phone-mockup"
              className="group relative rounded-[3.4rem] border border-qp-line bg-qp-night p-2.5 shadow-[0_60px_120px_-40px_rgba(33,12,56,0.65)] transition-transform duration-500 hover:-rotate-1 hover:scale-[1.015]"
            >
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-4 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-qp-night"
              />
              <img
                src="/assets/app-home.jpg"
                alt="Quircle app home screen showing Documents, Family and Health spaces, plus Social, Quick Help and Marketplace"
                loading="lazy"
                className="w-full rounded-[2.7rem]"
              />
            </div>
            <span
              data-testid="get-app-phone-badge"
              className="absolute -right-4 top-10 inline-flex items-center gap-1.5 rounded-full bg-qp-orange px-4 py-2 text-xs font-bold text-white shadow-[0_10px_26px_-8px_rgba(236,119,45,0.7)]"
            >
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-white" />
              Live preview
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
