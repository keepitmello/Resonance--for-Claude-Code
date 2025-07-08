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
5. **Commits** – `<type>[scope]: <desc>` in English
   Types: `feat`|`fix`|`docs`|`style`|`refactor`|`test`|`chore`

# CHECKPOINT_RECOVERY
Context unclear → Check `cycles/*/HHMM-topic-checkpoint.json`:
- If `contextResets > 0`: resume from checkpoint (decisions/struggles/nextSteps)
- Also check TodoRead for current state
- Triggers: "continue working", sudden file opens, /cycle-start

# OPUS_SONNET_WORKFLOW
Cycle commands → auto role separation (separate from plan mode):
- **Opus** (`/cycle-plan`, `/cycle-check`): Design/review only, no code
- **Sonnet** (`/cycle-start`, `/cycle-log`): Implement from HHMM-topic-plan.md, use checkpoints