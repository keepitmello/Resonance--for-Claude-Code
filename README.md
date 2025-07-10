# 🚀 Resonance™ for Claude Code

> **⚠️ IMPORTANT UPDATE (January 8, 2025)**: Version 1.4.0 released! Major improvements to command structure. Update with `npm update -g claude-resonance` or use `npx claude-resonance` for the latest version.

> Lost context from Auto-Compact? Stuck in endless bug fixing?  
> **Solve it with the systematic Resonance™ workflow.**

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Made with Claude](https://img.shields.io/badge/Made%20with-Claude-purple.svg)](https://claude.ai)
[![Resonance](https://img.shields.io/badge/Resonance-for%20Claude%20Code-blue.svg)](https://github.com/keepitmello/Resonance--for-Claude-Code)

**Opus-Sonnet-and You, 3-person collaboration system.**

[English](./README.md) | [한국어](./README-ko.md) | [Philosophy](./PHILOSOPHY.md) | [Prompt Engineering Guide](./RESONANCE-PROMPT-ENGINEERING-GUIDE.md) | [Documentation](./docs/README.md)

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
Opus: "Real money is involved here, we need to be careful.
What happens if the same payment gets processed twice?"
You: "Uh... does that happen?"
Opus: "Often, especially with network retries.
Also, what about refunds and partial cancellations?"

[After gathering sufficient information...]

Opus: "Great, I understand completely now!
Enter 'ultrathink' for detailed design."
You: "ultrathink"

[Phase 2: Deep analysis...]

Opus: "Analysis complete! Here's the design:

🧪 Test Scenarios (5)
1. Normal payment flow
2. Duplicate request prevention (idempotency key)
3. Network timeout handling
4. Partial refund validation
5. Webhook failure retry

🏗️ Implementation Strategy
- Abstract with PaymentService interface
- DB transactions for consistency
- Error logging and monitoring

Plan saved to cycles/2025-07-08/1430-payment-api-plan.md!"
```

</td>
</tr>
</table>

## 📚 Understanding Resonance

For a deeper understanding of the Resonance philosophy and how it fundamentally differs from traditional AI coding, see our [Philosophy Documentation](./PHILOSOPHY.md).

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

## 🌟 What's New in v1.4.0

- **Principle-Driven Design**: Commands now focus on core principles rather than rigid templates
- **Separated Examples**: All examples moved to `examples/` folders for cleaner, more flexible guidelines
- **Enhanced Korean Support**: Korean version now uses English system prompts for better performance
- **Philosophy Documentation**: Added [PHILOSOPHY.md](./PHILOSOPHY.md) explaining the core concepts

## 🚀 Quick Installation

### ⚡ NPM Package

**Option 1: Direct execution (no installation)**
```bash
npx claude-resonance
```

**Option 2: Global installation (recommended)**
```bash
# Install globally
npm install -g claude-resonance

# Run installation
resonance
```

Choose your language during installation (English/한국어).

> **npx vs npm -g:**
> - `npx`: Downloads and runs latest version each time (slower, always up-to-date)
> - `npm -g`: Installs once, runs faster (need to update manually)

**System Requirements:**

- **macOS only** (tested on macOS 15.5+)
- **Claude Code** installed in standard location (`~/.claude/`)
- Terminal with npm/npx access

### 🔧 Manual Installation (Alternative)

#### macOS

```bash
# Clone the repository
git clone https://github.com/keepitmello/Resonance--for-Claude-Code.git
cd Resonance--for-Claude-Code

# Install and activate
./activate-simple.sh
```

#### Windows (WSL)

**Important**: Run all commands inside WSL terminal, not PowerShell or CMD.

```bash
# Open WSL terminal (Ubuntu/Debian recommended)
# Clone the repository
git clone https://github.com/keepitmello/Resonance--for-Claude-Code.git
cd Resonance--for-Claude-Code

# Copy command files to Claude Code directory
# For English:
cp commands\(en\)/*.md ~/.claude/commands/

# For Korean:
cp commands\(ko\)/*.md ~/.claude/commands/

# Restart Claude Code
```

### 🚨 Compatibility Notes

- **macOS**: Full automatic installation support
- **Windows**: Manual installation only (must use WSL)
- **Linux**: Manual installation (coming soon)
- **Requires Claude Code** to be installed in `~/.claude/commands/`
- Installation script automatically backs up existing files (macOS only)

## 🚀 How to Use

**📌 Important: You need to open 2 Claude Code sessions**

- Session 1: Opus mode (planning/review)
- Session 2: Sonnet mode (implementation)

### 🎯 Auto-open Both Sessions

After installation, automatically open both sessions:
```bash
resonance-start
```

Or run without installation using npx:
```bash
npx -p claude-resonance resonance-start
```

This command automatically opens Opus and Sonnet sessions in separate terminals!

### 📝 Manual Setup

After installation, you need to open two separate terminals:

1. Open first terminal and run:
   ```bash
   claude --model opus
   ```

2. Open second terminal and run:
   ```bash
   claude --model sonnet
   ```

Then start the Resonance workflow with these commands:

### 📝 /cycle-plan (Opus Session)

Opus session actively communicates with users, asks sufficient questions, analyzes thoroughly, then establishes plans with documentation and creates checkpoints. By designing with Test-Driven Development approach, it induces primarily validated code unlike conventional AI coding.

```bash
opus> /cycle-plan "implement payment API"
# Phase 1: Understand requirements through dialogue
# Enter "ultrathink" to proceed to Phase 2
# Phase 2: Deep analysis and TDD planning
# Saves to cycles/YYYY-MM-DD/HHMM-topic-plan.md
```

### 🔨 /cycle-start (Sonnet Session)

Sonnet session, based on Opus's design, develops like a junior developer - filling checkpoints with 'judgments' about why implemented that way, what parts were difficult or ambiguous. Even when Auto-Compact occurs, context is not lost thanks to separate checkpoints.

```bash
sonnet> /cycle-start
# Reads plan.md and starts TDD implementation
# Creates/updates checkpoint.json
# Records detailed progress every 20-30 minutes
```

### 📋 /cycle-log (Sonnet Session)

Document what you did, why you made certain decisions, and what you learned as you wrap up implementation work. This log becomes crucial material for the next Opus planning session.

```bash
sonnet> /cycle-log
# Document completed work
# Record technical decisions and reasoning
# Share failures and successes
# Saves to cycles/YYYY-MM-DD/HHMM-topic-log.md
```

### ✅ /cycle-check (Opus Session)

Once work is completed, return to Opus session to review whether it proceeded well according to the initial design and check if any additional work is needed.

```bash
opus> /cycle-check
# Reviews Sonnet's implementation
# Critical code quality analysis
# Provides improvement feedback
```

### 📝 /wrap (Either Session)

Manually wrap up your work session with a comprehensive log and commit all changes together. This command is useful when you want to conclude your work without going through the full cycle workflow.

```bash
# In any session (Opus or Sonnet)
> /wrap
# Creates comprehensive work session log
# Documents all accomplishments and changes
# Commits everything in a single clean commit
# Saves to cycles/YYYY-MM-DD/HHMM-topic-wrap.md
```

Use this when:
- Finishing a work session outside of the cycle workflow
- Need to commit all work with proper documentation
- Want to create a session summary for future reference

## 🤝 Real Collaboration, Not Templates

<details>
<summary>Example 1: React Context Performance Issue Resolution</summary>

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
<summary>Example 2: 🔥 Production Bug: 4-Hour Complete Recovery</summary>

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
# Quick start (no installation)
npx claude-resonance

# Or install globally for frequent use
npm install -g claude-resonance
resonance
```

**⚠️ macOS only** | Requires Claude Code in `~/.claude/`

In each Claude Code session:

```
# Session 1 (In Opus session)
/cycle-plan

# Session 2 (In Sonnet session)
/cycle-start

/cycle-log

# Session 1 (Back to Opus session)
/cycle-check
```

Opus asks questions, understands deeply, and creates plans.
Sonnet implements with tests. Rich work logs maintain context.

---

<div align="center">

### Improve your work quality with systematic AI TDD workflow.

[⭐ Star us on GitHub](https://github.com/keepitmello/Resonance--for-Claude-Code) | [🐦 Share on Twitter](https://twitter.com/intent/tweet?text=Just%20discovered%20Resonance%20for%20Claude%20Code%20-%20AI%20that%20asks%20questions%20first%2C%20writes%20tested%20code%2C%20and%20never%20forgets!%20Game%20changer%20for%20%23AIcoding%20%F0%9F%9A%80&url=https%3A%2F%2Fgithub.com%2Fkeepitmello%2FResonance--for-Claude-Code)

</div>
