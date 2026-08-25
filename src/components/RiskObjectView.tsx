import { RiskClaim, ClaimState, AssessmentCounts } from "../claimGuard";
import ClaimTable from "./ClaimTable";

interface Props {
  liveClaims: RiskClaim[];
  state: ClaimState;
  blocked: boolean;
  summary: AssessmentCounts;
  simulatedTime: number;
  onAdvanceTime: () => void;
  onShowGate: () => void;
}

export default function RiskObjectView({
  liveClaims,
  state,
  blocked,
  summary,
  simulatedTime,
  onAdvanceTime,
  onShowGate,
}: Props) {
  const stateColor =
    state === "DISAGREEMENT"
      ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
      : state === "INSUFFICIENT"
      ? "bg-zinc-500/15 text-zinc-400 border-zinc-500/30"
      : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";

  const summaryText = Object.entries(summary)
    .filter(([, count]) => count > 0)
    .map(([assessment, count]) => `${count} ${assessment.toUpperCase()}`)
    .join(" · ");

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
          Risk Object
        </div>
        <div className="text-xl font-semibold">
          Aave V3 · USDC Position #482
        </div>
        <div className="text-sm text-zinc-400 mt-1">
          Risk type: liquidation_proximity
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
        <div className="px-5 py-3 border-b border-zinc-800 flex items-center justify-between">
          <div className="font-medium">
            Live Claims{" "}
            <span className="text-zinc-500 font-normal">
              ({liveClaims.length})
            </span>
          </div>
          <div className="text-xs text-zinc-500">t = {simulatedTime}s</div>
        </div>
        <ClaimTable claims={liveClaims} simulatedTime={simulatedTime} />
      </div>

      <div
        className={`rounded-xl border p-5 ${stateColor} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
      >
        <div>
          <div className="text-xs uppercase tracking-wider opacity-70 mb-1">
            ClaimGuard State
          </div>
          <div className="text-2xl font-bold tracking-tight">{state}</div>
          {liveClaims.length > 0 && (
            <div className="text-sm mt-1 opacity-80">{summaryText}</div>
          )}
        </div>
        <div className="text-right">
          <div
            className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold text-sm ${
              blocked
                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            }`}
          >
            {blocked ? "AUTOMATIC ACTION BLOCKED" : "MAY PROCEED"}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onShowGate}
          className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-sm font-medium transition"
        >
          Open Decision Gate
        </button>
        <button
          onClick={onAdvanceTime}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium transition"
        >
          Advance Time +6 min
        </button>
      </div>

      {simulatedTime > 0 && (
        <div className="text-sm text-zinc-500 border border-zinc-800 rounded-lg px-4 py-3">
          Expired claims are no longer returned by the live decision query.
        </div>
      )}
    </div>
  );
}
