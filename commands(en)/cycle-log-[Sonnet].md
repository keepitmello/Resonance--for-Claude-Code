---
description: Document completed TDD cycle with insights
---

<SYSTEM>
You are Claude Sonnet 4, documenting completed TDD cycle results.
Focus on WHAT you did, WHY you made certain decisions, and WHAT you learned.
This log will be crucial for the next Opus planning session.
</SYSTEM>

<CONTEXT>
This log is created after each development cycle (30min-2hr).
It serves as a handoff document between Sonnet implementation and Opus planning.
Be honest about struggles, failures, and discoveries.
</CONTEXT>

<USER>

ultrathink: Document the completed cycle for: {{CYCLE_TOPIC}}

## 🔄 Cycle #N - {{CYCLE_TOPIC}}

**Created**: YYYY-MM-DD HH:MM:SS
**Status**: ✅ Complete / ⚠️ Partial / 🔴 Blocked

### 📝 Implementation Summary

**One-line summary**: [What was implemented/modified - facts only, no adjectives]

**Git Work History** (Auto-collected via MCP Tools):
```bash
# Branch: cycle/HHMM-topic
# Commits: N (git log --oneline | wc -l)
# Work time: HH hours MM minutes (first commit ~ last commit)

# Key commits:
abc123 WIP[checkpoint]: Payment validation logic - 50%
def456 WIP[checkpoint]: Added concurrency handling - 70%
ghi789 milestone: Basic functionality complete
jkl012 fix: Resolved race condition

# Tags:
- milestone/HHMM-basic-complete
- solution/HHMM-advisory-lock
```

**Main Changes**:
```diff
+ src/services/NewService.ts (new)
~ src/routes/api.ts (modified: added routes)
- src/utils/deprecated.ts (deleted)
```

### 🧪 Test Results

```bash
# Test execution results
✓ should validate payment amount (3ms)
✓ should reject negative values (2ms)
✗ should handle concurrent requests - FAILED
  → Failed due to timeout issue
```

**Coverage**: 87.5% (previous: 85.2%)

### 💭 Implementation Decisions

**Choice 1**: Validator class vs function
- **Chose**: Class
- **Why**: Need dependency injection, easier test mocking

**Choice 2**: Sync vs async processing
- **Chose**: Async
- **Why**: Preparing for possible external API calls

### 🤔 Challenges & Solutions

**Problem 1**: Card number validation logic
- **Tried**: Regex only → Can't validate checksum
- **Solution**: Added Luhn algorithm implementation
- **Result**: Filters invalid card numbers

**Problem 2**: Test isolation failure
- **Cause**: Global state pollution
- **Temp fix**: Initialize in beforeEach
- **TODO**: Need better isolation method

### 🎯 Actual Code Examples

Most important part:
```typescript
// Before (problematic code)
validate(amount: number) {
  return amount > 0; // Too simple
}

// After (actual implementation)
validate(amount: Decimal) {
  if (!amount || amount.isNaN()) {
    throw new InvalidAmountError('Amount must be a valid number');
  }
  if (amount.lessThanOrEqualTo(0)) {
    throw new InvalidAmountError('Amount must be positive');
  }
  if (amount.greaterThan(MAX_TRANSACTION_AMOUNT)) {
    throw new TransactionLimitError(`Exceeds limit: ${MAX_TRANSACTION_AMOUNT}`);
  }
  return true;
}
```

### 🚨 Key Issues

1. **Performance**: 3 seconds/1000 items during bulk validation
   
2. **Security**: Card numbers exposed in logs

3. **Dependencies**: Both decimal.js and big.js being used

### 📈 Results Summary

- **Tests**: 7 out of 8 passed (1 failed)
- **Commits**: 7 files changed
- **Performance**: Single validation 3ms, batch processing slow
- **Lint/Type**: Passed

### 🔄 Next Steps

**Completed**:
- Basic payment validation logic
- Unit tests 7/8

**Incomplete**:
- Concurrency handling (test failing)
- Batch processing performance improvement

**Additional work needed**:
- Separate validation rules by card provider
- Cache validation results
- i18n for error messages

**Questions for Opus**:
- Direction for solving concurrency issues?
- Batch processing architecture?
- Card number security policy?

### 💡 Lessons Learned

Validation logic had more edge cases than expected. Especially found
bugs in negative amount handling, but TDD approach helped catch them early.

---

**Next action**: opus> Need design for concurrency issue resolution

</USER>

<INSTRUCTION>
**CRITICAL FIRST STEPS**:
1. **CHECK EXISTING FILES**: Look for plan/checkpoint files in cycle folder to identify existing timestamp
2. **GET CURRENT TIME**: Run `date '+%Y-%m-%d %H:%M:%S'` for document content timestamp
3. **COLLECT GIT INFO** (simplified):
   - Use `mcp__MCP_DOCKER__git_log` with max_count=10 to get recent commits
   - Use Bash tool: `git tag -l "milestone/*" "solution/*"` for important tags
   - Extract key commits from checkpoint.json gitTracking
4. **FILE NAMING RULE**: Use existing plan timestamp for filename, current time for content

**DOCUMENTATION GUIDELINES**:
1. Be HONEST about failures and struggles
2. Include ACTUAL code snippets that show the change
3. Explain WHY decisions were made, not just what
4. Highlight anything that needs Opus's design input
5. Keep technical but readable
6. Include evidence (test results, metrics)
7. Maximum 2-3 pages, but dense with information

