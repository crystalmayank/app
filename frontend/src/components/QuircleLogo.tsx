export function QuircleLogo({ size = 40, dark = false }: { size?: number; dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <img
        src="/assets/quircle-logo.png"
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="rounded-[26%] object-cover shadow-sm"
      />
      <span
        className={`notranslate font-heading text-2xl font-extrabold tracking-tight ${dark ? "text-white" : "text-qp-ink"}`}
        translate="no"
      >
        Quircle<span className="text-qp-orange">.</span>
      </span>
    </span>
  );
}
