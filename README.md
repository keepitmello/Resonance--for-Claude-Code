# 🚀 Resonance™ for Claude Code

> Lost context _again_? AI generated untested code? Can't remember what you worked on yesterday?  
> **There's a better way.**

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Made with Claude](https://img.shields.io/badge/Made%20with-Claude-purple.svg)](https://claude.ai)
[![Resonance](https://img.shields.io/badge/Resonance-for%20Claude%20Code-blue.svg)](https://github.com/yourusername/resonance)

**Finally, AI that asks questions first, writes tested code, and never forgets.**

[English](./README.md) | [한국어](./README-ko.md) | [Documentation](./docs/README.md)

</div>

## 🔥 The Problem We All Face

Using Claude Code Plan → Act mode? You know this painful cycle:

- 💔 **20k Context Window**: Auto-Compact kicks in, erasing your initial design and degrading code quality
- 🔄 **Test-Fix Loop**: Get AI code → Test → Error → Request fix → Repeat infinitely...
- 🔍 **Lost Work History**: Previous work buried in chat history, impossible to reference
- 🤖 **AI Guesswork**: Dumps code without understanding your real needs, leading to endless revisions

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

### ✅ With AI TDD Workflow
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
Traditional AI Coding:                AI TDD Workflow:
┌─────────────────┐                  ┌─────────────────┐
│ You: "Build X"  │                  │ You: "Build X"  │
└────────┬────────┘                  └────────┬────────┘
         │                                     │
         ▼                                     ▼
┌─────────────────┐                  ┌─────────────────┐
│ AI: Here's code │                  │ Opus: Let me    │
│     (untested)  │                  │ understand...   │
└────────┬────────┘                  │ - What's X for? │
         │                           │ - Edge cases?   │
         ▼                           │ - Constraints?  │
   Hope it works?                    └────────┬────────┘
                                              │
                                              ▼
                                    ┌─────────────────┐
                                    │ You: [answers]  │
                                    └────────┬────────┘
                                              │
                                              ▼
                                    ┌─────────────────┐
                                    │ Opus: TDD Plan  │
                                    │ with ultrathink │
                                    └────────┬────────┘
                                              │
                                              ▼
                                    ┌─────────────────┐
                                    │ Sonnet: Tests   │
                                    │ First + Code    │
                                    └────────┬────────┘
                                              │
                                              ▼
                                    ┌─────────────────┐
                                    │ Opus: Review    │
                                    │ WITH you:       │
                                    │ - Code quality? │
                                    │ - Edge cases?   │
                                    │ - Better way?   │
                                    └────────┬────────┘
                                              │
                                              ▼
                                     Verified & Refined!
```

## 🤝 Real Collaboration, Not Templates

<details>
<summary>Example: React Context Performance Crisis</summary>

```
You: /cycle-plan "Add order book data to real-time trading system"

Opus: "Currently using one MarketDataContext for everything? 
Order books update dozens of times per second - every component will re-render."

You: "So what should I do?"

Opus: "What if we split the contexts?
- MarketDataContext: Prices (less frequent)
- OrderBookContext: Order book (very frequent)  
- TradingContext: Risk management (per-user)

Also, network delays might deliver stale data out of order."

[ultrathink activated...]

Opus: "OrderBookManager class to validate lastUpdateId sequence,
React.memo for render optimization."
```

**Real difference**: Simple feature addition → Architecture-level performance optimization

</details>

## 📸 Real Results

```bash
# 4-Hour Work Session
✅ 6 new files created, 2 modified  
✅ 100% test coverage (16 test cases)
✅ Commit: 10 files changed, 3,148 insertions
✅ Estimated 5 hours → Completed in 4 hours

All progress preserved in cycles/ directory with timestamps
```

## 🚨 Emergency Production Recovery

<details>
<summary>🔥 Production Bug: 4-Hour Complete Recovery</summary>

**Situation**: Deposit bug affecting 35 transactions, 19 users impacted

```bash
# 2:49 PM - User report: "My deposit was charged a fee"

opus> /cycle-plan "Emergency recovery"
Opus: "Checking DB with MCP... Found 35 cases. Pattern shows hourly batch job bug.
Recovery strategy:
1. admin_refund for compensation (preserve originals)
2. Real-time validation during recovery
3. Build prevention system"

sonnet> /cycle-start
✅ Created 35 admin_refund records
✅ Updated 19 accounts
✅ Completed $2,935 refunds

⚠️ Additional report: "Got double refund..."
🚀 Immediate fix: Found duplicate application bug, corrected

opus> /cycle-check  
Opus: "Implement prevention immediately"
✅ DB trigger blocks deposit+fee combinations
✅ Suspicious pattern real-time monitoring
✅ Admin action logging system
```

**Result**: 100% recovery in 4 hours + prevention system built  
**Difference**: Band-aid ❌ → Analysis→Recovery→Root cause solution ✅

</details>

## 📁 Never Lose Work Again

```
cycles/
├── 2024-01-07/
│   ├── 0900-payment-api-plan.md         # Morning: Opus understood your needs
│   ├── 0930-payment-api-checkpoint.json # Progress tracking with decisions
│   ├── 1030-payment-api-log.md          # What actually happened + lessons
│   ├── 1400-auth-refactor-plan.md       # Afternoon: Different task
│   └── 1430-auth-refactor-log.md        # Seamless context switch
└── 2024-01-08/
    └── 0900-payment-api-v2-plan.md      # Continue exactly where you left off
```

**Key**: When Auto-Compact erases context, checkpoint.json lets you resume exactly where you left off
- Completed tasks and ongoing work
- Decisions made and reasoning  
- Blockers encountered and attempted solutions
- Next steps and dependencies

**Result**: Never lose continuity, even across context resets

## 🚀 Beat the 20k Context Window Limit

<details>
<summary>How checkpoint.json enables infinite work sessions</summary>

```json
// Your lifeline when context resets:
{
  "currentContext": {
    "whatImDoing": "Implementing Redis-based rate limiter",
    "whyThisApproach": "Token bucket for burst handling",
    "keyFiles": ["src/middleware/rateLimit.ts"],
    "criticalCode": "const bucket = await redis.get(`limit:${userId}`)"
  },
  "decisions": [
    {"what": "Redis over in-memory", "why": "Distributed system"},
    {"what": "Token bucket", "why": "Handles bursts gracefully"}
  ],
  "nextSteps": {
    "immediate": "Add circuit breaker for Redis failures"
  }
}
```

**Result**: Claude hits 20k limit? No problem. New session reads checkpoint.json and continues EXACTLY where you left off. Days-long implementations become possible.

</details>

## 📊 Before vs After

<table>
<tr>
<td>

**Before**
- 🔄 Context lost 5-6x daily
- ❌ 40% untested code
- 🔍 30min finding yesterday's work
- 🤷 AI assumptions wrong 70%
- 😤 Constant frustration

</td>
<td>

**After 1 Week**
- ✅ Zero context loss
- ✅ 95% test coverage
- ✅ 5 sec to find any past work
- ✅ AI asks first, builds right
- 😌 Flow state maintained

</td>
</tr>
</table>

## 🚀 Start Now - Transform Your AI Workflow

```bash
# Option 1: NPM (One Command!)
npx claude-resonance

# Option 2: Manual Installation
git clone https://github.com/keepitmello/Resonance--for-Claude-Code.git
cd Resonance--for-Claude-Code
./activate-simple.sh
```

**⚠️ macOS only** | Requires Claude Code in `~/.claude/`

Then in Claude Code:
```
opus> /cycle-plan "your next task"
```

Opus will ask questions, understand deeply, and create a comprehensive plan.  
Sonnet will implement with tests first. Rich work logs maintain context.  
You'll never lose progress again.

---

<div align="center">

### Systematic AI TDD Workflow for Better Code Quality

[⭐ Star us on GitHub](https://github.com/yourusername/resonance) | [🐦 Share on Twitter](https://twitter.com/intent/tweet?text=Just%20discovered%20Resonance%20for%20Claude%20Code%20-%20AI%20that%20asks%20questions%20first%2C%20writes%20tested%20code%2C%20and%20never%20forgets!%20Game%20changer%20for%20%23AIcoding%20%F0%9F%9A%80&url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fresonance)

</div>