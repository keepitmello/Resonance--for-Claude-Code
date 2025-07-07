# 📦 NPM 배포 가이드

Resonance for Claude Code를 NPM 패키지로 배포하는 방법입니다.

## 🛠️ 사전 준비

### 1. NPM 계정 준비
```bash
# NPM 계정이 없다면 가입
npm adduser

# 기존 계정이 있다면 로그인
npm login
```

### 2. 패키지명 확인
```bash
# 패키지명이 사용 가능한지 확인
npm view @resonance/claude-commands

# 404 에러가 나와야 정상 (사용 가능)
```

## 🚀 배포 과정

### 1. 버전 확인 및 업데이트
```bash
# 현재 버전 확인
cat package.json | grep version

# 버전 업데이트 (필요시)
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.1 → 1.1.0
npm version major  # 1.1.0 → 2.0.0
```

### 2. 패키지 빌드 확인
```bash
# 배포될 파일들 확인
npm pack --dry-run

# 실제 tar 파일 생성 (테스트용)
npm pack
```

### 3. 로컬 테스트
```bash
# 로컬에서 글로벌 설치 테스트
npm install -g .

# 설치된 명령어 테스트
resonance-install

# 설치 제거
npm uninstall -g @resonance/claude-commands
```

### 4. NPM 배포
```bash
# 첫 배포 (scoped package는 public으로)
npm publish --access public

# 이후 배포
npm publish
```

## 📋 배포 전 체크리스트

- [ ] `package.json` 정보 확인
  - [ ] name: `@resonance/claude-commands`
  - [ ] version: 적절한 버전
  - [ ] description: 명확한 설명
  - [ ] keywords: 검색에 도움되는 키워드들
  - [ ] homepage, repository 링크
  
- [ ] 필수 파일들 포함 확인
  - [ ] `commands/` 폴더
  - [ ] `bin/install.js` 스크립트
  - [ ] `README.md`, `README-ko.md`
  
- [ ] 실행 권한 확인
  - [ ] `chmod +x bin/install.js`
  
- [ ] 로컬 테스트 완료
  - [ ] `node bin/install.js` 정상 작동
  - [ ] Claude Code에서 명령어 동작 확인

## 🔄 업데이트 배포

```bash
# 코드 수정 후
git add .
git commit -m "feat: update commands"

# 버전 업데이트
npm version patch

# 배포
npm publish

# Git에 태그 push
git push origin main --tags
```

## 🎯 사용자 설치 명령어

배포 완료 후 사용자들이 사용할 명령어:

```bash
# 한번만 실행하는 방식
npx @resonance/claude-commands

# 글로벌 설치 후 사용
npm install -g @resonance/claude-commands
resonance-install
```

## 🐛 트러블슈팅

### 권한 오류
```bash
# npm 로그인 상태 확인
npm whoami

# 로그아웃 후 다시 로그인
npm logout
npm login
```

### 패키지명 충돌
```bash
# 다른 이름으로 변경
# package.json에서 name 수정
"name": "@your-username/resonance-claude-commands"
```

### 파일이 포함되지 않음
```bash
# .npmignore 파일 확인 또는 삭제
# package.json의 files 배열 확인
```

## 📊 배포 후 확인

1. **NPM 페이지**: https://www.npmjs.com/package/@resonance/claude-commands
2. **설치 테스트**: `npx @resonance/claude-commands`
3. **다운로드 통계**: NPM 페이지에서 확인

---

**참고**: 첫 배포 시 NPM에서 패키지가 검색되기까지 몇 분 정도 걸릴 수 있습니다. 🚀