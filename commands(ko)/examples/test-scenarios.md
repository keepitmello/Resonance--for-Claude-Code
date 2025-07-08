# 테스트 시나리오 예제

계획 단계에서 테스트 시나리오를 설계하는 방법을 보여주는 예제입니다.

## 결제 처리 테스트 설계

### 테스트 구조 예제
```
test/
├── unit/
│   ├── payment-validator.test.ts
│   └── amount-calculator.test.ts
└── integration/
    ├── payment-flow.test.ts
    └── webhook-handling.test.ts
```

### 테스트 시나리오 패턴

```typescript
describe('결제 처리', () => {
  describe('processPayment()', () => {
    it('유효한 결제를 성공적으로 처리해야 한다', () => {
      // Given: 유효한 결제 데이터
      const paymentData = {
        amount: 1000,
        currency: 'KRW',
        customerId: 'cust_123'
      };
      
      // When: 결제 처리
      const result = processPayment(paymentData);
      
      // Then: 결제가 성공해야 함
      expect(result.status).toBe('success');
      expect(result.transactionId).toBeDefined();
    });
  });
});
```

## 테스트 카테고리

### 1. 핵심 기능 (필수)
- 해피 패스 시나리오
- 기본 입출력 검증
- 주요 비즈니스 로직

### 2. 엣지 케이스 (권장)
- 빈/null 입력
- 경계값
- 특이하지만 유효한 시나리오

### 3. 에러 처리 (필수)
- 잘못된 입력
- 외부 서비스 실패
- 타임아웃 시나리오

### 4. 성능 (선택)
- 부하 테스트
- 동시 요청 처리
- 리소스 사용

## 예제: 사용자 인증 테스트

```markdown
### RED 단계 테스트 목록:

1. **로그인 성공 경로**
   - Given: 유효한 자격증명
   - When: 사용자가 로그인 시도
   - Then: 인증 토큰 반환

2. **잘못된 비밀번호**
   - Given: 유효한 사용자명, 틀린 비밀번호
   - When: 로그인 시도
   - Then: 일반적인 에러와 함께 401 반환

3. **계정 잠금**
   - Given: 5번 실패한 시도
   - When: 6번째 시도 (올바른 비밀번호라도)
   - Then: 계정 잠금 에러 반환

4. **동시 로그인 방지**
   - Given: 이미 로그인한 사용자
   - When: 두 번째 로그인 시도
   - Then: 첫 번째 세션 무효화 또는 거부
```

## 좋은 테스트 시나리오를 위한 팁

1. **구현이 아닌 동작으로 시작**
   - ✅ "중복 결제를 방지해야 한다"
   - ❌ "PostgreSQL advisory lock을 사용해야 한다"

2. **구체적인 테스트 데이터 포함**
   - ✅ "amount: 1000, currency: 'KRW'"
   - ❌ "유효한 결제 데이터"

3. **명확한 성공 기준**
   - ✅ "expect(result.status).toBe('success')"
   - ❌ "올바르게 작동해야 함"

4. **실제 시나리오 고려**
   - 네트워크 실패
   - 동시 요청
   - 데이터 불일치