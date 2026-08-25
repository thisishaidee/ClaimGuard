import { RiskClaim } from "../claimGuard";

interface Props {
  claims: RiskClaim[];
  simulatedTime: number;
}

export default function ClaimTable({ claims, simulatedTime }: Props) {
  if (claims.length === 0) {
    return (
      <div className="px-4 sm:px-5 py-8 text-center text-zinc-500 text-sm">
        No live claims
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs sm:text-sm">
        <thead>
          <tr className="text-zinc-500 text-left border-b border-zinc-800">
            <th className="px-4 sm:px-5 py-2 font-medium">Reporter</th>
            <th className="px-3 sm:px-5 py-2 font-medium">Assessment</th>
            <th className="px-4 sm:px-5 py-2 font-medium text-right sm:text-left whitespace-nowrap">
              Expires in
            </th>
          </tr>
        </thead>
        <tbody>
          {claims.map((c) => {
            const remaining = Math.max(0, c.expiresAt - simulatedTime);
            return (
              <tr
                key={c.key}
                className="border-b border-zinc-800/60 last:border-0"
              >
                <td className="px-4 sm:px-5 py-3 font-medium whitespace-nowrap">
                  {c.creator}
                </td>
                <td className="px-3 sm:px-5 py-3">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded text-[11px] sm:text-xs font-medium ${
                      c.assessment === "elevated"
                        ? "bg-amber-500/15 text-amber-400"
                        : c.assessment === "critical"
                        ? "bg-red-500/15 text-red-400"
                        : "bg-emerald-500/15 text-emerald-400"
                    }`}
                  >
                    {c.assessment.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 sm:px-5 py-3 text-zinc-400 text-right sm:text-left tabular-nums">
                  {remaining}s
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
