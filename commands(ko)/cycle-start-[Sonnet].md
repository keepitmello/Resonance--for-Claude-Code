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
    "whatImDoing": "구체적으로 지금 하는 작업",
    "whyThisApproach": "이 방법을 선택한 이유",
    "keyFiles": ["작업 중인 핵심 파일들"],
    "criticalCode": "꼭 기억해야 할 코드 패턴이나 구조"
  },
  "decisions": [
    {
      "timestamp": "14:35",
      "what": "Redis 대신 PostgreSQL Advisory Lock 사용",
      "why": "이미 PG 쓰고 있어서 새로운 의존성 추가가 부담스러움",
      "alternatives": ["Redis 분산락", "In-memory mutex", "Message Queue"],
      "tradeoffs": "성능은 약간 느리지만 운영 복잡도 낮음",
      "outcome": "동시성 이슈 해결, TPS 500 달성"
    }
  ],
  "struggles": [
    {
      "timestamp": "15:20",
      "problem": "테스트에서 간헐적 실패 (10번 중 3번)",
      "context": "동시에 100개 요청 시 race condition",
      "tried": [
        {"attempt": "setTimeout으로 딜레이", "result": "더 불안정"},
        {"attempt": "트랜잭션 격리 수준 상향", "result": "데드락 발생"}
      ],
      "solution": "Advisory Lock + 재시도 로직 (exponential backoff)",
      "learning": "분산 환경에서는 낙관적 잠금보다 명시적 잠금이 안전",
      "codeExample": "await pg.query('SELECT pg_advisory_lock($1)', [lockId]);"
    }
  ],
  "progress": {
    "completed": ["결제 검증 로직", "동시성 처리"],
    "inProgress": "에러 핸들링 개선",
    "blocked": "성능 테스트 (부하 테스트 환경 필요)",
    "discovered": ["캐싱 필요성", "배치 처리 고려"]
  },
  "mustRemember": [
    "lockId는 payment_id의 해시값 사용 (충돌 방지)",
    "트랜잭션은 최대한 짧게 유지 (3초 타임아웃)",
    "실패 시 사용자에게 명확한 메시지 필요"
  ],
  "nextSteps": {
    "immediate": "에러 메시지 다국어 지원 추가",
    "soon": "성능 모니터링 메트릭 추가",
    "later": "배치 결제 처리 아키텍처"
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

### Checkpoint Process = Update + Commit (자동 연동):
**CRITICAL**: Every checkpoint update MUST include a Git commit!
1. Check status: Use `mcp__MCP_DOCKER__git_status` tool
2. Stage all changes: Use `mcp__MCP_DOCKER__git_add` with files=["*"] 
3. Create WIP commit: Use `mcp__MCP_DOCKER__git_commit` with structured message:
   ```
   message: "WIP[checkpoint]: [작업내용] - [진행률]%

   완료:
   - 구체적으로 완료한 것들
   
   진행중:
   - 현재 작업 중인 부분
   
   막힌점:
   - 어려움이나 이슈
   
   다음:
   - 즉시 할 작업"
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
5. Tag important discoveries (선택적):
   - Major breakthrough: `git tag -a "solution/HHMM-algorithm-fix" -m "핵심 해결책"`
   - Key milestone: `git tag -a "milestone/HHMM-tests-passing" -m "모든 테스트 통과"`

### What to Document (BE SPECIFIC):
```json
// BAD - Too vague
"currentContext": {
  "whatImDoing": "결제 구현 중"
}

// GOOD - Rich context
"currentContext": {
  "whatImDoing": "Stripe webhook 이벤트 처리 로직 구현 중",
  "whyThisApproach": "idempotency key로 중복 처리 방지, DB 트랜잭션으로 일관성 보장",
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
  "context": "동시에 10개 결제 요청 시 2개가 중복 처리됨",
  "hypothesis": "lock 획득 타이밍 이슈로 추정",
  "nextTry": "lock 획득 전에 상태 재확인 로직 추가"
}
```

**When making a decision:**
```json
{
  "timestamp": "16:00", 
  "decision": "이벤트 처리를 동기에서 큐 기반 비동기로 변경",
  "trigger": "Stripe 타임아웃 (3초) 내 처리 불가능",
  "considered": ["처리 로직 최적화", "병렬 처리", "큐 도입"],
  "chose": "Bull 큐 사용",
  "because": "재시도 로직 내장, 모니터링 UI 제공, 팀 경험 있음"
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
   - Read WIP commit messages for context (they contain 완료/진행중/막힌점/다음)
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