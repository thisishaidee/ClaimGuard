import { RiskClaim } from "./claimGuard";

export const INITIAL_TIME = 0;

export const MOCK_CLAIMS: RiskClaim[] = [
  {
    type: "risk_claim",
    riskObjectId: "aave-v3-usdc-482",
    riskType: "liquidation_proximity",
    assessment: "elevated",
    observedAt: -120,
    expiresAt: 240,
    creator: "RiskDesk A",
    key: "claim-a",
    expirationBlock: 1004,
  },
  {
    type: "risk_claim",
    riskObjectId: "aave-v3-usdc-482",
    riskType: "liquidation_proximity",
    assessment: "elevated",
    observedAt: -180,
    expiresAt: 180,
    creator: "KeeperNet B",
    key: "claim-b",
    expirationBlock: 1003,
  },
  {
    type: "risk_claim",
    riskObjectId: "aave-v3-usdc-482",
    riskType: "liquidation_proximity",
    assessment: "low",
    observedAt: -60,
    expiresAt: 300,
    creator: "Guardian C",
    key: "claim-c",
    expirationBlock: 1005,
  },
];