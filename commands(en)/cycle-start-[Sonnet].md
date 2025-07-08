---
description: Start implementation from latest plan with checkpoint tracking
---

<SYSTEM>
You are Claude Sonnet 4, starting a new implementation cycle.
Automatically find the latest plan, set up checkpoint tracking, and begin work.
This command helps manage long-running tasks and context window limits.
</SYSTEM>

<CONTEXT>
This command is used at the beginning of implementation work.
It ensures continuity across potential context resets by maintaining detailed checkpoints.
The checkpoint file becomes the source of truth for progress and decisions.
</CONTEXT>

<USER>

Think hard: Start implementation cycle.

</USER>

<INSTRUCTION>
## INITIAL SETUP:
1. **FIRST**: Get current date/time with `date '+%Y-%m-%d %H:%M:%S'`
2. Scan cycles/YYYY-MM-DD/ for latest HHMM-topic-plan.md file
3. Read the plan thoroughly
4. Setup Git Worktree (MCP Tools):
   - Check current status: Use `mcp__MCP_DOCKER__git_status` tool
   - Create cycle branch: Use `mcp__MCP_DOCKER__create_branch` with branch="cycle/HHMM-topic"
   - Check worktree status: Use Bash tool with `git worktree list`
   - Create worktree: Use Bash tool with `git worktree add ../m4ta-coinhub-cycles/cycle-HHMM-topic cycle/HHMM-topic`
   - Move to worktree directory for all work
   - Initialize: Use `mcp__MCP_DOCKER__git_commit` with message="🚀 Cycle Start: [topic]" (allow-empty)
5. Check for existing HHMM-topic-checkpoint.json for this plan
6. If no checkpoint exists:
   - Create HHMM-topic-checkpoint.json using Write tool
   - Initialize with current timestamp in metadata
   - Set contextResets: 0
   - Include plan filename reference
   - Add git tracking info
   - **MUST save as file, not just output**
   
Example initial checkpoint:
```json
{
  "metadata": {
    "created": "[CURRENT_TIMESTAMP from step 1]",
    "lastUpdated": "[CURRENT_TIMESTAMP from step 1]",
    "contextResets": 0,
    "planFile": "1430-payment-api-plan.md"
  },
  "gitTracking": {
    "worktreePath": "../m4ta-coinhub-cycles/cycle-1430-payment-api",
    "currentBranch": "cycle/1430-payment-api",
    "commits": [],
    "lastCommitSHA": "",
    "lastPush": null,
    "tags": []
  },
  "currentContext": {
    "whatImDoing": "Starting implementation of [TOPIC]",
    "whyThisApproach": "[from plan]",
    "keyFiles": [],
    "criticalCode": ""
  }
}
```

## CHECKPOINT STRUCTURE:
The checkpoint must capture WHY and HOW, not just WHAT:
```json
{
  "metadata": {
    "created": "2025-01-07 14:30:00",
    "lastUpdated": "2025-01-07 15:45:00",
    "contextResets": 0,
    "planFile": "1430-payment-api-plan.md"
  },
  "currentContext": {
    "whatImDoing": "Specifically what I'm working on right now",
    "whyThisApproach": "Reason for choosing this approach",
    "keyFiles": ["core files being worked on"],
    "criticalCode": "Must-remember code patterns or structures"
  },
  "decisions": [
    {
      "timestamp": "14:35",
      "what": "Using PostgreSQL Advisory Lock instead of Redis",
      "why": "Already using PG, avoiding new dependency overhead",
      "alternatives": ["Redis distributed lock", "In-memory mutex", "Message Queue"],
      "tradeoffs": "Slightly slower but lower operational complexity",
      "outcome": "Resolved concurrency issue, achieved 500 TPS"
    }
  ],
  "struggles": [
    {
      "timestamp": "15:20",
      "problem": "Intermittent test failures (3 out of 10 runs)",
      "context": "Race condition with 100 concurrent requests",
      "tried": [
        {"attempt": "Added setTimeout delay", "result": "Made it more unstable"},
        {"attempt": "Increased transaction isolation", "result": "Caused deadlocks"}
      ],
      "solution": "Advisory Lock + retry logic (exponential backoff)",
      "learning": "Explicit locks safer than optimistic locking in distributed env",
      "codeExample": "await pg.query('SELECT pg_advisory_lock($1)', [lockId]);"
    }
  ],
  "progress": {
    "completed": ["Payment validation logic", "Concurrency handling"],
    "inProgress": "Error handling improvements",
    "blocked": "Performance testing (need load test environment)",
    "discovered": ["Need for caching", "Consider batch processing"]
  },
  "mustRemember": [
    "lockId uses payment_id hash (collision prevention)",
    "Keep transactions short (3 second timeout)",
    "Clear user messaging on failures required"
  ],
  "nextSteps": {
    "immediate": "Add multi-language error message support",
    "soon": "Add performance monitoring metrics",
    "later": "Batch payment processing architecture"
  }
}
```

## DURING WORK - CONTINUOUS CHECKPOINT UPDATES:

**CRITICAL**: Update checkpoint FREQUENTLY with RICH CONTEXT!

### Update Frequency (MANDATORY):
- **After each test** (pass or fail)
- **Before trying new approach**
- **After any "aha!" moment**
- **After 2-3 file edits**
- **Before any risky change**
- **When completing a subtask**
- **When switching context**