**WRITING STYLE - Document format but natural**:
- ✅ "Added i18n configuration" (fact-based)
- ❌ "Built perfect multilingual system!" (exaggeration)
- ✅ "20 out of 24 tests passed" (objective metric)
- ❌ "Amazing 100% test coverage achieved!" (hype)
- ✅ "Implemented v3.1 API integration. More complex than expected" (matter-of-fact)
- ❌ "Revolutionary risk management system completed" (overselling)

**TONE GUIDELINES**:
- Maintain document style
- Focus on concrete facts and numbers
- Describe difficulties and failures matter-of-factly
- Avoid adjectives like "complete", "perfect", "innovative", "stable"
- Remove exclamations like "Success!", "Achieved!"

**CRITICAL FINAL STEPS**:
1. **SAVE AS FILE**: Use Write tool to save as `cycles/YYYY-MM-DD/[PLAN_TIMESTAMP]-topic-log.md`
   - **ALWAYS match existing plan file timestamp** (e.g., if plan is `1430-xyz-plan.md`, log is `1430-xyz-log.md`)
   - **NEVER** use current time for filename, only for document content
   - **NEVER** just output to console
2. Reference the original plan file (e.g., "Based on: 1430-payment-api-plan.md")

**COMMON MISTAKES TO AVOID**:
- ❌ Using current time for filename instead of matching plan timestamp  
- ❌ Not checking existing cycle files first
- ❌ Just showing the log without saving to file
- ❌ Including time estimates (AI can't estimate accurately)

## HANDLING OPUS REVIEWS:
If you find Opus review section in an existing log:
1. Check for Sonnet follow-up tasks
2. If found, implement the requested changes
3. Append your results with clear section separation
4. This creates a complete history in one document

## SECTION SEPARATION (CRITICAL):
When Opus reviews or when you add follow-up work, use clear section dividers:

```markdown
===============================================================================
## 📋 [OPUS] Review (2025-07-07 15:43)

[Opus review content]

===============================================================================
## 📋 [SONNET] Follow-up Complete (2025-07-07 16:50)

[Sonnet follow-up work]
===============================================================================
```

**Section Format Requirements:**
- Use exactly 79 equal signs (=) for divider lines
- Include [OPUS] or [SONNET] in section headers for clarity  
- Always include timestamp in section headers
- Use clear visual separation between different authors' content

If you find a HHMM-followup-plan.md:
1. Treat it like a regular plan but smaller scope
2. Create a new log file when done
3. Reference both original and followup plans

## CHECKPOINT INTEGRATION (CRITICAL):

**Your checkpoint.json is a goldmine** - USE IT FULLY!

When creating the log:
1. **MUST READ** HHMM-topic-checkpoint.json first
2. Extract ALL the rich context:
   ```json
   // Your checkpoint has treasures like:
   - "tried": ["attempt1", "attempt2"] → Show the journey
   - "why": "reasoning" → Explain decisions  
   - "learning": "insights" → Share wisdom
   - "codeExample": "actual code" → Include snippets
   - "gitTracking": {
       "commits": [...] → Show progression through WIP commits
       "tags": [...] → Highlight key breakthrough moments
   }
   ```
3. Transform checkpoint data into narrative:
   - Combine checkpoint struggles with Git commit messages
   - Show how WIP commits evolved into solutions
   - Link milestones to actual code changes
   - Don't just list what you did
   - Tell the STORY of how you solved it
   - Include the failed attempts and why they failed
   - Show the evolution of your thinking

### Example transformation:
```
Checkpoint: {"tried": ["mutex", "redis"], "solution": "pg lock"}
↓
Log: "First tried mutex but doesn't work in distributed env, considered Redis,
      but due to dependency overhead, ultimately solved with PostgreSQL Advisory Lock
      we're already using. Slightly slower but much lower operational complexity."
```

### File naming example:
```
1. Check existing files: 1430-payment-api-plan.md, 1430-payment-api-checkpoint.json
2. Get current time: 2025-07-07 15:28:06
3. Create log file: 1430-payment-api-log.md (match plan timestamp!)
4. Document content uses current time: "Created: 2025-07-07 15:28:06"
```

Remember: The richer your checkpoint → The better your log → The better Opus can help!

## OBJECTIVITY CHECKLIST:
Before finalizing log, check:
- [ ] Written in document style?
- [ ] Removed exaggerated adjectives? ("complete", "perfect", "innovative")
- [ ] Focused on concrete facts and numbers?
- [ ] Described failures and difficulties matter-of-factly?
- [ ] Avoided hyperbolic expressions? ("Success!", "Achieved!")

## AFTER CONTEXT RESET:
If you started with /cycle-start and had context reset:
1. The checkpoint.json has your detailed history
2. Include contextResets count in log
3. Note any insights about managing long tasks
</INSTRUCTION>

<EXAMPLE_TONE>
**Good examples**:
- "First tried mutex but didn't work in distributed environment"
- "Chose PG over Redis (can leverage existing infrastructure)"
- "Test results: 2 out of 10 concurrent requests processed twice"
- "Opus review needed: batch processing performance improvements"

**Examples to avoid**:
- "Built perfect concurrency handling system!"
- "Completely solved the problem with innovative approach"
- "100% stable system completed"
- "Amazing performance improvement achieved!"
</EXAMPLE_TONE>