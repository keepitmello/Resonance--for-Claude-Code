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

## 🎯 Choose Your Version

This workflow comes in two flavors, choose based on your needs:

### 🎪 Simple Version
Perfect for developers who want to start immediately without complex Git setups.

- ✅ **No Git worktree knowledge required**
- ✅ **Works with standard branches**
- ✅ **Minimal setup**
- ✅ **Great for beginners**

[📖 Simple Version Guide](./versions/simple/README.md) | [🚀 Quick Start](./versions/simple/QUICKSTART.md)

### ⚡ Worktree Version
For power users who need parallel development and advanced Git features.

- ✅ **True parallel development**
- ✅ **Event-driven checkpoints**
- ✅ **Automatic Git commits**
- ✅ **Never lose context**

[📖 Worktree Version Guide](./versions/worktree/README.md) | [🚀 Quick Start](./versions/worktree/QUICKSTART.md)

## 🤔 Which Version Should I Use?

| Feature | Simple | Worktree |
|---------|---------|----------|
| **Setup Time** | 2 minutes | 10 minutes |
| **Git Experience Required** | Basic | Intermediate |
| **Parallel Work** | Sequential only | True parallel |
| **Context Preservation** | JSON checkpoints | Git + checkpoints |
| **Automatic Commits** | No | Yes |
| **Branch Switching** | Manual stashing | Clean switches |

## 🚀 Quick Installation

### NPM Package (Recommended) ⚡
```bash
# One-liner installation
npx @resonance/claude-commands

# Or install globally
npm install -g @resonance/claude-commands
resonance-install
```

### Manual Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/resonance.git
cd resonance

# For Simple version
./activate-simple.sh

# For Worktree version
./activate-worktree.sh

# Switch between versions anytime
./switch-version.sh
```

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
<summary>Example: Building a Rate Limiter</summary>

```
You: /cycle-plan "Add rate limiting"

Opus: "Rate limiting for what - API endpoints, user actions, or something else?"
You: "API endpoints"

Opus: "What's your current traffic like? Need Redis or can we use in-memory?"
You: "About 1000 req/sec, we have Redis"

Opus: "Per-user limits or global? What happens when limit is hit?"
You: "Per-user, return 429 with retry-after header"

Opus: "Should certain endpoints be exempt? Like health checks?"
You: "Oh good point, yes /health and /metrics"

[ultrathink activated...]

Opus: "Created comprehensive plan with:
- Token bucket algorithm 
- Redis-based distributed limiting
- Exempt endpoints configuration
- Test cases for burst scenarios
- Graceful degradation strategy"
```

**Notice:** Opus didn't assume. It asked. It understood. It planned WITH you.

</details>

<details>
<summary>Example: Code Review That Actually Helps</summary>

```
[After Sonnet implements the rate limiter...]

opus> /cycle-check

Opus: "Looking at the implementation... The token bucket works well, but I notice 
something. What happens if Redis goes down?"

You: "Oh, good catch. Maybe fallback to local limiting?"

Opus: "That could work, but then you might get inconsistent limits across 
servers. What's more important - staying within exact limits or keeping 
the service running?"

You: "Keeping it running, definitely"

Opus: "Then let's add a circuit breaker. When Redis fails, we temporarily 
allow more requests but log it. Also, I see the tests don't cover the 
race condition when two requests hit at exactly the same millisecond..."

[Creates tasks for Sonnet to address these issues]
```

**Not just "LGTM" - actual collaborative improvement.**

</details>

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

## 📸 See It In Action

<details>
<summary>🎬 Simple Version Demo</summary>

```bash
# Start a new cycle with Opus
opus> /cycle-plan "Add payment validation"
# → Creates a detailed TDD plan

# Switch to Sonnet for implementation
sonnet> /cycle-start
# → Reads the plan and starts coding with tests

# Back to Opus for review
opus> /cycle-check
# → Critical code review and improvements
```

</details>

<details>
<summary>🎬 Worktree Version Demo</summary>

```bash
# Opus creates plan with Git strategy
opus> /cycle-plan "Refactor authentication"
# → Creates plan + Git worktree setup

# Sonnet implements with automatic checkpoints
sonnet> /cycle-start
# → Every test/change creates a Git commit
# → Work in isolated worktree
# → Never lose progress

# Opus reviews with full Git history
opus> /cycle-check
# → Reviews code AND Git commit patterns
```

</details>

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

**Every decision, every struggle, every breakthrough - timestamped and preserved.**

Not buried in chat history. Not lost in context resets. Real files you can `grep`, `git blame`, and learn from.

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

## 🌟 Key Features

### Both Versions Share:
- 🧪 **True TDD**: Red-Green-Refactor with AI
- 🎭 **Dual AI Models**: Opus (architect) + Sonnet (builder)
- 📝 **Rich Documentation**: Every decision documented
- 🔄 **Continuous Integration**: Built-in quality checks
- 🌍 **i18n Support**: English and Korean
- 🔥 **Beat 20k Limit**: Continue working across context resets with checkpoint.json

### Worktree Version Adds:
- 🌳 **Git Worktrees**: Parallel development without stashing
- ⚡ **Event-driven Commits**: Automatic commits on test/change/discovery
- 🏷️ **Smart Tagging**: Milestone and solution tags
- 🔍 **Git-based Recovery**: Never lose context with Git history

## 📊 Real Results

### 📸 Actual 4-Hour Work Session
```bash
✅ 6 new files created, 2 modified  
✅ 100% test coverage (16 test cases)
✅ Commit: 10 files changed, 3,148 insertions
✅ Estimated 5 hours → Completed in 4 hours

All progress preserved in cycles/ directory with timestamps
```

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


## 🤝 Contributing

We love contributions! Whether it's:

- 🐛 Bug reports
- 💡 Feature requests
- 📖 Documentation improvements
- 🌍 Translations
- 🎨 UI/UX suggestions

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📜 License

MIT - see [LICENSE](./LICENSE) for details.

## 🙏 Acknowledgments

- Claude (Anthropic) for making this workflow possible
- The TDD community for methodology inspiration
- Git worktree contributors for the amazing tool
- Early adopters for invaluable feedback

## 📊 Before vs After

**Before**: Context loss → Test-fix infinite loop → Frustration  
**After 1 Week**: Context preserved → TDD completion → Flow state

## 🚀 Start Now - Transform Your AI Workflow

```bash
# Option 1: NPM (Recommended)
npx @resonance/claude-commands

# Option 2: Manual
git clone https://github.com/yourusername/resonance.git
cd resonance
./activate-simple.sh  # Start simple, upgrade later
```

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