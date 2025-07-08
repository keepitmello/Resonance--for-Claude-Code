#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const CLAUDE_COMMANDS_DIR = path.join(os.homedir(), '.claude', 'commands');
const SOURCE_DIR = path.join(__dirname, '..', 'commands');
const BACKUP_DIR = path.join(CLAUDE_COMMANDS_DIR, 'backup');

console.log('🚀 Resonance™ for Claude Code 설치 시작...\n');

// Claude Code가 설치되어 있는지 확인
if (!fs.existsSync(path.join(os.homedir(), '.claude'))) {
  console.error('❌ Claude Code가 설치되어 있지 않습니다!');
  console.error('   Claude Code를 먼저 설치해주세요: https://claude.ai/code');
  process.exit(1);
}

// commands 폴더 생성 (없다면)
if (!fs.existsSync(CLAUDE_COMMANDS_DIR)) {
  console.log('📁 .claude/commands 폴더 생성 중...');
  fs.mkdirSync(CLAUDE_COMMANDS_DIR, { recursive: true });
}

// 백업 폴더 생성
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// 기존 Resonance 파일들 백업
console.log('💾 기존 파일 백업 중...');
const resonanceFiles = [
  'cycle-plan-[Opus].md',
  'cycle-start-[Sonnet].md', 
  'cycle-check-[Opus].md',
  'cycle-log-[Sonnet].md'
];

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
resonanceFiles.forEach(file => {
  const sourcePath = path.join(CLAUDE_COMMANDS_DIR, file);
  if (fs.existsSync(sourcePath)) {
    const backupPath = path.join(BACKUP_DIR, `${file}.backup.${timestamp}`);
    fs.copyFileSync(sourcePath, backupPath);
    console.log(`  ✅ ${file} → backup/`);
  }
});

// Resonance commands 복사
console.log('\n📋 Resonance commands 설치 중...');
const commandFiles = fs.readdirSync(SOURCE_DIR).filter(file => file.endsWith('.md'));

commandFiles.forEach(file => {
  const sourcePath = path.join(SOURCE_DIR, file);
  const destPath = path.join(CLAUDE_COMMANDS_DIR, file);
  
  fs.copyFileSync(sourcePath, destPath);
  console.log(`  ✅ ${file} 설치 완료`);
});

console.log('\n🎉 Resonance™ 설치 완료!\n');
console.log('💡 사용법:');
console.log('  Claude Code에서:');
console.log('  ');
console.log('  opus> /cycle-plan');
console.log('  "작업 계획"');
console.log('  ');
console.log('  sonnet> /cycle-start'); 
console.log('  "구현 시작"');
console.log('  ');
console.log('  opus> /cycle-check');
console.log('  "품질 검토"');
console.log('\n✨ Opus가 질문하고, Sonnet이 구현하는 AI TDD 워크플로우를 경험해보세요!');
console.log('\n📚 자세한 사용법: https://github.com/keepitmello/Resonance--for-Claude-Code');