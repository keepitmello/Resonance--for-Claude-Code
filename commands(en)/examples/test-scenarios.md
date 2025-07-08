# Test Scenario Examples

Examples showing how to design test scenarios in the planning phase.

## Payment Processing Test Design

### Test Structure Example
```
test/
├── unit/
│   ├── payment-validator.test.ts
│   └── amount-calculator.test.ts
└── integration/
    ├── payment-flow.test.ts
    └── webhook-handling.test.ts
```

### Test Scenario Pattern

```typescript
describe('Payment Processing', () => {
  describe('processPayment()', () => {
    it('should process valid payment successfully', () => {
      // Given: Valid payment data
      const paymentData = {
        amount: 1000,
        currency: 'USD',
        customerId: 'cust_123'
      };
      
      // When: Processing payment
      const result = processPayment(paymentData);
      
      // Then: Payment should succeed
      expect(result.status).toBe('success');
      expect(result.transactionId).toBeDefined();
    });
  });
});
```

## Test Categories

### 1. Core Functionality (Must Have)
- Happy path scenarios
- Basic input/output validation
- Primary business logic

### 2. Edge Cases (Should Have)
- Empty/null inputs
- Boundary values
- Unusual but valid scenarios

### 3. Error Handling (Must Have)
- Invalid inputs
- External service failures
- Timeout scenarios

### 4. Performance (Nice to Have)
- Load testing
- Concurrent request handling
- Resource usage

## Example: User Authentication Tests

```markdown
### RED Phase Test List:

1. **Login Success Path**
   - Given: Valid credentials
   - When: User attempts login
   - Then: Return auth token

2. **Invalid Password**
   - Given: Valid username, wrong password
   - When: Login attempt
   - Then: Return 401 with generic error

3. **Account Lockout**
   - Given: 5 failed attempts
   - When: 6th attempt (even with correct password)
   - Then: Return locked account error

4. **Concurrent Login Prevention**
   - Given: User already logged in
   - When: Second login attempt
   - Then: Invalidate first session or reject
```

## Tips for Good Test Scenarios

1. **Start with behavior, not implementation**
   - ✅ "should prevent duplicate payments"
   - ❌ "should use PostgreSQL advisory lock"

2. **Include specific test data**
   - ✅ "amount: 1000, currency: 'USD'"
   - ❌ "valid payment data"

3. **Clear success criteria**
   - ✅ "expect(result.status).toBe('success')"
   - ❌ "should work correctly"

4. **Consider real-world scenarios**
   - Network failures
   - Concurrent requests
   - Data inconsistencies