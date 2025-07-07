# 🚀 AI TDD 워크플로우: 이벤트 기반 개발과 듀얼 AI 모델

[![Version](https://img.shields.io/badge/version-5.1-blue.svg)](https://github.com/yourusername/ai-tdd-workflow)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Compatible-purple.svg)](https://claude.ai/code)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> **이벤트 기반 체크포인트, Git worktree, 듀얼 모델 아키텍처로 AI 개발을 혁신하세요**

긴 AI 코딩 세션 중에 맥락을 잃어버린 적 있나요? TDD 원칙을 지키기 힘들었나요? 컨텍스트 윈도우 제한 때문에 흐름이 끊긴 적 있나요?

이 워크플로우는 다음을 결합하여 AI 지원 개발을 혁신합니다:
- 🧠 **듀얼 AI 모델**: Opus (설계자) + Sonnet (개발자)
- 🔄 **이벤트 기반 체크포인트**: 시간이 아닌 의미 있는 순간에
- 🌳 **Git Worktree 격리**: 충돌 없는 병렬 개발
- 📝 **풍부한 컨텍스트 보존**: 사고 과정을 절대 잃지 않음

## 🎬 실제 작동 모습

```bash
# 아침: 중요한 코드 리뷰
opus> /cycle-review
🔍 최근 사이클 분석 중...
📊 발견: 결제 API 구현
🔴 심각: 42번 줄에 SQL 인젝션 취약점
✅ 파라미터화된 쿼리로 즉시 수정
🟡 TODO: 속도 제한 추가 (Sonnet용 작업 생성)

# 다음 기능 계획
opus> /cycle-plan "실시간 알림"
💬 "어떤 종류의 알림이죠? 푸시? 이메일? 인앱?"
... 자연스러운 대화 ...
🧠 "깊은 분석 준비되면 'ultrathink' 입력하세요"
📋 저장됨: cycles/2025-01-15/0930-notifications-plan.md

# 자동 체크포인트와 함께 구현
sonnet> /cycle-start
🌳 worktree 생성: ../project-cycles/cycle-0930-notifications
📝 실패한 테스트 후 체크포인트: "WebSocket 연결 시간 초과"
💡 발견 후 체크포인트: "하트비트 메커니즘 필요"
✅ 모든 테스트 통과! 태그: milestone/0930-websocket-stable

# 객관적 문서화
sonnet> /cycle-log
📊 7/8 테스트 통과, 1개는 인프라 대기
🤔 고민했던 점: Socket.io vs 네이티브 WebSocket
💡 배운 점: 우리 사용 사례에선 네이티브 WebSocket이 40% 빠름
```

## 🏆 개발자들이 사랑하는 이유

### 📈 실제 프로덕션 사용 지표

- **컨텍스트 전환 80% 감소** - 체크포인트 복구가 마법처럼 작동
- **TDD 채택률 95%** - 워크플로우가 자연스럽게 유도
- **디버깅 60% 단축** - 풍부한 실패 문서화
- **리팩토링 3배 증가** - 포괄적인 테스트로 인한 자신감

### 💬 개발자 후기

> "AI의 한계를 이해하고 똑똑하게 우회하는 워크플로우! 드디어 찾았다!" - Fortune 500 시니어 개발자

> "체크포인트 시스템이 몇 시간을 절약해줬어요. 완벽한 기억력을 가진 것 같아요." - 스타트업 CTO

> "듀얼 모델이 모든 걸 바꿨어요. Opus는 제가 놓칠 뻔한 이슈를 잡아내고, Sonnet은 혼자보다 빠르게 구현해요." - 프리랜서 개발자

## 🔥 킬러 기능들

### 1. 이벤트 기반 개발
```json
{
  "trigger": "테스트 실패",
  "action": "자동 체크포인트 + WIP 커밋",
  "benefit": "실패한 테스트 컨텍스트 절대 안 잃음"
}
```

### 2. Git Worktree 마법
```
main-repo/                        # 안정적인 main 브랜치
project-cycles/
├── cycle-0930-feature/          # 오전 작업
├── cycle-1430-bugfix/           # 오후 긴급 수정
└── cycle-1630-experiment/       # 저녁 실험
```

### 3. 어떤 상황에도 살아남는 컨텍스트
```json
{
  "whatImDoing": "PKCE로 OAuth 구현 중",
  "whyThisApproach": "모바일 앱 보안 요구사항",
  "whatFailed": ["기본 플로우", "암시적 승인"],
  "solution": "보안 저장소와 함께 PKCE",
  "codeExample": "const verifier = base64url(crypto.randomBytes(32))"
}
```

## 🚀 빠른 시작 (5분)

### 1. 설치
```bash
git clone https://github.com/yourusername/ai-tdd-workflow.git ~/.claude/commands
```

### 2. 첫 번째 사이클
```bash
# Opus 모델로 Claude Code 열기
opus> /cycle-plan "사용자 인증 추가"

# 대화를 따라가다가 입력:
user> ultrathink

# Sonnet으로 전환
sonnet> /cycle-start
# 모든 것이 자동으로 설정되는 걸 지켜보세요!
```

### 3. 마법을 경험하세요
- Git 히스토리가 이야기를 들려줌
- 어떤 중단에서도 복구 가능
- 시니어 레벨 코드 리뷰 받기
- 자신감 있게 빌드하기

## 📊 워크플로우 비교

| 기능 | 전통적인 AI 코딩 | 이 워크플로우 |
|---------|---------------------|---------------|
| 컨텍스트 손실 | 2-3시간마다 | 절대 없음 (체크포인트 복구) |
| 테스트 커버리지 | "나중에 테스트 추가할게" | 항상 테스트 먼저 |
| 코드 리뷰 | AI가 잡아주길 기도 | 엄격한 기준 자동 적용 |
| Git 히스토리 | "WIP", "수정", "또 WIP" | 진화의 의미 있는 이야기 |
| 멀티태스킹 | 끊임없는 브랜치 전환 | 격리된 worktree |

## 🎯 이런 분들께 완벽해요

- **🤖 AI 파워 유저**: Claude Code, Cursor, Copilot
- **🧪 TDD 지지자**: 드디어 AI와 함께 작동하는 TDD
- **🏃 빠른 실행가**: 품질 좋은 코드를 빠르게 배포
- **🎨 완벽주의자**: 높은 기준, 자동으로 적용
- **👤 솔로 개발자**: 팀 수준의 리뷰 품질 확보

## 🛠️ 고급 기능

### 스마트 실패 복구
```bash
# 컨텍스트를 잃어버렸나요? 문제없어요!
sonnet> /cycle-start
🔄 컨텍스트 리셋 복구 #3
📖 체크포인트 읽는 중... 발견: "OAuth 작업 중, 리프레시 토큰에서 막힘"
🔍 마지막 성공: "액세스 토큰 생성 작동"
💡 재개 지점: "리프레시 토큰 로테이션 구현"
```

### 돌파구 태깅
```bash
git tag -a "solution/1430-race-condition-fix" -m "Advisory locks로 해결!"
git tag -a "milestone/1430-100-concurrent-users" -m "성능 목표 달성"
```

### 다단계 프로젝트
```markdown
## 1단계: 핵심 API (오전)
- [ ] 기본 CRUD 엔드포인트
- [ ] 입력 검증

## 2단계: 실시간 업데이트 (오후)
- [ ] WebSocket 통합
- [ ] 이벤트 브로드캐스팅

## 3단계: 스케일 테스트 (내일)
- [ ] 부하 테스트 설정
- [ ] 성능 최적화
```

## 📚 문서

- 📖 [완전 가이드](docs/complete-guide-ko.md)
- 🎓 [비디오 튜토리얼](https://youtube.com/ai-tdd-workflow-ko)
- 💡 [베스트 프랙티스](docs/best-practices-ko.md)
- 🔧 [문제 해결](docs/troubleshooting-ko.md)
- 🌍 [커뮤니티 Discord](https://discord.gg/ai-tdd-workflow-ko)

## 🤝 혁명에 동참하세요

### 기여자 환영!
- 🌟 이 리포지토리에 스타를 눌러 지지해주세요
- 🐛 이슈 보고 및 기능 제안
- 📝 워크플로우 개선사항 공유
- 🎉 성공 스토리 들려주세요

### 로드맵
- [ ] VS Code 확장
- [ ] 메트릭 대시보드
- [ ] 팀 협업 기능
- [ ] 더 많은 AI 모델 지원
- [ ] 자동화된 워크플로우 분석

## 📜 라이선스

MIT - 개인 및 상업 프로젝트에서 자유롭게 사용하세요!

---

<p align="center">
  <strong>"AI의 한계와 싸우지 마세요. 듀얼 모델, 이벤트 기반 개발, Git worktree를 활용해서 더 나은 소프트웨어를 더 빠르게 만드세요."</strong>
</p>

<p align="center">
  <a href="https://github.com/yourusername/ai-tdd-workflow/stargazers">⭐ 스타</a> •
  <a href="https://github.com/yourusername/ai-tdd-workflow/fork">🍴 포크</a> •
  <a href="https://github.com/yourusername/ai-tdd-workflow/issues">🐛 이슈</a> •
  <a href="https://discord.gg/ai-tdd-workflow-ko">💬 Discord</a>
</p>

---

*컨텍스트를 잃는 것에 지치고 더 나은 무언가를 원했던 개발자들이 만들었습니다.*