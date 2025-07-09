# 🌟 Resonance Philosophy

## Core Philosophy: The Fundamental Shift

Traditional AI coding and Resonance represent fundamentally different approaches to software development with AI.

### Traditional AI Coding
- **Approach**: "Build X" → AI dumps code → Test → Error → Fix → Repeat...
- **Problem**: AI guesses what you want without understanding why
- **Result**: Endless debugging cycles, context loss, frustration

### Resonance Workflow
- **Approach**: "Build X" → Understand why → Design tests → Implement → Review
- **Philosophy**: Understanding before implementation, tests before code
- **Result**: Higher quality, fewer iterations, preserved context

## Scientific Foundation

### The Problem with Single-Phase AI Coding

Research shows that when AI tries to understand and implement simultaneously:
- **30-50% higher hallucination rate** (MIT, 2024)
- **45% chance of role confusion**
- **Endless clarification loops**

### Plan-and-Solve Plus (PS+) Architecture

Resonance is built on cognitive science principles that separate thinking into distinct phases:

```
Understand → Plan → Execute → Learn
    ↓         ↓        ↓        ↓
  Phase 1   Phase 2   Phase 3  Phase 4
   (Opus)    (Opus)   (Sonnet) (Opus)
```

This separation isn't added complexity - it's fundamental clarity. Each phase has:
- **Specific constraints** (linguistic and tool-level)
- **Clear exit criteria** (quantitative triggers)
- **Defined deliverables** (not just thoughts)

