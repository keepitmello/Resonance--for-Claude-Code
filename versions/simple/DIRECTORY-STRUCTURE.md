# 📁 AI TDD 워크플로우 디렉토리 구조

사용자가 두 버전 중 선택할 수 있도록 하는 제안 구조입니다.

## 🏗️ 제안하는 디렉토리 구조

```
~/.claude/commands/
├── README.md                      # 메인 README (버전 선택 가이드)
├── VERSION-COMPARISON.md          # 상세 버전 비교
├── LICENSE                        # MIT 라이선스
│
├── simple/                        # 🎯 Simple 버전 (v4.x)
│   ├── README.md                  # Simple 버전 전용 문서
│   ├── task.md                    # 작업 분석
│   ├── task-handoff.md           # 핸드오프
│   ├── task-review.md            # 리뷰
│   ├── task-complete.md          # 완료
│   └── architect.md              # 아키텍처 설계
│
├── worktree/                      # 🌳 Worktree 버전 (v5.x)
│   ├── README.md                  # Worktree 버전 전용 문서
│   ├── cycle-plan-[Opus].md      # 사이클 계획
│   ├── cycle-start-[Sonnet].md   # 사이클 시작
│   ├── cycle-check-[Opus].md     # 사이클 체크
│   └── cycle-log-[Sonnet].md     # 사이클 로그
│
├── shared/                        # 🔄 공통 명령어
│   └── wrap.md                   # 작업 마무리
│
├── docs/                          # 📚 문서
│   ├── installation.md           # 설치 가이드
│   ├── quickstart-simple.md     # Simple 버전 빠른 시작
│   ├── quickstart-worktree.md   # Worktree 버전 빠른 시작
│   ├── migration-guide.md       # 버전 간 마이그레이션
│   └── troubleshooting.md       # 문제 해결
│
└── examples/                      # 💡 예제
    ├── simple-workflow.md        # Simple 워크플로우 예제
    └── worktree-workflow.md      # Worktree 워크플로우 예제
```

## 🔀 심볼릭 링크 전략

사용자가 선택한 버전을 활성화하는 스크립트:

```bash
# activate-simple.sh
#!/bin/bash
cd ~/.claude/commands
ln -sf simple/* .
ln -sf shared/* .
echo "✅ Simple 버전 활성화됨!"

# activate-worktree.sh
#!/bin/bash
cd ~/.claude/commands
ln -sf worktree/* .
ln -sf shared/* .
echo "✅ Worktree 버전 활성화됨!"
```

## 🎯 대안: 프로필 기반 접근

`.claude-profile` 파일을 사용하는 방법:

```bash
# ~/.claude-profile
CLAUDE_WORKFLOW_VERSION="simple"  # 또는 "worktree"
```

Claude가 시작할 때 이 프로필을 읽어서 적절한 명령어 세트를 로드합니다.

## 📝 메인 README 구조

```markdown
# AI TDD 워크플로우

## 🤔 어떤 버전을 선택해야 할까요?

### 당신이 원하는 것이...

**✅ 빠르고 간단한 시작** → [Simple 버전](simple/README.md)
- Git 기초만 알아도 OK
- 5분 안에 시작 가능
- 직관적인 명령어

**✅ 강력한 병렬 개발** → [Worktree 버전](worktree/README.md)  
- Git 고급 기능 활용
- 동시 다중 작업
- 풍부한 컨텍스트 관리

### 🚀 빠른 시작

1. 버전 선택
2. 해당 폴더의 README 따라가기
3. 첫 TDD 사이클 시작!
```