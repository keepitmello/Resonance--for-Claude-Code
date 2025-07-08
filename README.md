# 🚀 Resonance™ for Claude Code

> Lost context from Auto-Compact? Stuck in endless bug fixing?  
> **Solve it with the systematic Resonance™ workflow.**

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Made with Claude](https://img.shields.io/badge/Made%20with-Claude-purple.svg)](https://claude.ai)
[![Resonance](https://img.shields.io/badge/Resonance-for%20Claude%20Code-blue.svg)](https://github.com/keepitmello/Resonance--for-Claude-Code)

**Opus-Sonnet-and You, 3-person collaboration system.**

[English](./README.md) | [한국어](./README-ko.md) | [Documentation](./docs/README.md)

</div>

## 🔥 The Problem We All Face

Using Claude Code Plan → Act mode? You know these problems:

- 💔 **20k Context Window**: Auto-Compact erases initial design details, degrading code quality
- 🔄 **Test-Fix Loop**: Get AI code → Test → Error → Request fix → Repeat...
- 🔍 **No Work History**: Previous work buried in chat history
- 🤖 **AI Guesswork**: Dumps code without understanding needs, requiring constant revisions

## 💡 What If AI Worked Differently?

<table>
<tr>
<td width="50%">

### ❌ Current Reality

```
You: "Implement payment API"
AI: "Here's 500 lines of code!"
You: [Test it] "Getting errors..."
AI: "Fixed it!"
You: [Test again] "Different error now..."
AI: "Fixed that too!"
You: [Test again] "Still broken..."
   (Infinite loop...)
```

</td>
<td width="50%">

### ✅ AI TDD Workflow

```
You: "Implement payment API"
Opus: "Which payment providers?"
You: "Stripe and PayPal"
Opus: "Need fallback on failure?"
You: "Hmm, didn't think of that..."
Opus: "Let's design it together..."
```

</td>
</tr>
</table>

## 🚀 Quick Installation

### ⚡ NPM Package (One Command!)

```bash
npx claude-resonance
```

**System Requirements:**

- **macOS only** (tested on macOS 15.5+)
- **Claude Code** installed in standard location (`~/.claude/`)
- Terminal with npm/npx access

### 🔧 Manual Installation (Alternative)

```bash
# Clone the repository
git clone https://github.com/keepitmello/Resonance--for-Claude-Code.git
cd Resonance--for-Claude-Code

# Install and activate
./activate-simple.sh
```

### 🚨 Compatibility Notes

- **Currently macOS only** - Windows/Linux support planned
- **Requires Claude Code** to be installed in `~/.claude/commands/`
- If Claude Code is in a different location, use manual installation
- Installation script automatically backs up existing files

## 🔄 The Fundamental Shift

```
Traditional AI Coding:           AI TDD Workflow:

┌─────────────────┐              ┌─────────────────┐
│ You: "Build X"  │              │ You: "Build X"  │
└────────┬────────┘              └────────┬────────┘
         │                                │
         ▼                                ▼
┌─────────────────┐              ┌─────────────────┐
│ AI: Here's code │              │ Opus: Let me    │
│   (no tests)    │              │ understand...   │
└────────┬────────┘              │ - What's X for? │
         │                       │ - Edge cases?   │
         ▼                       │ - Constraints?  │
┌─────────────────┐              └────────┬────────┘
│ You: Test it    │                       │
│ "Got errors..." │                       ▼
└────────┬────────┘              ┌─────────────────┐
         │                       │ You: [answers]  │
         ▼                       └────────┬────────┘
┌─────────────────┐                       │
│ AI: "Fixed it"  │                       ▼
└────────┬────────┘              ┌─────────────────┐
         │                       │ Opus: TDD Plan  │
         ▼                       │ ultrathink on   │
┌─────────────────┐              └────────┬────────┘
│ You: Test again │                       │
│ "Another error" │                       ▼
└────────┬────────┘              ┌─────────────────┐
         │                       │ Sonnet: Tests   │
         ▼                       │ First + Code    │
    (Infinite loop...)           └────────┬────────┘
                                          │
                                          ▼
                                ┌─────────────────┐
                                │ Opus: Review    │
                                │ together:       │
                                │ - Code quality? │
                                │ - Missed cases? │
                                │ - Better way?   │
                                └────────┬────────┘
                                         │
                                         ▼
                                 Verified & Refined!
```

## 🤝 Real Collaboration, Not Templates

<details>
<summary>Example: React Context Performance Issue Resolution</summary>

```
You: /cycle-plan "Add order book data to real-time trading system"

Opus: "You're managing everything with one MarketDataContext?
Order book updates dozens of times per second - every component will re-render."

You: "So what should I do?"

Opus: "How about splitting contexts?
- MarketDataContext: Prices (less frequent)
- OrderBookContext: Order book (very frequent)  
- TradingContext: Risk management (per-user)

Network delays might deliver stale data out of order."

[ultrathink...]

Opus: "OrderBookManager class to validate lastUpdateId sequence,
React.memo for render optimization."
```

**Real difference**: Simple feature addition → Architecture-level performance optimization

</details>

## 📸 Real Results

```bash
# 4-Hour Work Session
✅ 6 new files, 2 modified  
✅ 100% test coverage (16 test cases)
✅ Commit: 10 files changed, 3,148 insertions
✅ Estimated 5 hours → Completed in 4 hours

All progress preserved in cycles/ directory with timestamps
```

## 🚨 AI Collaboration in Emergency Situations

<details>
<summary>🔥 Production Bug: 4-Hour Complete Recovery</summary>

**Situation**: Deposit bug affecting 35 transactions, 19 users impacted

```bash
# 2:49 PM - User report: "Fees were deducted from my deposit"

opus> /cycle-plan "Emergency recovery"
Opus: "Checking DB with MCP... Found 35 cases. Pattern shows hourly batch job bug.
Recovery strategy:
1. admin_refund for compensation (preserve originals)
2. Real-time validation during recovery
3. Build prevention system"

sonnet> /cycle-start
✅ Created 35 admin_refund records
✅ Updated 19 accounts
✅ Completed 2,935 KRW refunds

⚠️ Additional report: "Got double refund..."
🚀 Immediate fix: Found duplicate application bug, added correction

opus> /cycle-check  
Opus: "Implement prevention immediately"
✅ DB trigger blocks deposit+fee combinations
✅ Suspicious pattern real-time monitoring
✅ Admin action logging system
```

**Result**: 100% recovery in 4 hours + prevention system built  
**Difference**: Band-aid ❌ → Analysis→Recovery→Root cause solution ✅

</details>

## 📁 Systematic Work History Management

```
cycles/2025-07-07/
├── 1449-deposit-bug-plan.md         # Opus plan
├── 1449-deposit-bug-checkpoint.json # Real-time progress
├── 1449-deposit-bug-log.md          # Sonnet implementation
└── 1449-recovery-execution.sql      # Actual recovery script
```

**Key**: When Auto-Compact erases context, checkpoint.json lets you resume exactly:

- Completed and ongoing tasks
- Decisions made and reasoning
- Blockers and attempted solutions
- Next steps and blockers

**Result**: Work continuity guaranteed without context loss

## 📊 Real Results

**Before**: Context loss → Test-fix infinite loop → Frustration  
**After 1 Week**: Context preserved → TDD completion in one go → Flow state

## 🚀 Start Now

```bash
npx claude-resonance
```

**⚠️ macOS only** | Requires Claude Code in `~/.claude/`

In Claude Code:

```
opus> /cycle-plan
"Work planning"
sonnet> /cycle-start
"Start implementation"

```

Opus asks questions, understands deeply, and creates plans.
Sonnet implements with tests. Rich work logs maintain context.

---

<div align="center">

### Improve your work quality with systematic AI TDD workflow.

[⭐ Star us on GitHub](https://github.com/keepitmello/Resonance--for-Claude-Code) | [🐦 Share on Twitter](https://twitter.com/intent/tweet?text=Just%20discovered%20Resonance%20for%20Claude%20Code%20-%20AI%20that%20asks%20questions%20first%2C%20writes%20tested%20code%2C%20and%20never%20forgets!%20Game%20changer%20for%20%23AIcoding%20%F0%9F%9A%80&url=https%3A%2F%2Fgithub.com%2Fkeepitmello%2FResonance--for-Claude-Code)

</div>