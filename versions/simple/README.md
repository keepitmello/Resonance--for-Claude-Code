# 🧪 TDD with Two Sessions: Opus & Sonnet

**Version**: 5.1  
**Updated**: 2025-07-07
**Purpose**: Opus(설계) + Sonnet(구현) 두 세션으로 완벽한 TDD 워크플로우

Claude Code를 위한 TDD 기반 개발 명령어 모음집입니다.

- ✅ 모든 개발은 TDD 사이클로
- ✅ Opus(설계) ↔ Sonnet(구현) 협업

## 📋 명령어 목록

### 🔄 일상 작업 (매일 사용)
| 명령어 | 역할 | 사용 빈도 |
|--------|------|----------|
| **`/cycle-check`** | 비판적 코드 리뷰 + 개선 작업 | ⭐ 하루 3-5회 |
| **`/cycle-plan`** | 대화형 사이클 계획 (ultrathink 필수) | ⭐ 하루 5-10회 |
| **`/cycle-start`** | 구현 시작 + checkpoint 관리 | ⭐ 사이클마다 |
| **`/cycle-log`** | 객관적 구현 결과 문서화 | ⭐ 하루 5-10회 |

### 🏗️ 큰 변경 (가끔 사용)
| 명령어 | 역할 | 사용 빈도 |
|--------|------|----------|
| `/brainstorm` | 아이디어 구체화 | 필요시 |
| `/architect-tdd` | 대규모 아키텍처 설계 | 월 1-2회 |
| `/weekly-review` | 주간 회고 및 분석 | 주 1회 |

### 📦 기타
| 명령어 | 역할 |
|--------|------|
| `/wrap` | 작업 완료 후 정리 (커밋 포함) |

## 🎭 두 세션 협업이 핵심!

```mermaid
graph LR
    A[Opus Session<br/>설계/리뷰] -->|plan.md| B[Sonnet Session<br/>구현/테스트]
    B -->|log.md| A
    
    style A fill:#f9f,stroke:#333,stroke-width:4px
    style B fill:#9ff,stroke:#333,stroke-width:4px
```

### 👤 Opus (설계 전문가)
- **Model**: Claude Opus 4
- **역할**: 아키텍처 설계, 기술 결정, 코드 리뷰
- **주요 명령어**: `/cycle-check`, `/cycle-plan`, `/architect-tdd`
- **산출물**: plan.md 문서들

### 🛠️ Sonnet (구현 전문가)
- **Model**: Claude Sonnet 4
- **역할**: TDD 구현, 코드 작성, 테스트
- **주요 명령어**: `/cycle-start`, `/cycle-log`
- **산출물**: 실제 코드 + log.md 문서

## 🚀 기본 사용 플로우

```bash
# 1. Opus 세션 시작
opus> /cycle-check
→ 이전 사이클 자동 분석
→ 코드 품질 비판적 검토
→ 🔴Critical 이슈는 즉시 수정
→ 🟡Major 이슈는 Sonnet 태스크 생성

# 2. 계획 수립
opus> /cycle-plan "결제 API"
→ Phase 1: 대화로 요구사항 파악
→ User: "ultrathink" (필수!)
→ Phase 2: 상세 계획 작성
→ 파일로 저장: cycles/YYYY-MM-DD/HHMM-topic-plan.md

# 3. Sonnet 구현
sonnet> /cycle-start
→ 최신 plan 읽고 시작
→ checkpoint.json 생성
→ 20-30분마다 상세 업데이트
sonnet> /cycle-log
→ 객관적으로 결과 문서화

# 4. 반복
opus> /cycle-check
→ 다시 1번부터...
```

## 📊 언제 어느 세션?

| 상황 | 사용 세션 | 이유 |
|------|-----------|------|
| 아침 시작 | Opus | 전체 상황 파악 필요 |
| 새 기능 설계 | Opus | 아키텍처 결정 |
| 테스트 작성 | Sonnet | TDD 실행 |
| 코드 구현 | Sonnet | 실제 코딩 |
| 기술적 고민 | Opus | 설계 전문성 |
| 버그 수정 | Sonnet → Opus | 빠른 수정 후 원인 분석 |
| 리팩토링 | Opus → Sonnet | 설계 후 실행 |
| 일일 마무리 | Opus | 전체 리뷰 |

## 📁 문서 구조 (핸드오프의 핵심)

```
cycles/
└── 2025-07-07/
    ├── 0900-refund-concurrency-plan.md    # Opus 작성
    ├── 0930-refund-concurrency-log.md     # Sonnet 작성 + Opus 리뷰
    ├── 1100-batch-optimization-plan.md    # Opus 작성
    ├── 1145-batch-optimization-log.md     # Sonnet 작성
    └── 1400-urgent-bugfix-log.md          # Sonnet 단독
```

