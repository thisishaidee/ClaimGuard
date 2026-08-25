import { RiskClaim, ClaimState } from "../claimGuard";

interface Props {
  liveClaims: RiskClaim[];
  state: ClaimState;
  blocked: boolean;
  onClose: () => void;
}

function displayState(state: ClaimState): string {
  return state === "INSUFFICIENT" ? "INSUFFICIENT FRESH EVIDENCE" : state;
}

export default function DecisionGate({
  liveClaims,
  state,
  blocked,
  onClose,
}: Props) {
  const creators = new Set(liveClaims.map((c) => c.creator)).size;
  const assessments = new Set(liveClaims.map((c) => c.assessment)).size;

  const rows = [
    ["Distinct reporters", String(creators)],
    ["Live claims", String(liveClaims.length)],
    ["Unique assessments", String(assessments)],
    ["Fresh evidence", liveClaims.length >= 2 ? "YES" : "NO"],
  ];

  return (
    <div className="rounded-xl border border-zinc-600 bg-zinc-900 p-4 sm:p-5 space-y-4 shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] sm:text-xs text-zinc-500 uppercase tracking-wider">
            Evaluation
          </div>
          <div className="font-semibold">ClaimGuard Evaluation</div>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 min-h-11 px-3 text-zinc-500 hover:text-zinc-300 text-sm"
        >
          Close
        </button>
      </div>

      <div className="divide-y divide-zinc-800 rounded-lg border border-zinc-800 overflow-hidden text-sm">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-baseline justify-between gap-3 px-3 sm:px-4 py-2.5 bg-zinc-800/40"
          >
            <span className="text-zinc-400">{label}</span>
            <span className="font-semibold tabular-nums">{value}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-800 pt-4 space-y-3">
        <div>
          <div className="text-[11px] sm:text-xs text-zinc-500 uppercase tracking-wider mb-1">
            State
          </div>
          <div className="text-base sm:text-lg font-bold leading-tight break-words">
            {displayState(state)}
          </div>
        </div>
        <div>
          <div className="text-[11px] sm:text-xs text-zinc-500 uppercase tracking-wider mb-1">
            Decision
          </div>
          <div
            className={`text-base sm:text-lg font-bold ${
              blocked ? "text-red-400" : "text-emerald-400"
            }`}
          >
            {blocked ? "BLOCKED" : "MAY PROCEED"}
          </div>
        </div>
      </div>

      <div className="text-xs text-zinc-500 leading-relaxed border-t border-zinc-800 pt-4">
        ClaimGuard does not determine which reporter is correct. It detects that
        the current evidence is{" "}
        {state === "DISAGREEMENT" ? "not unanimous" : "insufficient"}.
      </div>
    </div>
  );
}
