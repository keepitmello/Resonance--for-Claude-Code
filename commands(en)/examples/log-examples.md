# Log Examples

Reference examples for writing cycle logs. Focus on storytelling, not templates.

## Good Log Example - Payment API Implementation

```markdown
## 🔄 Cycle #12 - Payment API Integration

**Created**: 2025-01-07 15:28:06  
**Status**: ⚠️ Partial (concurrency handling incomplete)

### 📝 Implementation Summary

Implemented Stripe payment integration with partial concurrency protection.

**Major Changes**:
```diff
+ src/services/PaymentService.ts (new)
+ src/webhooks/stripe.ts (new)
+ test/payment.test.ts (new)
~ src/routes/api.ts (modified: payment routes added)
```

### 🧪 TDD Process & Test Results

**TDD Cycle Compliance**: ✅ Yes

#### 🔴 RED Phase
Started by writing 8 tests defining payment behavior. All failed as expected.

#### 🟢 GREEN Phase
Minimal implementation to pass tests. Had to mock Stripe responses which took longer than expected.

#### 🔵 REFACTOR Phase
Extracted validation logic into separate functions. Improved error messages.

**Final Coverage**: 87.5%

### 💭 Key Decisions

**PostgreSQL Advisory Lock over Redis**
Chose to use existing PostgreSQL infrastructure instead of adding Redis dependency. Performance is slightly slower (50ms vs 20ms) but operational complexity is much lower.

### 🤔 Challenges Faced

**Duplicate Payment Prevention**
Initially tried optimistic locking but got race conditions under load. Switched to advisory locks which solved the issue but required careful transaction management.

### 🚨 Unresolved Issues

1. **Timeout Handling**: Need better approach for long-running payments
2. **Batch Processing**: Current implementation is slow for bulk operations

### 📈 Metrics

- Single payment: 150ms average
- Concurrent handling: 500 TPS max
- Error rate: 0.2% (mostly timeouts)

### 🔄 Next Steps

Need Opus guidance on:
- Batch processing architecture
- Timeout handling strategy
- Whether to add Redis for better performance
```

## What Makes a Good Log

1. **Factual tone** - "Implemented X" not "Successfully built amazing X!"
2. **Specific metrics** - Real numbers, not vague descriptions
3. **Honest challenges** - What actually went wrong and why
4. **Clear decisions** - What you chose and the reasoning
5. **Actionable next steps** - Specific questions or blockers

## What to Avoid

❌ "Perfectly implemented payment system!"  
✅ "Implemented payment validation. 7 of 8 tests passing."

❌ "Everything works great!"  
✅ "Basic flow works. Issues with concurrent requests."

❌ Long template-like sections  
✅ Natural narrative of what happened