### Plan 문서 (Opus → Sonnet)
```markdown
# 🔄 Cycle - 환불 동시성 해결
**생성일시**: 2025-07-04 09:00

## 🧪 TDD 테스트 시나리오
### 테스트 1: 동시 환불 요청
- Given: 같은 주문에 대한 2개의 환불 요청
- When: 동시에 처리
- Then: 하나만 성공, 하나는 StaleDataException

## 💻 구현 전략
- version 컬럼 추가
- 낙관적 락 패턴 적용

## ⚠️ 주의사항
- 기존 데이터 마이그레이션 필요
```

### Log 문서 (Sonnet → Opus + 리뷰)
```markdown
# 🔄 Cycle #1 완료 - 환불 동시성 해결
**시간**: 09:00 - 09:30

## 📝 구현 요약
낙관적 락으로 동시성 해결, 테스트 8/8 통과

## 🤔 어려웠던 점
마이그레이션 스크립트에서 기본값 설정이 까다로웠음

## Opus에게 물어볼 것
- 대량 데이터 마이그레이션 전략?

===============================================================================
## 📋 [OPUS] 리뷰 (2025-07-04 10:00)

### 💬 Sonnet 질문에 대한 답변
Q: 대량 데이터 마이그레이션 전략?
A: 배치로 나눠서, 1000건씩 처리 권장

### ✅ 승인 사항
- 낙관적 락 구현 good
- 테스트 커버리지 excellent
===============================================================================
```

## 📖 커맨드 상세 설명

### `/cycle-check` [Opus] - 비판적 코드 리뷰
- **역할**: 시니어 엔지니어처럼 까다롭게 코드 검토
- **특징**: 
  - 유저와는 협업적으로, 코드엔 엄격하게
  - 🔴 보안/데이터 이슈는 즉시 수정
  - 🟡 품질 이슈는 Sonnet 태스크 생성
  - 복잡한 작업은 checkpoint.json도 확인
- **산출물**: log.md에 리뷰 결과 append

### `/cycle-plan` [Opus] - 대화형 계획 수립
- **역할**: 요구사항을 대화로 파악하고 상세 계획 작성
- **프로세스**:
  - Phase 1: 자연스러운 대화로 정보 수집
  - Phase 2: ultrathink로 깊은 분석 (필수!)
- **중요**: 시간 추정 없음, 반드시 파일로 저장
- **산출물**: cycles/YYYY-MM-DD/HHMM-topic-plan.md

### `/cycle-start` [Sonnet] - 구현 시작
- **역할**: 계획 읽고 TDD 구현 시작, checkpoint 관리
- **특징**:
  - 시작 시 timestamp 확인
  - checkpoint.json 생성/업데이트 (20-30분마다)
  - 실패한 시도도 상세히 기록
  - context reset 대응
- **산출물**: HHMM-topic-checkpoint.json

### `/cycle-log` [Sonnet] - 구현 결과 문서화
- **역할**: 객관적이고 사실 중심의 구현 기록
- **특징**:
  - 호들갑 없이 담담하게 작성
  - checkpoint.json 내용 활용
  - 실패와 성공 모두 기록
- **산출물**: cycles/YYYY-MM-DD/HHMM-topic-log.md

## 🎮 실제 하루 일과 (두 세션 운영)

### 09:00 - 아침 시작
```bash
[Opus 세션]
opus> /cycle-check
→ "어제 환불 API 완료, 동시성 이슈 있음"
→ Sonnet 질문 답변: "Optimistic Lock 사용 추천"
→ log.md에 리뷰 추가

opus> /cycle-plan "환불 동시성 해결"
→ Phase 1: 문제 상황 파악
→ Phase 2: ultrathink로 해결책 설계
→ 0900-refund-concurrency-plan.md 생성

[Sonnet 세션으로 전환]
sonnet> /cycle-start
sonnet> # plan 읽고 동시성 테스트부터 작성
sonnet> # version 컬럼 추가, 낙관적 락 구현
sonnet> /cycle-log
→ 0930-refund-concurrency-log.md 생성
```

### 11:00 - 다음 사이클
```bash
[Opus 세션]
opus> /cycle-check
→ "동시성 해결 확인, 성능은?"
→ 배치 처리 아키텍처 제안

opus> /cycle-plan "환불 배치 최적화"
→ Stream 기반 처리 설계
→ 1100-batch-optimization-plan.md

[Sonnet 세션]
sonnet> /cycle-start
sonnet> # 배치 테스트 작성
sonnet> # Stream 구현
sonnet> /cycle-log
```

### 14:00 - 버그 발생!
```bash
[빠른 수정이 필요한 경우 - Sonnet에서 바로]
sonnet> # 버그 재현 테스트 작성
sonnet> # 수정
sonnet> /cycle-log "긴급 버그 수정"

[나중에 Opus가 확인]
opus> /cycle-check
→ "버그 수정 확인, 근본 원인 분석 필요"
```

## 🔄 특수 상황 처리

### 긴급 버그
```bash
# Sonnet에서 바로 처리 가능
sonnet> # 버그 재현 테스트
sonnet> # 수정
sonnet> /cycle-log

# 나중에 Opus가 근본 원인 분석
opus> /cycle-check
```

