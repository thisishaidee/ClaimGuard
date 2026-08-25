export type Assessment = "low" | "elevated" | "critical";

export interface RiskClaim {
  type: "risk_claim";
  riskObjectId: string;
  riskType: "liquidation_proximity";
  assessment: Assessment;
  observedAt: number;
  expiresAt: number;
  creator: string;
  key: string;
  expirationBlock: number;
}

export type ClaimState = "UNANIMOUS" | "DISAGREEMENT" | "INSUFFICIENT";

export type AssessmentCounts = Record<Assessment, number>;

export function getLiveClaims(
  claims: RiskClaim[],
  riskObjectId: string,
  simulatedTime: number
): RiskClaim[] {
  return claims.filter(
    (c) => c.riskObjectId === riskObjectId && c.expiresAt > simulatedTime
  );
}

export function deriveState(liveClaims: RiskClaim[]): ClaimState {
  const creators = new Set(liveClaims.map((c) => c.creator));
  if (creators.size < 2) return "INSUFFICIENT";

  const assessments = new Set(liveClaims.map((c) => c.assessment));
  return assessments.size === 1 ? "UNANIMOUS" : "DISAGREEMENT";
}

export function shouldBlock(state: ClaimState): boolean {
  return state === "DISAGREEMENT" || state === "INSUFFICIENT";
}

export function getAssessmentSummary(liveClaims: RiskClaim[]): AssessmentCounts {
  const counts: AssessmentCounts = {
    low: 0,
    elevated: 0,
    critical: 0,
  };

  liveClaims.forEach((c) => {
    counts[c.assessment] += 1;
  });

  return counts;
}