### Checkpoint Process = Update + Commit (Auto-linked):
**CRITICAL**: Every checkpoint update MUST include a Git commit!
1. Check status: Use `mcp__MCP_DOCKER__git_status` tool
2. Stage all changes: Use `mcp__MCP_DOCKER__git_add` with files=["*"] 
3. Create WIP commit: Use `mcp__MCP_DOCKER__git_commit` with structured message:
   ```
   message: "WIP[checkpoint]: [task description] - [progress]%

   Completed:
   - Specific things completed
   
   In Progress:
   - Current work
   
   Blockers:
   - Challenges or issues
   
   Next:
   - Immediate next task"
   ```
4. Update checkpoint.json with commit info:
   ```json
   "gitTracking": {
     "commits": [
       {
         "sha": "[from git rev-parse HEAD]",
         "time": "[current time]",
         "message": "[commit message first line]",
         "event": "[test_pass/test_fail/approach_change/discovery/file_edits]"
       }
     ],
     "lastCommitSHA": "[latest SHA]"
   }
   ```
5. Tag important discoveries (optional):
   - Major breakthrough: `git tag -a "solution/HHMM-algorithm-fix" -m "Key solution found"`
   - Key milestone: `git tag -a "milestone/HHMM-tests-passing" -m "All tests passing"`

### What to Document (BE SPECIFIC):
```json
// BAD - Too vague
"currentContext": {
  "whatImDoing": "Working on payment"
}

// GOOD - Rich context
"currentContext": {
  "whatImDoing": "Implementing Stripe webhook event handler",
  "whyThisApproach": "Using idempotency key to prevent duplicates, DB transaction for consistency",
  "keyFiles": ["src/webhooks/stripe.ts", "src/services/payment.ts"],
  "criticalCode": "const idempotencyKey = crypto.createHash('sha256').update(event.id).digest('hex');"
}
```

### Update Examples:

**After a failed test:**
```json
{
  "timestamp": "15:45",
  "event": "test_failure",
  "context": "2 out of 10 concurrent payments processed twice",
  "hypothesis": "Lock acquisition timing issue suspected",
  "nextTry": "Add state recheck before lock acquisition"
}
```

**When making a decision:**
```json
{
  "timestamp": "16:00", 
  "decision": "Switch event processing from sync to queue-based async",
  "trigger": "Cannot process within Stripe timeout (3 seconds)",
  "considered": ["Optimize processing logic", "Parallel processing", "Queue introduction"],
  "chose": "Bull queue",
  "because": "Built-in retry logic, monitoring UI, team has experience"
}
```

### Context Preservation Tips:
- Write as if explaining to your future self after amnesia
- Include actual code snippets, not just descriptions  
- Document "why didn't work" as much as "what worked"
- Add timestamps to track time spent on each challenge

## AFTER CONTEXT RESET:
If contextResets > 0 in checkpoint:
1. First action: Read HHMM-topic-checkpoint.json
2. Use Git to recover context:
   - `mcp__MCP_DOCKER__git_log` with max_count=10 to see recent commits
   - `mcp__MCP_DOCKER__git_diff` to see current uncommitted changes
   - Read WIP commit messages for context (they contain Completed/In Progress/Blockers/Next)
   - Check last commit SHA against checkpoint's lastCommitSHA
3. Read relevant code files mentioned in checkpoint
4. Check TodoRead for current state
5. Resume from nextSteps.immediate
6. Increment contextResets counter
7. Create recovery commit: 
   - `mcp__MCP_DOCKER__git_commit` with message="🔄 Context Reset Recovery #N"

## CRITICAL: CHECKPOINT AS YOUR EXTERNAL BRAIN

**The checkpoint is your lifeline** - treat it like your external brain:

### What makes a GOOD checkpoint update:
✅ "Tried X because Y, failed due to Z, learned that..."
✅ "Spent 30min debugging, root cause was..."  
✅ "This approach works but has trade-off..."
✅ "Must remember: [specific code pattern/config]"

### What makes a BAD checkpoint update:
❌ "Implemented payment feature"
❌ "Fixed bug"
❌ "Working on tests"
❌ "Made progress"

### Golden Rule:
> "Write every update as if you'll have complete memory loss in 30 minutes"

### Update Checklist:
Before moving to next task, ask yourself:
- [ ] Did I document WHY I made this choice?
- [ ] Did I record what DIDN'T work and why?
- [ ] Did I include the EXACT code/command that worked?
- [ ] Would future-me understand the CONTEXT?
- [ ] Did I note any SURPRISES or edge cases?

Remember: A rich checkpoint leads to a rich HHMM-topic-log.md, which helps Opus give better guidance!
</INSTRUCTION>

<KEY_BEHAVIORS>
## Expected Behaviors:

1. **Timestamp First**: Always check time before starting work
2. **Checkpoint Obsession**: Update every 20-30 minutes NO MATTER WHAT
3. **Context Over Progress**: Document thinking process, not just outcomes
4. **Failure Documentation**: Failed attempts are as valuable as successes
5. **Code Specificity**: Include exact code snippets, not descriptions
6. **Future-Self Empathy**: Write as if you'll forget everything

## Mandatory Checkpoint Moments:
- ⏰ Every 20-30 minutes (set mental timer!)
- 🧪 After EVERY test (pass or fail)
- 🤔 When stuck for >10 minutes
- 💡 After any realization or "aha!" moment
- 🔄 Before trying different approach
- ✅ After completing any subtask
- 📝 After 2-3 file modifications
- ⚠️ Before any risky operation
- 😓 When feeling confused or lost
- 🎯 When making any decision

## Checkpoint Quality Check:
Ask yourself: "If I disappeared now, could someone else continue from this checkpoint?"
If answer is no → ADD MORE CONTEXT!
</KEY_BEHAVIORS>