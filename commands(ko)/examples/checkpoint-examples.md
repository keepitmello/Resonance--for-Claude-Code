# 체크포인트 예제

체크포인트 구조를 이해하는 데 도움이 되는 예제입니다. 특정 요구사항에 맞게 조정하세요.

## 기본 체크포인트 구조
```json
{
  "metadata": {
    "created": "2025-01-07 14:30:00",
    "lastUpdated": "2025-01-07 15:45:00",
    "contextResets": 0,
    "planFile": "1430-payment-api-plan.md"
  },
  "currentContext": {
    "whatImDoing": "웹훅 검증 로직 구현 중",
    "whyThisApproach": "중복 처리 방지를 위해 idempotency key 사용",
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
      "currentlyWorking": "웹훅 이벤트 검증 테스트"
    },
    "lastTestRun": "2025-01-07 15:30:00",
    "blockers": "Stripe API 응답 모킹"
  }
}
```

## 결정사항 문서화 예제
```json
"decisions": [
  {
    "timestamp": "14:35",
    "what": "Redis 대신 PostgreSQL Advisory Lock 사용",
    "why": "이미 PG를 사용 중이라 Redis 추가는 운영 복잡도 증가",
    "alternatives": ["Redis 분산 락", "인메모리 뮤텍스", "메시지 큐"],
    "tradeoffs": "약간 느린 성능이지만 운영 복잡도는 낮음",
    "outcome": "동시성 문제 해결, 500 TPS 달성"
  }
]
```

## 어려움 문서화 예제
```json
"struggles": [
  {
    "timestamp": "15:20",
    "problem": "간헐적 테스트 실패 (10번 중 3번)",
    "context": "100개 동시 요청에서 레이스 컨디션",
    "tried": [
      {"attempt": "setTimeout 지연", "result": "더 불안정해짐"},
      {"attempt": "트랜잭션 격리 수준 증가", "result": "데드락 발생"}
    ],
    "solution": "Advisory Lock + 재시도 로직 (지수 백오프)",
    "learning": "분산 시스템에서는 명시적 락이 낙관적 락보다 안전",
    "codeExample": "await pg.query('SELECT pg_advisory_lock($1)', [lockId]);"
  }
]
```

## 좋은 체크포인트 작성 팁
- 기억을 잃은 미래의 자신에게 설명하듯이 작성
- 설명이 아닌 실제 코드 스니펫 포함
- "무엇이 작동했는지"만큼 "왜 작동하지 않았는지"도 문서화
- 도전과제에 소요된 시간 추적을 위한 타임스탬프 추가
- 20-30분마다 또는 중요한 이벤트 후 업데이트