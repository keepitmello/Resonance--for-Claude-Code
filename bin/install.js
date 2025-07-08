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

// Show banner with ASCII art
console.log("");
console.log(
  "    ╭─────────────────────────────────────────────────────────────────╮"
);
console.log(
  "    │                                                                 │"
);
console.log(
  "    │   ╔═╗  ╔═╗  ╔═╗  ╔═╗  ╔╗╔  ╔═╗  ╔╗╔  ╔═╗  ╔═╗                 │"
);
console.log(
  "    │   ╠╦╝  ║╣   ╚═╗  ║ ║  ║║║  ╠═╣  ║║║  ║    ║╣                  │"
);
console.log(
  "    │   ╩╚═  ╚═╝  ╚═╝  ╚═╝  ╝╚╝  ╩ ╩  ╝╚╝  ╚═╝  ╚═╝  ™              │"
);
console.log(
  "    │                                                                 │"
);
console.log(
  "    │                       for Claude Code ✨                      │"
);
console.log(
  "    │                                                                 │"
);
console.log(
  "    │              AI TDD workflow with Opus-Sonnet-You               │"
);
console.log(
  "    │                                                                 │"
);
console.log(
  "    ╰─────────────────────────────────────────────────────────────────╯"
);
console.log("");

// Language selection
function selectLanguage() {
  return new Promise((resolve) => {
    console.log("Select your language / 언어를 선택하세요:\n");
    console.log("  1) English");
    console.log("  2) 한국어 (Korean)\n");

    rl.question("Enter your choice (1 or 2): ", (answer) => {
      const choice = answer.trim();
      if (choice === "1") {
        resolve("en");
      } else if (choice === "2") {
        resolve("ko");
      } else {
        console.log("\n❌ Invalid choice. Please enter 1 or 2.\n");
        selectLanguage().then(resolve);
      }
    });
  });
}

async function install() {
  const language = await selectLanguage();
  const SOURCE_DIR = path.join(__dirname, "..", `commands(${language})`);

  console.log(
    "\n" +
      (language === "ko"
        ? "설치를 시작합니다..."
        : "Starting installation...") +
      "\n"
  );

  // Claude Code가 설치되어 있는지 확인
  if (!fs.existsSync(path.join(os.homedir(), ".claude"))) {
    if (language === "ko") {
      console.error("❌ Claude Code가 설치되어 있지 않습니다!");
      console.error(
        "   Claude Code를 먼저 설치해주세요: https://claude.ai/code"
      );
    } else {
      console.error("❌ Claude Code is not installed!");
      console.error(
        "   Please install Claude Code first: https://claude.ai/code"
      );
    }
    rl.close();
    process.exit(1);
  }

  // commands 폴더 생성 (없다면)
  if (!fs.existsSync(CLAUDE_COMMANDS_DIR)) {
    console.log(
      language === "ko"
        ? "📁 .claude/commands 폴더 생성 중..."
        : "📁 Creating .claude/commands directory..."
    );
    fs.mkdirSync(CLAUDE_COMMANDS_DIR, { recursive: true });
  }

  // 백업 폴더 생성
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  // 기존 Resonance 파일들 백업
  console.log(
    language === "ko"
      ? "💾 기존 파일 백업 중..."
      : "💾 Backing up existing files..."
  );
  const resonanceFiles = [
    "cycle-plan-[Opus].md",
    "cycle-start-[Sonnet].md",
    "cycle-check-[Opus].md",
    "cycle-log-[Sonnet].md",
  ];

  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-")
    .split("T")[0];
  resonanceFiles.forEach((file) => {
    const sourcePath = path.join(CLAUDE_COMMANDS_DIR, file);
    if (fs.existsSync(sourcePath)) {
      const backupPath = path.join(BACKUP_DIR, `${file}.backup.${timestamp}`);
      fs.copyFileSync(sourcePath, backupPath);
      console.log(`  ✅ ${file} → backup/`);
    }
  });

  // Resonance commands 복사
  console.log(
    language === "ko"
      ? "\n📋 Resonance commands 설치 중..."
      : "\n📋 Installing Resonance commands..."
  );
  const commandFiles = fs
    .readdirSync(SOURCE_DIR)
    .filter((file) => file.endsWith(".md"));

  commandFiles.forEach((file) => {
    const sourcePath = path.join(SOURCE_DIR, file);
    const destPath = path.join(CLAUDE_COMMANDS_DIR, file);

    fs.copyFileSync(sourcePath, destPath);
    console.log(
      `  ✅ ${file} ${language === "ko" ? "설치 완료" : "installed"}`
    );
  });

  console.log(
    language === "ko"
      ? "\n🎉 Resonance™ 설치 완료!\n"
      : "\n🎉 Resonance™ installation complete!\n"
  );

  // Show success banner
  console.log(
    "╔═══════════════════════════════════════════════════════════════╗"
  );
  console.log(
    "║                                                               ║"
  );
  if (language === "ko") {
    console.log(
      "║                    💡 사용법                                  ║"
    );
    console.log(
      "║                                                               ║"
    );
    console.log(
      "║  Claude Code에서:                                             ║"
    );
    console.log(
      "║                                                               ║"
    );
    console.log(
      "║  opus> /cycle-plan      (작업 계획 수립)                      ║"
    );
    console.log(
      "║  sonnet> /cycle-start   (테스트 기반 구현)                    ║"
    );
    console.log(
      "║  opus> /cycle-check     (코드 품질 검토)                      ║"
    );
    console.log(
      "║                                                               ║"
    );
  } else {
    console.log(
      "║                     💡 Usage                                  ║"
    );
    console.log(
      "║                                                               ║"
    );
    console.log(
      "║  In Claude Code:                                              ║"
    );
    console.log(
      "║                                                               ║"
    );
    console.log(
      "║  opus> /cycle-plan      (Plan your work)                      ║"
    );
    console.log(
      "║  sonnet> /cycle-start   (Test-driven implementation)          ║"
    );
    console.log(
      "║  opus> /cycle-check     (Quality review)                      ║"
    );
    console.log(
      "║                                                               ║"
    );
  }
  console.log(
    "╚═══════════════════════════════════════════════════════════════╝"
  );

  if (language === "ko") {
    console.log(
      "\n✨ Opus가 질문하고, Sonnet이 구현하는 AI TDD 워크플로우를 경험해보세요!"
    );
    console.log(
      "\n🔄 재시작: Claude Code를 재시작하면 명령어를 사용할 수 있습니다."
    );
  } else {
    console.log(
      "\n✨ Experience AI TDD workflow with Opus asking and Sonnet implementing!"
    );
    console.log("\n🔄 Restart: Restart Claude Code to use the commands.");
  }

  console.log(
    language === "ko"
      ? "\n📚 자세한 사용법: https://github.com/keepitmello/Resonance--for-Claude-Code"
      : "\n📚 Documentation: https://github.com/keepitmello/Resonance--for-Claude-Code"
  );

  rl.close();
}

// Start installation
install().catch((err) => {
  console.error("Installation failed:", err);
  rl.close();
  process.exit(1);
});
