---
description: Write session wrap-up log and commit
---

<SYSTEM>
You are Claude Sonnet 4, wrapping up a completed work session.
Create a comprehensive work log and commit all changes together.
</SYSTEM>

<CONTEXT>
This command is used at the end of a work session to:
1. Document what was accomplished 
2. Create a clean commit with all session changes
3. Maintain consistency with cycle folder structure
</CONTEXT>

<USER>

think: Create a wrap-up log for the completed work session.

## 📁 Work Session Logs
Document all work in: **cycles/YYYY-MM-DD/HHMM-topic-wrap.md**
- Format: HHMM-topic-wrap.md (e.g., 1655-customer-service-i18n-wrap.md)
- Use descriptive topic names that reflect the main work accomplished
- Integrated with cycle folder structure for consistency
- Required sections: goal · work accomplished · files changed · commit
- **CRITICAL: Get current date/time first, then write log BEFORE committing**

</USER>

<INSTRUCTION>
**CRITICAL FIRST STEPS**:
1. **GET CURRENT TIME**: Run `date '+%Y-%m-%d %H:%M:%S'` to get timestamp
2. **CHECK CYCLE FOLDER**: Look for cycles/YYYY-MM-DD/ folder (create if needed)
3. **DETERMINE FILENAME**: Use HHMM-topic-wrap format (e.g., 1655-customer-service-i18n-wrap.md)

**WORK LOG CREATION PROCESS**:
1. Review git status and git diff to understand all changes made
2. Create comprehensive work log documenting the session
3. Determine appropriate topic name based on main work accomplished
4. Use Write tool to save as cycles/YYYY-MM-DD/HHMM-topic-wrap.md
5. Commit everything together in one clean commit

**WORK LOG TEMPLATE**:
```markdown
# 📝 Work Session Wrap-up

**세션 시간**: YYYY-MM-DD HH:MM:SS  
**작업 유형**: [개발/수정/리팩토링/버그수정/문서화]

## 🎯 세션 목표
- [이번 세션에서 달성하려던 목표]

## ✅ 완료한 작업
### 주요 성과
- [구체적인 완료 사항들]

### 수정된 파일
```diff
+ path/to/new/file.ts (신규)
~ path/to/modified/file.ts (수정)
- path/to/deleted/file.ts (삭제)
```

## 🧪 품질 확인
- [ ] 테스트 통과: `pnpm test`
- [ ] 타입 체크: `pnpm typecheck` 
- [ ] 린트 검사: `pnpm lint`
- [ ] 빌드 확인: `pnpm build`

## 💭 배운 점 & 메모
- [이번 세션에서 배운 것이나 중요한 인사이트]

## 🔄 다음 세션 계획
- [다음에 할 일이나 주의사항]
```

**COMMIT PROCESS**:
1. Ensure all quality checks pass (tests, typecheck, lint)
2. Add all session files: `git add .`
3. Create single commit with work log included
4. Use conventional commit format in Korean

**COMMIT MESSAGE FORMAT**:
```
type(scope): 작업 내용 요약

- 주요 변경사항 1
- 주요 변경사항 2
- work session log 포함

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**QUALITY GATES** (STRICT RULE):
- All tests must pass: `pnpm test` ✅
- Playwright tests: `playwright test` ✅ 
- No TypeScript errors: `pnpm typecheck` ✅
- No lint errors: `pnpm lint` ✅
- Build must succeed: `pnpm build` ✅
- Only commit files modified in current session

**CONVENTIONAL COMMITS SPECIFICATION**:
```
Format: type(scope): subject

Types: feat, fix, docs, style, refactor, test, chore
Scope: web, api, shared, * (cross-cutting)
Subject: Korean imperative mood

Examples:
feat(web): 로그인 기능 추가
fix(web,api): 세션 공유 로직 수정
docs(commands): wrap 커맨드 cycle 구조로 개선
```

**CRITICAL FINAL STEPS**:
1. **SAVE LOG FILE**: Use Write tool to save wrap log to cycles/YYYY-MM-DD/HHMM-topic-wrap.md
2. **ADD ALL FILES**: `git add .` (includes work log)
3. **COMMIT TOGETHER**: Single commit with both code changes and work log
4. **NEVER** commit without quality gates passing
5. **NEVER** just output log to console - always save to file

Every commit must be a buildable, deployable snapshot!
</INSTRUCTION>

## 🔄 Integration with Cycle Workflow

This wrap command integrates seamlessly with the cycle-based workflow:
- **After cycle-log**: Use `/wrap` to finalize the session
- **Before switching**: Always wrap current session before context switch  
- **End of day**: Comprehensive session summary with all accomplishments

**File Location Consistency**:
```
cycles/2025-07-07/
├── 1449-deposit-bug-plan.md          # Opus planning
├── 1449-deposit-bug-log.md           # Sonnet implementation  
├── 1715-deposit-bug-wrap.md          # Session wrap-up
├── 1655-customer-service-i18n-wrap.md # Another session wrap-up
└── 1449-deposit-bug-checkpoint.json
```

The wrap log provides a higher-level view of the entire session, complementing the detailed cycle logs.

