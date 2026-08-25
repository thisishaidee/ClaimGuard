# ClaimGuard

**Time-bound risk layer for autonomous DeFi.**

Independent parties publish short-lived risk judgments about the same DeFi object. When those judgments disagree — or become stale — ClaimGuard blocks automatic action.

Built for the [Arkiv Ideathon](https://ideathon.arkiv.network/) (DeFi track).

## Product Statement

ClaimGuard is a time-bound risk layer for autonomous DeFi: independent parties publish short-lived risk judgments, and conflicting or stale evidence automatically prevents an actor from proceeding blindly.

## Core Primitive

**Expiring Risk Claims**

- One entity: `risk_claim`
- Distinct attributable reporters (`$creator`)
- Short-lived claims (protocol-enforced expiry)
- Application derives: `UNANIMOUS` | `DISAGREEMENT` | `INSUFFICIENT`
- Decision rule: DISAGREEMENT or INSUFFICIENT → block automatic action

## Demo Behavior

| Time | Live Claims | State | Decision |
|------|-------------|-------|----------|
| t = 0 | 3 (2 Elevated / 1 Low) | DISAGREEMENT | BLOCKED |
| t = +6 min | 0 | INSUFFICIENT FRESH EVIDENCE | BLOCKED |

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Pure decision logic in `claimGuard.ts` (no backend)

## Run Locally

```bash
npm install
npm run dev
```

## Important Notes

- This is a **Demo Mode** prototype that simulates Arkiv behavior (attribution + expiry + live query surface).
- There is currently no public Arkiv network (Braga retired 12 Aug 2026).
- ClaimGuard does **not** determine truth. It only exposes the distribution of fresh, attributable risk judgments.
- Smart contracts remain the hard enforcement layer.

## License

MIT