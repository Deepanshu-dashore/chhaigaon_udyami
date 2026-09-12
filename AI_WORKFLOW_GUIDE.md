# 🤖 AI Agent & Automation Workflow Guide (Chhaigaon Udyami)

This document explains all AI automation frameworks, plugins, and loop scripts configured in this repository, along with step-by-step instructions on how to use them.

---

## 📑 Summary of Tools Configured

| Tool | Purpose | Primary Location | Execution Method |
| :--- | :--- | :--- | :--- |
| **Ralph Autonomous Loop** | Runs autonomous iterative loops until all tasks in `prd.json` pass quality gates and get committed. | `scripts/ralph/` | PowerShell (`ralph.ps1`) or Bash (`ralph.sh`) |
| **GSD (Get Stuff Done)** | Structured software delivery framework (Discovery → Planning → Phased Execution → Verification). | `.planning/` | Chat Slash Commands (`/gsd-...`) |
| **Ponytail Plugin & Rules** | "Lazy Senior Dev" engineering mindset: minimalist code, zero bloat, native platform & stdlib first. | `.agents/rules/ponytail.md` | Always-on rule & Chat Commands (`/ponytail-...`) |

---

## 1. 🔄 Ralph Autonomous AI Loop

### What Was Set Up
- **[`scripts/ralph/ralph.ps1`](file:///e:/Repository/chhaigaon_udyami/chhaigaon_udyami/scripts/ralph/ralph.ps1)**: Native Windows PowerShell runner for the Ralph loop.
- **[`scripts/ralph/ralph.sh`](file:///e:/Repository/chhaigaon_udyami/chhaigaon_udyami/scripts/ralph/ralph.sh)**: Bash runner for Git Bash / WSL / Linux.
- **[`scripts/ralph/CLAUDE.md`](file:///e:/Repository/chhaigaon_udyami/chhaigaon_udyami/scripts/ralph/CLAUDE.md)**: Autonomous agent instructions tailored for Claude Code CLI.
- **[`scripts/ralph/prompt.md`](file:///e:/Repository/chhaigaon_udyami/chhaigaon_udyami/scripts/ralph/prompt.md)**: Agent instructions for Amp.
- **[`scripts/ralph/prd.json`](file:///e:/Repository/chhaigaon_udyami/chhaigaon_udyami/scripts/ralph/prd.json)** & **[`prd.json`](file:///e:/Repository/chhaigaon_udyami/chhaigaon_udyami/prd.json)**: Feature specification with prioritized user stories.
- **[`scripts/ralph/progress.txt`](file:///e:/Repository/chhaigaon_udyami/chhaigaon_udyami/scripts/ralph/progress.txt)**: Shared memory log where learnings and codebase patterns persist across iterations.

### How Ralph Operates
1. Picks the highest priority story where `"passes": false` from `prd.json`.
2. Implements the feature, writing clean TypeScript and Tailwind code.
3. Runs validation checks: `npx tsc --noEmit` and `npm run lint`.
4. Commits git changes once all checks pass.
5. Updates `prd.json` to mark `"passes": true` and logs learnings into `progress.txt`.
6. Repeats for the next story until all pass or max iterations are reached.

### How to Run Ralph
**In Windows PowerShell:**
```powershell
.\scripts\ralph\ralph.ps1 -Tool claude -MaxIterations 10
```

**In Git Bash / WSL:**
```bash
bash scripts/ralph/ralph.sh --tool claude 10
```

---

## 2. 📋 GSD (Get Stuff Done) Planning Framework

### What Was Set Up
- **[`.planning/PROJECT.md`](file:///e:/Repository/chhaigaon_udyami/chhaigaon_udyami/.planning/PROJECT.md)**: High-level mission, core capabilities, and stakeholder overview.
- **[`.planning/ROADMAP.md`](file:///e:/Repository/chhaigaon_udyami/chhaigaon_udyami/.planning/ROADMAP.md)**: Phased feature roadmap for milestone v1.0.
- **[`.planning/STATE.md`](file:///e:/Repository/chhaigaon_udyami/chhaigaon_udyami/.planning/STATE.md)**: Current execution state and active focus.
- **[`.planning/codebase/`](file:///e:/Repository/chhaigaon_udyami/chhaigaon_udyami/.planning/codebase/)**:
  - `STACK.md` — Frameworks, libraries, and runtime specifications.
  - `ARCHITECTURE.md` — Component boundaries, server/client model, and auth flow.
  - `STRUCTURE.md` — Directory index and layer descriptions.
  - `CONVENTIONS.md` — Coding standards and TypeScript guidelines.
  - `INTEGRATIONS.md` — Supabase, Razorpay, and VdoCipher configurations.
  - `CONCERNS.md` — Technical watchlists and caveats.

### How to Use GSD in Antigravity Chat
Type any of these commands directly into the AI chat:

| Command | Action |
| :--- | :--- |
| `/gsd-plan-phase` | Generates a detailed step-by-step plan (`PLAN.md`) for the next phase in `ROADMAP.md`. |
| `/gsd-execute-phase` | Autonomously executes all tasks in the active plan with unit/type verification. |
| `/gsd-progress` | Reviews current progress and updates `STATE.md`. |
| `/gsd-code-review` | Runs a multi-agent review on modified files for bugs and quality issues. |
| `/gsd-verify-work` | Interactive verification and UAT checklist. |

---

## 3. ✂️ Ponytail Plugin & Always-On Rule

### What Was Set Up
- **Always-on Rule**: [`.agents/rules/ponytail.md`](file:///e:/Repository/chhaigaon_udyami/chhaigaon_udyami/.agents/rules/ponytail.md)
  - Automatically guides Antigravity to write the simplest, cleanest solution that works.
  - Enforces YAGNI (You Aren't Gonna Need It), native platform APIs before new packages, and shortest working diffs.
- **Ponytail Skills**: Registered globally in `~/.gemini/config/skills/` and `~/.gemini/config/plugins/ponytail/`.

### How to Use Ponytail in Chat
Type any of these slash commands into the chat window:

| Command | Action |
| :--- | :--- |
| `/ponytail` | Change intensity mode: `/ponytail lite`, `/ponytail full` (default), or `/ponytail ultra`. |
| `/ponytail-review` | Reviews recent diffs specifically hunting for over-engineering, unneeded abstractions, or bloat. |
| `/ponytail-audit` | Scans the full codebase for dead code, unused helpers, or code deletion opportunities. |
| `/ponytail-debt` | Generates a ledger of all `// ponytail:` deferred shortcuts in the project. |
| `/ponytail-gain` | Displays a summary of lines saved and complexity reduced. |
| `/ponytail-help` | Shows the quick reference cheat-sheet. |

---

## 🚀 Recommended Day-to-Day Workflow

1. **Plan & Structure with GSD**:
   - Ask in Chat: `/gsd-plan-phase` to break a feature milestone into concrete atomic steps.
2. **Execute Cleanly with Ponytail**:
   - The `.agents/rules/ponytail.md` rule keeps all generated code minimal, standard-library first, and free of unnecessary dependencies.
3. **Run Batch / Overnight Loops with Ralph**:
   - When you have a batch of user stories in `prd.json`, launch:
     ```powershell
     .\scripts\ralph\ralph.ps1 -Tool claude 10
     ```
   - Ralph will work through each story, run test checks, commit passing work, and record lessons in `progress.txt`.
