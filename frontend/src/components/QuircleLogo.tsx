export function QuircleMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#43216A" />
      <circle
        cx="30" cy="32" r="15" fill="none" stroke="#FFFFFF" strokeWidth="5.5"
        strokeLinecap="round" strokeDasharray="72 22" transform="rotate(-45 30 32)"
      />
      <circle cx="45" cy="19" r="6.5" fill="#EC772D" />
    </svg>
  );
}

export function QuircleLogo({ size = 40, dark = false }: { size?: number; dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <QuircleMark size={size} />
      <span
        className={`font-heading text-2xl font-extrabold tracking-tight ${dark ? "text-white" : "text-qp-ink"}`}
      >
        Quircle<span className="text-qp-orange">.</span>
      </span>
    </span>
  );
}
