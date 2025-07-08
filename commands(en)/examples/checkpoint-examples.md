# Checkpoint Examples

These are examples to help understand checkpoint structure. Adapt to your specific needs.

## Basic Checkpoint Structure
```json
{
  "metadata": {
    "created": "2025-01-07 14:30:00",
    "lastUpdated": "2025-01-07 15:45:00",
    "contextResets": 0,
    "planFile": "1430-payment-api-plan.md"
  },
  "currentContext": {
    "whatImDoing": "Implementing webhook validation logic",
    "whyThisApproach": "Using idempotency keys to prevent duplicate processing",
    "keyFiles": ["src/webhooks/stripe.ts", "src/services/payment.ts"],
    "criticalCode": "const key = crypto.createHash('sha256').update(event.id).digest('hex');"
  },
  "tddProgress": {
    "currentPhase": "GREEN",
    "testsWritten": ["test/payment.test.ts", "test/webhook.test.ts"],
    "testStatus": {
      "total": 8,
      "passing": 3,
      "failing": 5,
      "currentlyWorking": "webhook event validation test"
    },
    "lastTestRun": "2025-01-07 15:30:00",
    "blockers": "Mocking Stripe API responses"
  }
}
```

## Decision Documentation Example
```json
"decisions": [
  {
    "timestamp": "14:35",
    "what": "Using PostgreSQL Advisory Lock instead of Redis",
    "why": "Already using PG, adding Redis increases operational complexity",
    "alternatives": ["Redis distributed lock", "In-memory mutex", "Message Queue"],
    "tradeoffs": "Slightly slower performance but lower operational complexity",
    "outcome": "Solved concurrency issues, achieved 500 TPS"
  }
]
```

## Struggle Documentation Example
```json
"struggles": [
  {
    "timestamp": "15:20",
    "problem": "Intermittent test failures (3 out of 10 times)",
    "context": "Race condition with 100 concurrent requests",
    "tried": [
      {"attempt": "setTimeout delay", "result": "More unstable"},
      {"attempt": "Increased transaction isolation", "result": "Deadlock occurred"}
    ],
    "solution": "Advisory Lock + retry logic (exponential backoff)",
    "learning": "Explicit locks safer than optimistic locks in distributed systems",
    "codeExample": "await pg.query('SELECT pg_advisory_lock($1)', [lockId]);"
  }
]
```

## Tips for Good Checkpoints
- Write as if explaining to your future self after memory loss
- Include actual code snippets, not just descriptions
- Document "why didn't work" as much as "what worked"
- Add timestamps to track time spent on challenges
- Update every 20-30 minutes or after significant events