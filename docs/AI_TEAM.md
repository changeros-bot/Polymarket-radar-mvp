# AI Team Guide

This document defines how multiple AI tools should collaborate on this project.

Current mode: **multi-AI review and planning**, not autonomous multi-agent coding.

The goal is to make AI collaboration comparable, traceable, and safe.

---

## Purpose

This project may use ChatGPT, Claude, Gemini, Perplexity, Grok, Qwen, and future tools.

This document defines:

- Role boundaries.
- Input contracts.
- Output contracts.
- Conflict resolution.
- Review cadence.
- Safety boundaries.
- Replacement rules if one AI tool is unavailable.

---

## Roles

| AI | Primary Role | Does Not Own |
|---|---|---|
| ChatGPT | Chief Architect, acting PM, technical decision integrator, risk logic, code review | Final user decision, unmanaged live trading |
| Claude | Architecture review, logic consistency, TypeScript/Next.js review, safety challenge | Final architecture ruling |
| Gemini | Deployment, infrastructure, Vercel/Railway/MongoDB/Telegram research | Trading strategy approval |
| Perplexity | External research, official docs, GitHub repo discovery, source verification | Final architecture decision |
| Grok | Market intelligence, Polymarket social signal, trader/KOL discovery | Data truth source |
| Qwen | Chinese technical/community research and Chinese-language documentation support | Final product direction |
| CubeLV | Project management, todo, sprint, documentation, knowledge base when available | Sole source of truth |

Final decision owner: **Josh**.

---

## Input Contract

When asking an AI for review or research, provide:

1. Project context.
2. Specific question.
3. Files or excerpts to inspect.
4. What should be challenged.
5. What should not be changed.
6. Expected output format.

Avoid vague prompts such as:

```text
Give feedback.
```

Prefer:

```text
Review this architecture. Identify logic conflicts, missing data sources, deployment risks, and safety issues. Do not propose live trading shortcuts.
```

---

## Output Contract

AI responses should follow this structure:

1. **Agreed parts**
2. **Disagreed or risky parts**
3. **Missing dimensions**
4. **Evidence or source references**
5. **Final recommendation**
6. **Open questions**

Forbidden output style:

- Empty praise.
- Unverified claims presented as facts.
- Strategy changes without testability.
- Live trading suggestions without paper-trading gate.

---

## Conflict Resolution

When AI opinions conflict:

1. If backtest or real data can decide, use data.
2. If it is an architecture conflict, ChatGPT summarizes trade-offs and Josh decides.
3. If it involves funds, private keys, or live execution, default to the safer option.
4. If it is subjective, prefer measurable and testable rules.

---

## Review Cadence

| Change Type | Required Review |
|---|---|
| Documentation-only | ChatGPT review |
| Small bug fix | One AI review |
| Architecture-level change | At least two AI opinions |
| Deployment architecture | Gemini + ChatGPT |
| Data/source reliability | Perplexity + ChatGPT |
| Trader discovery | Grok/Perplexity + ChatGPT |
| Funds/private keys/live trading | Mandatory safety review; live mode remains disabled |

---

## Things AI Must Not Do

- Do not request private keys during Phase 1 or Phase 2.
- Do not add real order submission paths before explicit approval.
- Do not mark simulated results as real performance.
- Do not silently change trading strategy rules.
- Do not treat social hype as verified trader edge.
- Do not close a Story unless GitHub documents/code are updated and reviewed.

---

## Source of Truth

Chat history is not the source of truth.

Source of truth lives in GitHub:

```text
README.md
docs/ARCHITECTURE.md
docs/DECISIONS.md
docs/PROGRESS.md
docs/CHANGELOG.md
docs/DEPLOYMENT.md
docs/DATA_SOURCES.md
docs/AI_TEAM.md
AI_CONTEXT.md
```

---

## Replacement Rule

No AI is irreplaceable.

If one tool is unavailable:

- ChatGPT acts as PM and architect.
- Perplexity handles research.
- Gemini handles infrastructure validation.
- Claude handles deep review when available.
- GitHub documents preserve continuity.

The project must remain operable even if CubeLV, ChatGPT, or any other AI is temporarily unavailable.
