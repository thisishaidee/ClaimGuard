export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 shrink-0 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
          CG
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
