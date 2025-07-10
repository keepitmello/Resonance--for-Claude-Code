# 🚀 Resonance™ for Claude Code

> **⚠️ 중요 업데이트 (2025년 1월 8일)**: 버전 1.4.0 출시! 커맨드 구조가 크게 개선되었습니다. `npm update -g claude-resonance`로 업데이트하거나 `npx claude-resonance`로 최신 버전을 사용하세요.

> Auto-Compact로 컨텍스트가 날아갔나요? 끝없이 버그 수정 중인가요?  
> **체계적인 Resonance™ 워크플로우로 해결하세요.**

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Made with Claude](https://img.shields.io/badge/Made%20with-Claude-purple.svg)](https://claude.ai)
[![Resonance](https://img.shields.io/badge/Resonance-for%20Claude%20Code-blue.svg)](https://github.com/keepitmello/Resonance--for-Claude-Code)

**Opus-Sonnet-그리고 당신, 3인 협업 체계.**

[English](./README.md) | [한국어](./README-ko.md) | [철학](./PHILOSOPHY.md) | [프롬프트 엔지니어링 가이드](./RESONANCE-PROMPT-ENGINEERING-GUIDE.md) | [문서](./docs/README-ko.md)

</div>

## 🔥 우리 모두가 겪는 문제

Claude Code에서 Plan → Act 모드 사용 중 이런 문제들이 있었나요?

- 💔 **20k 컨텍스트 윈도우**: Auto-Compact로 최초 설계 내용 중 일부가 유실되어 코드 퀄리티가 떨어짐
- 🔄 **테스트-수정 루프**: AI 코드 받고 → 테스트 → 에러 → 수정 요청 → 반복...
- 🔍 **작업 기록 없음**: 이전 작업 기록이 채팅에만 묻혀 있음
- 🤖 **AI의 추측**: 니즈 이해 없이 코드만 던져서 계속 수정 요청

## 💡 AI가 다르게 작동한다면?

<table>
<tr>
<td width="50%">

### ❌ 지금의 현실

```
나: "API 구현해줘"
AI: "500줄 코드 여기있어요!"
나: [테스트해봄] "에러 나는데..."
AI: "아 그거 수정했어요!"
나: [또 테스트] "이번엔 다른 에러..."
AI: "이것도 고쳤어요!"
나: [또 테스트] "또 안 돼..."
   (무한 루프...)
```

</td>
<td width="50%">

### ✅ AI TDD 워크플로우

```
나: "결제 API 구현해줘"
Opus: "실제 돈이 오가는 거니까 신중해야 해요.
같은 결제가 두 번 처리되면 어떻게 할 거예요?"
나: "어... 그런 경우가 있나?"
Opus: "네트워크 오류로 재시도할 때 자주 발생해요.
또 환불이나 부분 취소는요?"

[충분한 정보 수집 후...]

Opus: "좋아, 이제 완전히 이해했어!
'ultrathink'라고 입력하면 상세 설계 들어갈게."
나: "ultrathink"

[Phase 2: 깊은 분석...]

Opus: "분석 완료! 이렇게 설계했어:

🧪 테스트 시나리오 (5개)
1. 정상 결제 플로우
2. 중복 요청 방지 (idempotency key)
3. 네트워크 타임아웃 처리
4. 부분 환불 검증
5. Webhook 실패 재시도

🏗️ 구현 전략
- PaymentService 인터페이스로 추상화
- DB 트랜잭션으로 일관성 보장
- 에러 로깅 및 모니터링

계획을 cycles/2025-07-08/1430-payment-api-plan.md에 저장했어!"
```

</td>
</tr>
</table>

## 📚 Resonance 이해하기

Resonance 철학과 기존 AI 코딩과의 근본적인 차이점을 더 깊이 이해하려면 [철학 문서](./PHILOSOPHY.md)를 참고하세요.

## 🔄 근본적인 변화

```
기존 AI 코딩:                    AI TDD 워크플로우:

┌─────────────────┐              ┌─────────────────┐
│ 나: "X 만들어줘"   │              │ 나: "X 만들어줘"   │
└────────┬────────┘              └────────┬────────┘
         │                                │
         ▼                                ▼
┌─────────────────┐              ┌─────────────────┐
│ AI: 코드 여기요    │              │ Opus: 먼저       │
│   (테스트 없음)    │              │ 이해할게요...      │
└────────┬────────┘              │ - X가 뭐예요?     │
         │                       │ - 엣지케이스는?    │
         ▼                       │ - 제약사항은?      │
┌─────────────────┐              └────────┬────────┘
│ 나: 테스트해봄     │                       │
│ "에러 나네..."    │                       ▼
└────────┬────────┘              ┌─────────────────┐
         │                       │ 나: [답변]        │
         ▼                       └────────┬────────┘
┌─────────────────┐                       │
│ AI: "수정했어요"   │                       ▼
└────────┬────────┘              ┌─────────────────┐
         │                       │ Opus: TDD 계획  │
         ▼                       │ ultrathink 발동 │
┌─────────────────┐              └────────┬────────┘
│ 나: 또 테스트      │                       │
│ "또 다른 에러"     │                       ▼
└────────┬────────┘              ┌─────────────────┐
         │                       │ Sonnet: 테스트    │
         ▼                       │ 먼저 + 구현       │
    (무한 루프...)                 └────────┬────────┘
                                          │
                                          ▼
                                ┌─────────────────┐
                                │ Opus: 같이 리뷰   │
                                │ - 코드 품질은?     │
                                │ - 놓친 케이스?     │
                                │ - 더 나은 방법?    │
                                └────────┬────────┘
                                         │
                                         ▼
                                 검증되고 개선된 코드!
```

## 🌟 v1.4.0 주요 변경사항

- **원칙 중심 설계**: 경직된 템플릿 대신 핵심 원칙에 집중하는 커맨드
- **예제 분리**: 모든 예제를 `examples/` 폴더로 이동하여 더 깨끗하고 유연한 가이드라인 제공
- **한국어 지원 강화**: 성능 최적화를 위해 영어 시스템 프롬프트 사용
- **철학 문서화**: 핵심 개념을 설명하는 [PHILOSOPHY.md](./PHILOSOPHY.md) 추가

## 🚀 빠른 설치

### ⚡ NPM 패키지

**방법 1: 바로 실행 (설치 없이)**
```bash
npx claude-resonance
```

**방법 2: 전역 설치 (권장)**
```bash
# 전역 설치
npm install -g claude-resonance

# 설치 실행
resonance
```

설치 시 언어를 선택할 수 있습니다 (한국어/English).

> **npx vs npm -g 차이:**
> - `npx`: 매번 최신 버전 다운로드 후 실행 (느리지만 항상 최신)
> - `npm -g`: 한 번 설치 후 빠르게 실행 (수동 업데이트 필요)

**시스템 요구사항:**

- **macOS 전용** (macOS 15.5+에서 테스트됨)
- **Claude Code**가 기본 위치(`~/.claude/`)에 설치되어 있어야 함
- npm/npx 사용 가능한 터미널

### 🔧 수동 설치 (대안)

#### macOS

```bash
# 레포지토리 클론
git clone https://github.com/keepitmello/Resonance--for-Claude-Code.git
cd Resonance--for-Claude-Code

# 설치 및 활성화
./activate-simple.sh
```

#### Windows (WSL)

**중요**: 모든 명령어는 WSL 터미널에서 실행해야 합니다. PowerShell이나 CMD가 아닙니다.

```bash
# WSL 터미널 열기 (Ubuntu/Debian 권장)
# 레포지토리 클론
git clone https://github.com/keepitmello/Resonance--for-Claude-Code.git
cd Resonance--for-Claude-Code

# Claude Code 디렉토리에 커맨드 파일 복사
# 영어 버전:
cp commands\(en\)/*.md ~/.claude/commands/

# 한국어 버전:
cp commands\(ko\)/*.md ~/.claude/commands/

# Claude Code 재시작
```

### 🚨 호환성 안내

- **macOS**: 자동 설치 완벽 지원
- **Windows**: 수동 설치만 가능 (WSL 필수)
- **Linux**: 수동 설치 (곧 지원 예정)
- **Claude Code**가 `~/.claude/commands/`에 설치되어 있어야 함
- 설치 스크립트가 기존 파일을 자동으로 백업 (macOS만 해당)

## 🚀 사용법

**📌 중요: Claude Code 세션을 2개 열어야 합니다**

- 세션 1: Opus 모드 (계획/리뷰)
- 세션 2: Sonnet 모드 (구현)

### 🎯 자동으로 두 세션 열기

설치 완료 후 자동으로 두 세션을 열려면:
```bash
resonance-start
```

또는 설치 없이 npx로 바로 실행:
```bash
npx -p claude-resonance resonance-start
```

위 명령어가 자동으로 Opus와 Sonnet 세션을 각각 새 터미널에서 열어줍니다!

### 📝 수동으로 열기

설치 완료 후 터미널을 두 개 열어야 합니다:

1. 첫 번째 터미널을 열고 실행:
   ```bash
   claude --model opus
   ```

2. 두 번째 터미널을 열고 실행:
   ```bash
   claude --model sonnet
   ```

그다음 아래 커맨드로 Resonance 워크플로우를 시작하세요:

### 📝 /cycle-plan (Opus 세션)

Opus 세션은 사용자와 능동적으로 소통하여 충분히 질문하고 분석한 후 계획을 수립하여 문서화하고, 체크포인트를 제작합니다. 테스트 주도 개발 방식으로 설계하여 기존 AI 코딩과는 다르게 1차적으로 검증된 코드를 유도합니다.

```bash
opus> /cycle-plan "결제 API 구현"
# Phase 1: 대화로 요구사항 파악
# "ultrathink" 입력으로 Phase 2 진입
# Phase 2: 깊은 분석과 TDD 계획 수립
# cycles/YYYY-MM-DD/HHMM-topic-plan.md 저장
```

### 🔨 /cycle-start (Sonnet 세션)

Sonnet 세션은 Opus의 설계를 바탕으로, 주니어 개발자처럼, 왜 그렇게 구현했는지, 어떤 부분이 어렵거나 모호했는지 등의 '판단'들을 체크포인트에 채워가며 개발합니다. Auto-Compact가 진행되어도 별도의 체크포인트를 바탕으로 컨텍스트가 손실되지 않습니다.

```bash
sonnet> /cycle-start
# plan.md 읽고 TDD 구현 시작
# checkpoint.json 생성/업데이트
# 20-30분마다 상세 진행상황 기록
```

### 📋 /cycle-log (Sonnet 세션)

구현 작업을 마무리하면서 무엇을 했는지, 어떤 결정을 내렸는지, 무엇을 배웠는지 문서화합니다. 이 로그는 다음 Opus 계획 세션에 중요한 자료가 됩니다.

```bash
sonnet> /cycle-log
# 완료된 작업 문서화
# 기술적 결정사항과 이유 기록
# 실패와 성공 경험 공유
# cycles/YYYY-MM-DD/HHMM-topic-log.md 저장
```

### ✅ /cycle-check (Opus 세션)

작업이 완료되면, 다시 Opus 세션으로 돌아와서 초기 설계와 맞게 잘 진행되었는지, 추가 작업이 필요한 부분은 없는지 검토를 진행합니다.

```bash
opus> /cycle-check
# Sonnet 구현 결과 검토
# 코드 품질 비판적 분석
# 개선 사항 피드백
```

### 📝 /wrap (어느 세션이든)

작업 세션을 수동으로 마무리하고 종합적인 로그를 작성한 후 모든 변경사항을 하나의 커밋으로 정리합니다. 전체 사이클 워크플로우를 거치지 않고 작업을 마무리하고 싶을 때 유용합니다.

```bash
# Opus 또는 Sonnet 세션에서
> /wrap
# 종합적인 작업 세션 로그 생성
# 모든 성과와 변경사항 문서화
# 깔끔한 단일 커밋으로 모든 작업 커밋
# cycles/YYYY-MM-DD/HHMM-topic-wrap.md로 저장
```

이런 경우에 사용하세요:
- 사이클 워크플로우 외부에서 작업 세션을 마무리할 때
- 적절한 문서화와 함께 모든 작업을 커밋해야 할 때
- 나중에 참고할 세션 요약을 만들고 싶을 때

## 🤝 협업 사례

<details>
<summary>사례 1: React Context 성능 문제 해결</summary>

```
나: /cycle-plan "실시간 거래 시스템에 호가 데이터 추가"

Opus: "현재 MarketDataContext 하나로 다 관리하죠?
호가는 초당 수십 번 업데이트되는데 모든 컴포넌트가 리렌더링될 거예요."

나: "그럼 어떻게 해야 해?"

Opus: "Context 분리하면 어때요?
- MarketDataContext: 가격 (덜 빈번)
- OrderBookContext: 호가 (매우 빈번)
- TradingContext: 리스크 관리 (사용자별)

네트워크 지연으로 오래된 데이터가 나중에 올 수도 있어요."

[ultrathink...]

Opus: "OrderBookManager 클래스로 lastUpdateId 순서 검증하고,
React.memo로 리렌더링 최적화해요."
```

**진짜 차이**: 단순 기능 추가 → 아키텍처 레벨 성능 최적화

</details>

<details>
<summary>사례 2: 🔥 프로덕션 버그 4시간 완전 복구</summary>

**상황**: deposit 버그로 35건 거래 오류, 19명 사용자 피해

```bash
# 2:49 PM - 사용자 신고: "입금에 수수료가 차감됐어요"

opus> /cycle-plan "긴급 복구"
Opus: "MCP로 DB 확인... 35건 발견. 정각 시간대 패턴 보니
관리자 배치 작업 버그네요. 복구 전략:
1. admin_refund로 보상 (원본 보존)
2. 실시간 검증하며 복구
3. 재발 방지 시스템 구축"

sonnet> /cycle-start
✅ 35건 admin_refund 생성
✅ 19개 계좌 업데이트
✅ 2,935원 환불 완료

⚠️ 추가 신고: "환불이 2배로..."
🚀 즉시 수정: 이중 적용 오류 발견 후 correction

opus> /cycle-check
Opus: "재발 방지 즉시 구현하세요"
✅ DB 트리거로 deposit+fee 차단
✅ 의심 패턴 실시간 모니터링
✅ 관리자 작업 로깅 시스템
```

**결과**: 4시간 내 100% 복구 + 재발 방지 시스템 완성  
**차이점**: 임시방편 ❌ → 분석→복구→근본해결 ✅

</details>

## 📁 체계적인 작업 기록 관리

```
cycles/2025-07-07/
├── 1449-deposit-bug-plan.md         # Opus 계획
├── 1449-deposit-bug-checkpoint.json # 실시간 진행상황
├── 1449-deposit-bug-log.md          # Sonnet 구현 결과
└── 1449-recovery-execution.sql      # 실제 복구 스크립트
```

**핵심**: Auto-Compact으로 컨텍스트 날아가도 checkpoint.json으로 정확히 재개

- 완료된 작업, 진행 중인 작업
- 내린 결정들과 이유
- 막힌 부분과 시도한 해결책
- 다음 단계와 blockers

**결과**: 컨텍스트 손실 없이 작업 연속성 보장

## 📊 실제 성과

**이전**: 컨텍스트 손실 → 테스트-수정 무한루프 → 좌절감  
**1주일 후**: 컨텍스트 보존 → TDD로 한 번에 완성 → 몰입감

## 🚀 지금 시작하세요

```bash
# 빠른 시작 (설치 없이)
npx claude-resonance

# 또는 자주 사용한다면 전역 설치
npm install -g claude-resonance
resonance
```

**⚠️ macOS 전용** | Claude Code가 `~/.claude/`에 있어야 함

각 Claude Code 세션에서:

```
# 세션 1 (Opus 세션에서)
/cycle-plan

# 세션 2 (Sonnet 세션에서) 
/cycle-start

/cycle-log

# 세션 1 (Opus 세션으로 돌아가서)
/cycle-check
```

Opus가 질문하고, 깊이 이해하고, 계획을 만들어요.
Sonnet이 테스트와 함께 구현해요. 풍부한 작업 로그로 컨텍스트를 유지합니다.

---

<div align="center">

### 체계적인 AI TDD 워크플로우로 작업의 질을 향상하세요.

[⭐ GitHub에서 스타 주기](https://github.com/keepitmello/Resonance--for-Claude-Code) | [🐦 트위터에 공유](https://twitter.com/intent/tweet?text=Resonance%20for%20Claude%20Code%20발견!%20먼저%20물어보고%2C%20테스트%20코드%20작성하고%2C%20체계적인%20작업%20관리하는%20AI%20TDD%20워크플로우.%20%23AI코딩%20게임체인저%20%F0%9F%9A%80&url=https%3A%2F%2Fgithub.com%2Fkeepitmello%2FResonance--for-Claude-Code)

</div>