### 복잡한 설계
```bash
# Opus에서 깊은 분석
opus> /architect-tdd "마이크로서비스 분리"

# 여러 사이클로 나눠서 실행
opus> /cycle-plan "User 서비스 분리"
sonnet> # 구현...
```

### 추가 작업 필요
```bash
# Opus가 리뷰 후 추가 작업 요청
opus> /cycle-check
→ log.md에 "### 🔄 Sonnet 추가 작업 요청" 추가

# Sonnet이 확인하고 처리
sonnet> # log.md 열어서 확인
sonnet> # 추가 작업 수행
sonnet> # Edit로 결과 추가
```

## 💡 Extended Thinking 활용

### Opus 세션
- `/cycle-check`: 자동 ultrathink (깊은 분석)
- `/cycle-plan`: Phase 2에서 ultrathink (사용자 요청 시)
- `/architect-tdd`: 자동 ultrathink (큰 설계)

### Sonnet 세션
- `/cycle-log`: 기본 think (빠른 정리)
- 복잡한 문제 시: ultrathink 사용 가능

## 🏆 성공 팁 & 주의사항

### ✅ DO
1. **역할 지키기**: Opus는 설계, Sonnet은 구현
2. **문서로 소통**: plan.md와 log.md가 대화 채널
3. **주기적 전환**: 2-3시간마다 세션 체크
4. **리뷰 기록**: Opus는 항상 log에 리뷰 남기기
5. **세션 동기화**: 항상 최신 문서 확인
6. **컨텍스트 유지**: 문서에 충분한 정보 포함

### ❌ DON'T
1. **역할 혼재**: Opus에서 구현하거나 Sonnet에서 설계
2. **문서 없이**: 구두로만 전달하면 컨텍스트 손실
3. **한 세션만**: 둘 다 활용해야 시너지
4. **리뷰 생략**: 작은 작업도 리뷰는 필수
5. **역할 경계 무시**: 설계와 구현 명확히 구분
6. **지속적 리뷰 생략**: 작은 것도 놓치지 않기

## 📈 성과 측정

### 일일 지표
- Opus: 5-8개 plan 문서
- Sonnet: 5-8개 log 문서 + 실제 구현
- 리뷰: 모든 log에 Opus 리뷰 섹션

### 주간 지표
- 완성된 기능: 15-25개
- 테스트 커버리지: +5-10%
- 평균 사이클 시간: 45-90분

## 🔄 v5.1 주요 개선사항 (2025-07-07)

### 1. **모든 커맨드 파일 저장 강화**
- 시간 확인 필수: `date '+%Y-%m-%d %H:%M:%S'`
- 콘솔 출력 금지, 반드시 Write tool 사용
- estimated time 제거 (AI는 시간 추정 부정확)

### 2. **cycle-check 리뷰어 강화**
- Dual persona: 유저(협업) vs 코드(엄격)
- 🔴 Critical은 즉시 수정, 🟡 Major는 태스크 생성
- "임시 해결" 절대 용납 안 함

### 3. **cycle-start checkpoint 개선**
- 20-30분마다 의무 업데이트
- 실패 과정도 상세 기록
- "30분 후 기억상실"처럼 작성

### 4. **cycle-log 객관성 강화**
- 호들갑 없는 담담한 문서체
- "완벽", "혁신적" 같은 수식어 금지
- 숫자와 사실 중심

### 5. **섹션 구분 가이드라인 추가**
- Opus와 Sonnet 작업 구분을 위한 명확한 섹션 구분
- 79개 = 기호로 구분선 설정
- [OPUS]/[SONNET] 라벨 및 타임스탬프 포함

## 💡 핵심 원칙

1. **작은 사이클**: 30분-2시간 단위로 작업
2. **대화형 계획**: 혼자 추측하지 않고 함께 만들기
3. **솔직한 기록**: 실패와 어려움도 그대로 기록
4. **지속적 개선**: cycle-check로 계속 피드백 루프

## FAQ - 두 세션 운영

**Q: 왜 두 세션으로 나눠야 하나요?**  
A: Opus는 깊은 사고, Sonnet은 빠른 실행에 최적화. 역할 분리로 더 나은 결과.

**Q: 한 세션으로는 안 되나요?**  
A: 가능하지만 비효율적. 모델별 강점을 활용하는 게 훨씬 생산적.

**Q: 세션 전환이 번거롭지 않나요?**  
A: 문서 기반이라 전환 비용 최소. 오히려 명확한 핸드오프가 장점.

**Q: Sonnet도 설계할 수 있지 않나요?**  
A: 간단한 건 가능. 하지만 복잡한 아키텍처는 Opus가 훨씬 나음.

**Q: 리뷰를 꼭 해야 하나요?**  
A: 필수! 지속적 개선의 핵심. 짧게라도 꼭 남기기.

---

**"설계는 Opus, 구현은 Sonnet" - 완벽한 TDD 협업!** 🎭