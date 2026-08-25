import { RiskClaim, ClaimState } from "../claimGuard";

interface Props {
  liveClaims: RiskClaim[];
  state: ClaimState;
  blocked: boolean;
  onClose: () => void;
}

export default function DecisionGate({
  liveClaims,
  state,
  blocked,
  onClose,
}: Props) {
  const creators = new Set(liveClaims.map((c) => c.creator)).size;
  const assessments = new Set(liveClaims.map((c) => c.assessment)).size;

  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="font-semibold">ClaimGuard Evaluation</div>
        <button
          onClick={onClose}
          className="text-zinc-500 hover:text-zinc-300 text-sm"
        >
          Close
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-zinc-800/60 rounded-lg p-3">
          <div className="text-zinc-500 text-xs mb-1">Distinct reporters</div>
          <div className="text-lg font-semibold">{creators}</div>
        </div>
        <div className="bg-zinc-800/60 rounded-lg p-3">
          <div className="text-zinc-500 text-xs mb-1">Live claims</div>
          <div className="text-lg font-semibold">{liveClaims.length}</div>
        </div>
        <div className="bg-zinc-800/60 rounded-lg p-3">
          <div className="text-zinc-500 text-xs mb-1">Unique assessments</div>
          <div className="text-lg font-semibold">{assessments}</div>
        </div>
        <div className="bg-zinc-800/60 rounded-lg p-3">
          <div className="text-zinc-500 text-xs mb-1">Fresh evidence</div>
          <div className="text-lg font-semibold">
            {liveClaims.length >= 2 ? "YES" : "NO"}
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">State</span>
          <span className="font-medium">{state}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">Decision</span>
          <span
            className={`font-semibold ${
              blocked ? "text-red-400" : "text-emerald-400"
            }`}
          >
            {blocked ? "BLOCKED" : "MAY PROCEED"}
          </span>
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