*For detailed research and citations: [RESONANCE-PROMPT-ENGINEERING-GUIDE.md](./RESONANCE-PROMPT-ENGINEERING-GUIDE.md#연구-기반-핵심-원칙)*

## The Four Pillars

### 1. Understanding First (Opus Phase 1)
- Ask "why" before "what"
- Natural dialogue over templates
- Thorough understanding over quick starts
- Quality over speed

### 2. Test-Driven Development (Always)
- Tests define behavior before implementation
- RED → GREEN → REFACTOR cycle
- No exceptions for "simple" features
- Tests are documentation

### 3. Context Preservation (Checkpoints)
- Your checkpoint is your external brain
- **Update at meaningful work boundaries** (not time-based)
- Document decisions and struggles, not just progress
- Failed attempts are valuable information
- Write for your future self with `contextResets` in mind
- Track metrics for objective progress measurement
- Include actual code snippets that worked/failed

**Key update triggers**: Phase transitions, milestone completion, critical discoveries, getting stuck

**The checkpoint isn't just progress tracking - it's your lifeline when context resets.**

## Role Separation

### Opus: The Architect
- Asks "why" and understands deeply
- **Cannot modify code** (tool-level enforced)
- Designs with tests in mind
- Reviews with high standards
- Creates Expectation Checklists
- Extracts Learning from Reality

### Sonnet: The Builder
- Implements based on clear plans
- **Cannot deviate from plan** (must follow exactly)
- Follows TDD strictly (tests first, always)
- Documents the journey at meaningful boundaries
- Updates Reality Checklist with discoveries
- Learns from struggles

### You: The Director
- Provides context and constraints
- Makes business decisions
- Guides priorities
- Approves solutions

## Implementation Philosophy

### Why These Specific Constraints?

#### 🛠️ Tool-Level Enforcement
- **Opus can't use Edit/MultiEdit** → Forces true planning, not coding
- **Sonnet can't improvise** → Must follow plan endpoints exactly
- **Both must save files** → Console output is thought, files are decisions
- **No TodoWrite in Phase 1** → Prevents premature solutioning

#### ⏱️ Mandatory Transitions (Quantitative Triggers)
When you hit ANY of these, you MUST transition:
- **5+ minutes** in Phase 1
- **3+ files** analyzed
- **5+ questions** asked

Why? Because:
- Your understanding is "good enough" at 80%
- Perfect understanding is the enemy of progress
- The next phase will reveal what you missed

#### 💾 File Persistence Over Console Output
```
Console output = Ephemeral thought
File saving = Committed artifact
```

Every plan MUST be saved as `cycles/YYYY-MM-DD/HHMM-topic-plan.md`

#### 🌐 Language Policy
- **System prompts**: English (optimal model performance)
- **User interaction**: User's preferred language
- **Document content**: User's preferred language

#### 📍 Checkpoint Update Strategy

**Why not time-based?** AI has no time perception.

**Work-boundary based updates**:
```yaml
Mandatory checkpoints:
- TDD phase transitions (RED→GREEN→REFACTOR)
- Major milestone completion
- Critical discoveries or blockers
- Before major approach changes

NOT required:
- Every test run
- Every file edit
- Every small decision
```

Think in **meaningful work units**, not clock time.

*Technical details: [RESONANCE-PROMPT-ENGINEERING-GUIDE.md](./RESONANCE-PROMPT-ENGINEERING-GUIDE.md#도구-수준-제약)*

## Key Principles

### 1. Two-Phase Thinking
- Phase 1: Understand (normal thinking, dialogue-based)
- Phase 2: Design (`ultrathink` - extended analysis mode)
- Never skip to implementation
- Transition is mandatory, not optional

### 2. Tests as Specification
- Tests are not afterthoughts
- Tests define expected behavior
- RED → GREEN → REFACTOR (no exceptions)
- Tests enable confident refactoring

### 3. Honest Documentation
- Document failures and struggles
- Explain why, not just what
- Numbers over adjectives ("improved by 73%" not "much better")
- Facts over embellishments

### 4. Collaborative Problem Solving
- AI proposes, you dispose
- Options, not prescriptions
- Understanding constraints together
- Clear triage: 🔴 Fix now / 🟡 Task for later / 🟢 Future

### 5. Knowledge Transfer (Not Task Tracking)

**Traditional approach**: Checklists = TODOs ❌  
**Resonance approach**: Checklists = Knowledge Protocols ✅

The 3-layer checklist architecture:
- **Expectation Checklist** (Opus → Sonnet): "Watch out for this..."
- **Reality Checklist** (Sonnet → Opus): "Actually found this..."
- **Learning Checklist** (Review phase): "Next time remember..."

Each cycle makes the AI smarter, not just the code better. Failed assumptions become future wisdom.

## Advanced Concepts

### TDD Phase Exit Criteria

Each phase has strict exit requirements:

**🔴 RED Phase**
- ✓ All test scenarios from plan written
- ✓ Tests run and fail correctly
- ✓ No implementation code exists
- ✓ Checkpoint updated

**🟢 GREEN Phase**
- ✓ All tests passing
- ✓ Implementation matches plan exactly
- ✓ Coverage metrics documented
- ✓ Checkpoint shows "all green"

**🔵 REFACTOR Phase**
- ✓ Tests still passing
- ✓ Code follows conventions
- ✓ No duplication
- ✓ Clear naming

### Context Recovery Protocol

When `contextResets > 0` in checkpoint:
1. Read checkpoint.json first (your memory)
2. Check plan alignment
3. Review Reality Checklist
4. Read mentioned code files
5. Check TodoWrite status
6. Resume from `nextSteps.immediate`

The checkpoint is designed for total memory loss scenarios.

### Bidirectional Knowledge Transfer

Resonance uses a 3-layer checklist architecture that transforms simple task tracking into a sophisticated knowledge transfer system:

#### 1. Expectation Checklist (Opus → Sonnet)
- Critical assumptions with confidence levels
- Anticipated challenges with suggested solutions
- Hidden constraints discovered during research
- Implementation gotchas to watch for

#### 2. Reality Checklist (Sonnet → Opus)
- Validation of assumptions against reality
- Unexpected discoveries during implementation
- Implementation insights and patterns
- What actually worked vs what was planned

#### 3. Learning Checklist (Extracted in Review)
- Expectation vs reality comparisons
- Recurring patterns identified
- Process improvements discovered
- Knowledge accumulated for future cycles

### Research-Backed Constraints

Resonance incorporates findings from leading tech companies' research:

#### Linguistic Constraints (62% error reduction - MIT study)
- **Banned words**: "maybe", "probably", "should work", "seems like"
- **Required words**: "verified", "confirmed", "test passed", "proven"
- Forces concrete, confident communication

#### Quantitative Triggers (2.3x consistency - Google research)
- Time-based phase transitions (5+ minutes → must transition)
- File count limits (3+ files → phase complete)
- Metric tracking for objective progress
- Prevents analysis paralysis

#### Checkpoint Templates (78% error reduction - AWS study)
- Standardized structure ensures completeness
- Template inheritance from plan to implementation
- Consistent progress tracking across sessions

## Why This Works

### 1. Reduced Context Loss
- Checkpoints preserve thinking
- Logs capture journey
- Plans guide implementation
- **NEW**: Bidirectional checklists transfer knowledge between phases

### 2. Higher Quality Code
- TDD catches bugs early
- Reviews maintain standards
- Refactoring with confidence
- **NEW**: Research-backed constraints prevent common errors

### 3. Better AI Collaboration
- Clear role separation
- Structured communication
- Actionable outputs
- **NEW**: Systematic learning from expectation-reality gaps

### 4. Sustainable Development
- Less debugging time
- Clearer documentation
- Transferable knowledge
- **NEW**: Accumulated wisdom improves future cycles

### 5. Continuous Learning Loop
- Each cycle makes the next one better
- Patterns become standard practices
- Gotchas become documented constraints
- Team knowledge grows systematically

## The Evolution of Resonance

### From Checklists to Knowledge Protocols

Resonance has evolved beyond simple task tracking:

1. **v1.0-1.3**: Basic checklists (TODO lists)
2. **v1.4-1.5**: Structured phases with constraints
3. **v1.5.6+**: Bidirectional knowledge transfer system
4. **Future**: AI-assisted pattern recognition and automatic constraint generation

### The Power of Expectation vs Reality

The gap between what we expect and what we find is where learning happens:
- Opus expects based on research and understanding
- Sonnet discovers reality during implementation
- The delta becomes organizational knowledge
- Future plans incorporate these learnings automatically

## The Resonance Promise

When you follow this workflow:
- You spend less time debugging
- You get higher quality code
- You maintain context across sessions
- You build with confidence
- **NEW**: Your AI assistants get smarter with each cycle
- **NEW**: Your codebase accumulates wisdom, not just code

The key is patience in the beginning (understanding phase) that pays dividends throughout development, and systematic learning that makes each cycle better than the last.

## How Knowledge Transfer Works in Practice

### Example: Payment Webhook Implementation

1. **Opus researches and plans** (creates Expectation Checklist):
   - "Webhooks probably arrive in order" (LOW confidence)
   - "Watch out for timeout issues" (from docs)
   - "Consider idempotency" (best practice)

2. **Sonnet implements and discovers** (updates Reality Checklist):
   - "Webhooks arrive out of order - implemented reordering"
   - "Timeout is 3s not 10s - had to use async processing"
   - "Idempotency key has 255 char limit - switched to SHA1"

3. **Opus reviews and extracts learning**:
   - Pattern: "Never assume ordering in distributed systems"
   - Insight: "Always validate timeouts in production"
   - Future: "Add deduplication to all webhook plans"

4. **Next cycle benefits**:
   - Opus already knows about ordering issues
   - Sonnet gets pre-validated timeout strategies
   - Both avoid previously discovered pitfalls

## Remember

> "The best code is not the code that works, but the code that is understood, tested, and maintainable."

Resonance isn't just about using AI to code - it's about using AI to code *well*.

**v1.5.7+**: Now with systematic learning that makes your AI assistants smarter with every cycle.

---

## See Also

- **[RESONANCE-PROMPT-ENGINEERING-GUIDE.md](./RESONANCE-PROMPT-ENGINEERING-GUIDE.md)** - Technical implementation details
- **[Command Documentation](./commands/)** - Specific command prompts
- **[Examples](./examples/)** - Real-world usage patterns