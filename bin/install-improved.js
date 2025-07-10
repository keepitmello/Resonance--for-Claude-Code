#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");
const readline = require("readline");

const CLAUDE_COMMANDS_DIR = path.join(os.homedir(), ".claude", "commands");
const BACKUP_DIR = path.join(CLAUDE_COMMANDS_DIR, "backup");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper: 사용자 확인 대기
async function waitForEnter(message = "") {
  return new Promise((resolve) => {
    const prompt = message || "계속하려면 Enter를 누르세요...";
    rl.question(`\n${prompt} `, () => resolve());
  });
}

// Helper: 진행률 표시
function showProgress(current, total, message) {
  const percent = Math.round((current / total) * 100);
  process.stdout.write(`\r${message} [${current}/${total}] ${percent}%`);
  if (current === total) console.log(" ✅");
}

// 배너는 간결하게
function showBanner() {
  console.log("\n=== RESONANCE for Claude Code ===");
  console.log("AI TDD workflow with Opus-Sonnet-You\n");
}

// 언어 선택
async function selectLanguage() {
  return new Promise((resolve) => {
    console.log("언어 선택 / Select Language:");
    console.log("  1) English");
    console.log("  2) 한국어\n");

    rl.question("선택 (1/2): ", (answer) => {
      const choice = answer.trim();
      if (choice === "1") resolve("en");
      else if (choice === "2") resolve("ko");
      else {
        console.log("잘못된 선택입니다.\n");
        selectLanguage().then(resolve);
      }
    });
  });
}

// 메인 설치 로직
async function install() {
  showBanner();
  
  const language = await selectLanguage();
  const SOURCE_DIR = path.join(__dirname, "..", `commands(${language})`);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").split("T")[0];
  
  console.log(language === "ko" ? "\n설치를 시작합니다..." : "\nStarting installation...");
  
  // Step 1: 환경 확인
  console.log(language === "ko" ? "\n1. 환경 확인 중..." : "\n1. Checking environment...");
  
  if (!fs.existsSync(path.join(os.homedir(), ".claude"))) {
    console.error(language === "ko" 
      ? "❌ Claude Code가 설치되어 있지 않습니다!" 
      : "❌ Claude Code is not installed!");
    rl.close();
    process.exit(1);
  }
  
  // 디렉토리 생성
  if (!fs.existsSync(CLAUDE_COMMANDS_DIR)) {
    fs.mkdirSync(CLAUDE_COMMANDS_DIR, { recursive: true });
  }
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  
  console.log("   ✅ " + (language === "ko" ? "환경 확인 완료" : "Environment ready"));
  
  await waitForEnter();
  
  // Step 2: 파일 설치
  console.log(language === "ko" ? "\n2. 파일 설치 중..." : "\n2. Installing files...");
  
  const commandFiles = fs.readdirSync(SOURCE_DIR).filter(file => file.endsWith(".md"));
  const total = commandFiles.length;
  
  commandFiles.forEach((file, index) => {
    const sourcePath = path.join(SOURCE_DIR, file);
    const destPath = path.join(CLAUDE_COMMANDS_DIR, file);
    
    // 백업이 필요한 경우
    if (fs.existsSync(destPath)) {
      const backupPath = path.join(BACKUP_DIR, `${file}.backup.${timestamp}`);
      fs.copyFileSync(destPath, backupPath);
    }
    
    fs.copyFileSync(sourcePath, destPath);
    showProgress(index + 1, total, "   설치 진행");
  });
  
  // Step 3: 설정 저장
  const CONFIG_FILE = path.join(os.homedir(), ".claude", "resonance-config.json");
  const config = {
    language: language,
    installedAt: new Date().toISOString(),
    version: "1.5.0"
  };
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  
  // 완료 요약
  console.log("\n" + "=".repeat(50));
  console.log(language === "ko" ? "✅ 설치 완료!" : "✅ Installation Complete!");
  console.log("=".repeat(50));
  
  console.log(language === "ko" ? "\n📋 빠른 시작:" : "\n📋 Quick Start:");
  console.log("   opus> /cycle-plan    " + (language === "ko" ? "(계획)" : "(Plan)"));
  console.log("   sonnet> /cycle-start " + (language === "ko" ? "(구현)" : "(Implement)"));
  
  console.log(language === "ko" ? "\n📚 더 알아보기:" : "\n📚 Learn More:");
  console.log("   - " + (language === "ko" ? "전체 명령어" : "All commands") + ": ~/.claude/commands/");
  console.log("   - GitHub: https://github.com/keepitmello/Resonance--for-Claude-Code");
  
  console.log(language === "ko" 
    ? "\n💡 팁: Claude Code를 재시작하면 명령어를 사용할 수 있습니다."
    : "\n💡 Tip: Restart Claude Code to use the commands.");
  
  rl.close();
}

// 실행
install().catch((err) => {
  console.error("Installation failed:", err);
  rl.close();
  process.exit(1);
});