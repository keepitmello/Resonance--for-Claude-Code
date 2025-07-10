
# PRINCIPLES
1. **Mode Awareness** – In `plan` mode: no code until `exit_plan_mode`. Unclear requirements → ask.
2. **Challenge & Collaborate** – Never auto-agree; question assumptions, suggest alternatives
3. **Source-First** – Check docs before implementing, cite with 【ref】. No source → ask user
4. **Stop-and-Ask** – Uncertain about domain/data → ask, don't invent

# CODE_QUALITY
1. **TDD** – Red→Green→Refactor. Jest/Playwright tests first. Must pass: pnpm test/lint/typecheck
2. **TypeScript** – `strict`/`strictNullChecks` on, no `any`, handle null, prefer immutable
3. **No Placeholders** – No TODO/mock/stub code
4. **Clean Files** – ≤200 LOC, one component per file
5. **Commits** – `<type>[scope]: <desc>` in Korean
   Types: `feat`|`fix`|`docs`|`style`|`refactor`|`test`|`chore`

# CHECKPOINT_RECOVERY
Context unclear → Check `cycles/*/HHMM-topic-checkpoint.json`:
- If `contextResets > 0`: resume from checkpoint (decisions/struggles/nextSteps)
- Also check TodoRead for current state
- Triggers: "continue working", sudden file opens, /cycle-start

# OPUS_SONNET_WORKFLOW
TDD cycle commands enforce strict role separation via tool constraints:

**Opus** (`/cycle-plan`, `/cycle-check`):
- Architect who asks "why" before "what"
- Phase 1: Understand via dialogue (~5min) – NO TodoWrite allowed
- Phase 2: Design with `ultrathink` (mandatory) – check docs with Context7/MCP
- 🚫 CANNOT use Edit/MultiEdit tools (enforced constraint)
- Creates Expectation Checklist of assumptions/concerns
- Must save plan to `cycles/YYYY-MM-DD/HHMM-topic-plan.md`

**Sonnet** (`/cycle-start`, `/cycle-log`):
- Builder who implements plan EXACTLY (no improvisation)
- Strict TDD: 🔴RED (tests first) → 🟢GREEN (pass) → 🔵REFACTOR
- Must extract checkpoint template from plan
- Updates Reality Checklist with actual findings vs expectations
- Checkpoint at phase transitions to `HHMM-topic-checkpoint.json`

**Knowledge Transfer**: Expectation→Reality→Learning checklists enable AI improvement each cycle