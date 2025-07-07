# 🌳 Worktree 버전 가이드

> 병렬 개발과 고급 Git 기능이 필요한 파워 유저를 위한 고급 버전

## 🎯 Worktree 버전이란?

Git worktree 기능을 활용하여 진정한 병렬 개발을 가능하게 하는 고급 워크플로우입니다. 여러 작업을 동시에 진행하면서도 컨텍스트 손실 없이 작업을 이어갈 수 있습니다.

## ⚡ 주요 기능

### 🌳 Git Worktrees
- **스태시 없는 병렬 개발**: 여러 브랜치에서 동시 작업
- **격리된 작업 환경**: 각 작업마다 독립적인 워킹 디렉토리
- **즉시 브랜치 전환**: 스태시나 커밋 없이 작업 전환

### ⚡ 이벤트 기반 커밋
- **자동 진행 커밋**: 테스트/변경/발견 시 자동으로 Git 커밋 생성
- **작업 단위 추적**: 모든 작업 단계가 Git 히스토리로 기록
- **실시간 백업**: 작업 중 언제든 안전한 복구 지점 제공

### 🏷️ 스마트 태깅
- **마일스톤 태그**: 중요한 진행 단계 자동 태깅
- **솔루션 태그**: 문제 해결 지점 표시
- **브랜치 전략**: 체계적인 브랜치 관리

### 🔍 Git 기반 복구
- **히스토리 기반 컨텍스트**: Git 커밋 메시지와 diff로 컨텍스트 복원
- **시점별 복구**: 특정 시점으로 정확한 상태 복구
- **변경사항 추적**: 모든 코드 변경의 이유와 과정 추적

## 🎬 실제 사용 데모

### 계획 단계
```bash
# Opus가 Git 전략과 함께 계획 생성
opus> /cycle-plan "인증 리팩토링"
# → 계획 + Git worktree 설정
# → 브랜치 전략 수립
# → 체크포인트 간격 설정
```

### 구현 단계
```bash
# Sonnet이 자동 체크포인트와 함께 구현
sonnet> /cycle-start
# → 모든 테스트/변경이 Git 커밋 생성
# → 격리된 worktree에서 작업
# → 진행상황 절대 안 잃어버림
# → 실시간 브랜치별 진행 추적
```

### 리뷰 단계
```bash
# Opus가 전체 Git 히스토리와 함께 리뷰
opus> /cycle-check
# → 코드와 Git 커밋 패턴 모두 리뷰
# → 브랜치 머지 전략 검토
# → 히스토리 정리 제안
```

## 🔄 병렬 작업 시나리오

```
worktrees/
├── feature-auth/          # 인증 시스템 리팩토링
│   ├── src/auth/
│   └── .git -> main/.git/worktrees/feature-auth
├── bugfix-payment/        # 결제 버그 수정
│   ├── src/payment/
│   └── .git -> main/.git/worktrees/bugfix-payment
└── experiment-ui/         # UI 실험
    ├── src/components/
    └── .git -> main/.git/worktrees/experiment-ui
```

각 worktree에서 독립적으로 작업하면서:
- 컨텍스트 전환 없이 브랜치 이동
- 각각의 체크포인트와 히스토리 관리
- 필요시 즉시 다른 작업으로 전환

## 📊 Simple vs Worktree 비교

| 기능 | Simple | Worktree |
|------|---------|----------|
| **설정 시간** | 2분 | 10분 |
| **필요한 Git 경험** | 기초 | 중급 |
| **병렬 작업** | 순차적만 가능 | 진짜 병렬 가능 |
| **컨텍스트 보존** | JSON 체크포인트 | Git + 체크포인트 |
| **자동 커밋** | 없음 | 있음 |
| **브랜치 전환** | 수동 스태시 | 깔끔한 전환 |
| **작업 복구** | 파일 기반 | Git 히스토리 기반 |
| **멀티태스킹** | 제한적 | 완전한 지원 |

## 🚀 설치 및 시작

```bash
git clone https://github.com/yourusername/resonance.git
cd resonance
./activate-worktree.sh
```

### 첫 번째 사이클 시작
```bash
opus> /cycle-plan "첫 번째 작업"
# Opus가 워크트리 설정과 함께 계획 수립

sonnet> /cycle-start
# 자동으로 워크트리 생성 및 작업 시작
```

## 📚 관련 문서

- [Simple 버전과 비교](./README-ko.md)
- [Worktree 버전 빠른 시작](./versions/worktree/QUICKSTART-ko.md)
- [Git Worktree 가이드](./docs/git-worktree-guide-ko.md)

---

*고급 Git 기능을 활용한 진정한 병렬 개발을 경험해보세요.*