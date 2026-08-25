function ClaimGuardMark() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-5 h-5"
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M16 4.2L25 8.1v8.4c0 5.4-3.8 9.5-9 11.9-5.2-2.4-9-6.5-9-11.9V8.1L16 4.2z"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12.2" cy="14" r="1.35" fill="currentColor" />
      <circle cx="16" cy="14" r="1.35" fill="currentColor" />
      <circle cx="19.8" cy="14" r="1.35" fill="currentColor" />
      <rect x="11" y="18.2" width="10" height="1.7" rx="0.85" fill="currentColor" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
        <div
          className="w-8 h-8 shrink-0 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400"
          aria-label="ClaimGuard"
        >
          <ClaimGuardMark />
        </div>
        <div className="min-w-0">
          <div className="font-semibold tracking-tight">ClaimGuard</div>
          <div className="text-[11px] sm:text-xs text-zinc-500 leading-snug">
            ClaimGuard · Demo Mode — Arkiv behavior simulated
          </div>
        </div>
      </div>
    </header>
  );
}
