# 🛠️ AI TDD 워크플로우 설치 가이드

## 📋 사전 요구사항

### 모든 버전 공통
- Claude Code (Claude Pro 구독 필요)
- Git 2.x 이상
- 기본적인 터미널/명령줄 지식

### Worktree 버전 추가 요구사항
- Git 2.15+ (worktree 기능 필요)
- Git worktree 개념 이해
- 중급 이상의 Git 사용 경험

## 🎯 Simple 버전 설치 (초보자 친화적)

### 1. 기본 설치
```bash
# 리포지토리 클론
git clone https://github.com/yourusername/ai-tdd-workflow.git ~/.claude/commands

# Simple 버전 활성화
cd ~/.claude/commands
./activate-simple.sh
```

### 2. 첫 사용 테스트
```bash
# Claude Code 열기 (Opus 모델)
# 다음 명령어 입력:
/task "로그인 폼에 이메일 검증 추가"

# 깊은 분석이 필요하면:
ultrathink

# Sonnet으로 전환 후:
/task-handoff
```

### 3. 기본 워크플로우
```
1. Opus: /task → 문제 분석 및 계획
2. Opus: /task-handoff → Sonnet에게 전달
3. Sonnet: 구현 (TDD 사이클)
4. Sonnet: /task-complete → 완료 문서화
5. Opus: /task-review → 코드 리뷰
```

## 🌳 Worktree 버전 설치 (고급 사용자)

### 1. 사전 준비
```bash
# Git worktree 지원 확인
git --version  # 2.15 이상이어야 함

# 작업 디렉토리 구조 준비
mkdir -p ~/projects/my-project-cycles
```

### 2. 설치 및 설정
```bash
# 리포지토리 클론
git clone https://github.com/yourusername/ai-tdd-workflow.git ~/.claude/commands

# Worktree 버전 활성화
cd ~/.claude/commands
./activate-worktree.sh

# Git 설정 (선택사항)
git config --global alias.wt 'worktree'
git config --global alias.wtl 'worktree list'
```

### 3. 첫 사이클 시작
```bash
# Claude Code 열기 (Opus 모델)
opus> /cycle-plan "실시간 알림 시스템"
# 대화형 계획 수립...
user> ultrathink
# 깊은 분석 수행...

# Sonnet으로 전환
sonnet> /cycle-start
# 자동으로 worktree 생성 및 체크포인트 시작
```

### 4. Worktree 관리
```bash
# 활성 worktree 확인
git worktree list

# 특정 사이클로 이동
cd ../project-cycles/cycle-0930-notifications

# 완료된 worktree 정리
git worktree remove cycle-0930-notifications
```

## 🔧 고급 설정

### 환경 변수 설정
```bash
# ~/.bashrc 또는 ~/.zshrc에 추가
export CLAUDE_COMMANDS_PATH="$HOME/.claude/commands"
export CLAUDE_WORKFLOW_VERSION="worktree"  # 또는 "simple"
```

### 커스텀 단축키 (선택사항)
```bash
# Simple 버전 별칭
alias ct="/task"
alias cth="/task-handoff"
alias ctr="/task-review"

# Worktree 버전 별칭
alias ccp="/cycle-plan"
alias ccs="/cycle-start"
alias ccl="/cycle-log"
alias ccc="/cycle-check"
```

### VS Code 통합 (계획 중)
```json
// .vscode/settings.json
{
  "claude.workflow.version": "worktree",
  "claude.workflow.autoCheckpoint": true,
  "claude.workflow.gitWorktreePath": "../project-cycles"
}
```

## 🚨 문제 해결

### Simple 버전
```bash
# 명령어가 작동하지 않을 때
1. ~/.claude/commands 폴더 확인
2. task*.md 파일들이 있는지 확인
3. Claude Code 재시작

# Git 충돌 발생 시
1. 현재 브랜치 확인: git branch
2. 충돌 해결: git status로 확인
3. 필요시 /task-review로 도움 요청
```

### Worktree 버전
```bash
# worktree 생성 실패
1. Git 버전 확인: git --version
2. 디스크 공간 확인
3. 권한 확인: ls -la ../

# 체크포인트 복구 실패
1. checkpoint.json 파일 확인
2. 수동 복구: cat cycles/*/checkpoint.json
3. 최악의 경우: 이전 커밋에서 복구

# 너무 많은 worktree
git worktree list  # 목록 확인
git worktree prune  # 정리
```

## 🎓 학습 자료

### Simple 버전
1. [Git 기초](https://git-scm.com/book/ko/v2)
2. [TDD 소개](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
3. [Simple 워크플로우 비디오](https://youtube.com/simple-workflow)

### Worktree 버전
1. [Git Worktree 완벽 가이드](https://git-scm.com/docs/git-worktree)
2. [이벤트 기반 개발](https://martinfowler.com/articles/201701-event-driven.html)
3. [Worktree 워크플로우 마스터클래스](https://youtube.com/worktree-masterclass)

## 💡 팁과 트릭

### 빠른 전환
```bash
# Simple ↔ Worktree 전환
~/.claude/commands/switch-version.sh

# 임시로 다른 버전 사용
CLAUDE_WORKFLOW_VERSION=simple claude
```

### 백업과 복구
```bash
# 워크플로우 설정 백업
cp -r ~/.claude/commands ~/claude-backup-$(date +%Y%m%d)

# 복구
cp -r ~/claude-backup-20250107/* ~/.claude/commands/
```

## 🤝 도움 받기

- 📧 이메일: support@ai-tdd-workflow.com
- 💬 Discord: [커뮤니티 서버](https://discord.gg/ai-tdd-workflow)
- 🐛 이슈: [GitHub Issues](https://github.com/yourusername/ai-tdd-workflow/issues)
- 📖 위키: [상세 문서](https://github.com/yourusername/ai-tdd-workflow/wiki)