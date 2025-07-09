# Bidirectional Checklist Example

This example demonstrates how Opus and Sonnet exchange knowledge through checklists during a payment webhook implementation.

## 1. Opus Creates Expectation Checklist (in cycle-plan)

```json
{
  "expectationChecklist": {
    "criticalAssumptions": [
      {
        "assumption": "Stripe webhooks always arrive in chronological order",
        "confidence": "LOW",
        "validateHow": "Log webhook timestamps and check for ordering violations",
        "ifWrong": "Implement event reordering using event.created timestamp"
      },
      {
        "assumption": "Payment provider timeout is 10 seconds as documented",
        "confidence": "MEDIUM",
        "validateHow": "Measure actual response times in test environment",
        "ifWrong": "Implement async processing with immediate ACK response"
      }
    ],
    "anticipatedChallenges": [
      {
        "challenge": "Concurrent webhook processing causing duplicate payments",
        "likelihood": "HIGH",
        "suggestion": "Use database-level unique constraint on payment_intent_id",
        "alternativeIf": "If DB constraint too slow, implement distributed lock with Redis"
      },
      {
        "challenge": "Webhook replay attacks",
        "likelihood": "MEDIUM",
        "suggestion": "Verify webhook signature and timestamp freshness",
        "alternativeIf": "Store processed webhook IDs with TTL"
      }
    ],
    "hiddenConstraints": [
      "Stripe requires webhook response within 20 seconds, not 30 as documented",
      "Refunds can only be partial, not full amount reversal",
      "Test mode webhooks have different retry behavior than production"
    ],
    "implementationGotchas": [
      {
        "area": "Idempotency key generation",
        "reason": "Stripe limits key length to 255 characters",
        "recommendation": "Use SHA1 instead of SHA256 for shorter hash"
      },
      {
        "area": "Error handling",
        "reason": "Some errors should return 200 to prevent retries",
        "recommendation": "Only return 4xx/5xx for retriable errors"
      }
    ]
  }
}
```

## 2. Sonnet Updates Reality Checklist (during cycle-start)

```json
{
  "realityChecklist": {
    "assumptionValidations": [
      {
        "opusAssumption": "Stripe webhooks always arrive in chronological order",
        "realityFound": "FALSE - Network delays cause frequent out-of-order delivery",
        "impact": "Can't rely on webhook order for state transitions",
        "solution": "Implemented event buffer with 5-second window for reordering"
      },
      {
        "opusAssumption": "Payment provider timeout is 10 seconds",
        "realityFound": "Actually 3 seconds in production environment",
        "impact": "Complex processing fails with timeouts",
        "solution": "Implemented async queue with immediate ACK (< 100ms)"
      }
    ],
    "unexpectedDiscoveries": [
      {
        "discovery": "Stripe sends duplicate webhooks even with successful ACK",
        "category": "API",
        "severity": "HIGH",
        "resolution": "Added deduplication layer using Redis with 24h TTL"
      },
      {
        "discovery": "TypeScript types from @stripe/stripe-js are incomplete",
        "category": "Tooling",
        "severity": "MEDIUM",
        "resolution": "Created custom type definitions for webhook events"
      }
    ],
    "implementationInsights": [
      "Database transactions are too slow for webhook processing",
      "Redis SET with NX flag perfect for idempotency",
      "Webhook signature validation takes ~50ms, must be async",
      "Event sourcing pattern works better than state updates"
    ]
  }
}
```

## 3. Opus Extracts Learning (in cycle-check)

```json
{
  "learningExtraction": {
    "expectationVsReality": [
      {
        "topic": "Webhook ordering guarantees",
        "opusExpected": "Chronological order maintained",
        "sonnetFound": "No ordering guarantees in distributed systems",
        "learning": "Always design for out-of-order event processing",
        "futureAction": "Add 'ordering strategy' section to all event-driven plans"
      },
      {
        "topic": "API timeout handling",
        "opusExpected": "Documented timeouts are accurate",
        "sonnetFound": "Production timeouts often stricter than docs",
        "learning": "Always validate timeouts in actual environment",
        "futureAction": "Include timeout testing in plan validation steps"
      }
    ],
    "unexpectedPatterns": [
      {
        "pattern": "Webhook deduplication required even with proper ACK",
        "frequency": "Every webhook implementation",
        "recommendation": "Make deduplication a standard requirement in webhook plans"
      },
      {
        "pattern": "Type definitions often incomplete for external APIs",
        "frequency": "3 out of 4 integrations",
        "recommendation": "Budget time for custom type creation in estimates"
      }
    ],
    "toolingInsights": [
      "Redis more suitable than DB for high-frequency operations",
      "Event sourcing reduces complexity in async systems",
      "TypeScript satisfaction != runtime correctness"
    ],
    "processImprovements": [
      "Add 'production environment validation' phase to plans",
      "Include deduplication strategy in all webhook designs",
      "Create reusable webhook testing framework"
    ]
  }
}
```

## 4. Knowledge Accumulation Over Time

After multiple cycles, patterns emerge:

```json
{
  "knowledge_base": {
    "webhook_patterns": {
      "always_assume": [
        "Out-of-order delivery",
        "Duplicate events",
        "Stricter timeouts than documented",
        "Network failures at any point"
      ],
      "standard_solutions": {
        "deduplication": "Redis SET NX with event ID",
        "ordering": "Event buffer with timestamp sorting",
        "timeouts": "Immediate ACK + async processing",
        "idempotency": "Database constraints + application checks"
      },
      "testing_checklist": [
        "Simulate out-of-order events",
        "Test duplicate webhook delivery",
        "Measure actual timeout limits",
        "Verify idempotency under load"
      ]
    }
  }
}
```

## Benefits of This Approach

1. **Knowledge Transfer**: Opus's research informs Sonnet's implementation
2. **Reality Feedback**: Sonnet's discoveries improve future planning
3. **Pattern Recognition**: Repeated issues become standard considerations
4. **Continuous Improvement**: Each cycle makes the next one smoother

## Usage

- Opus references this when creating expectationChecklist in plans
- Sonnet uses this format when updating realityChecklist during implementation
- Both refer to accumulated knowledge_base for common patterns