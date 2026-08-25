import { useState } from "react";
import { MOCK_CLAIMS, INITIAL_TIME } from "./mockClaims";
import {
  getLiveClaims,
  deriveState,
  shouldBlock,
  getAssessmentSummary,
  ClaimState,
} from "./claimGuard";
import Header from "./components/Header";
import RiskObjectView from "./components/RiskObjectView";
import DecisionGate from "./components/DecisionGate";

export default function App() {
  const [simulatedTime, setSimulatedTime] = useState(INITIAL_TIME);
  const [showGate, setShowGate] = useState(false);

  const liveClaims = getLiveClaims(
    MOCK_CLAIMS,
    "aave-v3-usdc-482",
    simulatedTime
  );
  const state: ClaimState = deriveState(liveClaims);
  const blocked = shouldBlock(state);
  const summary = getAssessmentSummary(liveClaims);

  const advanceTime = () => {
    setSimulatedTime((t) => t + 360);
    setShowGate(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <RiskObjectView
          liveClaims={liveClaims}
          state={state}
          blocked={blocked}
          summary={summary}
          simulatedTime={simulatedTime}
          onAdvanceTime={advanceTime}
          onShowGate={() => setShowGate(true)}
        />

        {showGate && (
          <DecisionGate
            liveClaims={liveClaims}
            state={state}
            blocked={blocked}
            onClose={() => setShowGate(false)}
          />
        )}
      </main>
    </div>
  );
}