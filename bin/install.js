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

// Helper functions for better UX
async function waitForEnter(message) {
  return new Promise((resolve) => {
    const prompt = message || "계속하려면 Enter를 누르세요... / Press Enter to continue...";
    rl.question(`\n${prompt} `, () => resolve());
  });
}

function showProgress(current, total, message) {
  const percent = Math.round((current / total) * 100);
  process.stdout.write(`\r${message} [${current}/${total}] ${percent}%`);
  if (current === total) console.log(" ✅");
}

// Show banner with ASCII art
console.log("");
console.log(
  "    +----------------------------------------------------------------+"
);
console.log(
  "    |                                                                |"
);
console.log(
  "    |    ____  _____ ____   ___  _   _    _    _   _  ____ _____     |"
);
console.log(
  "    |   |  _ \\| ____/ ___| / _ \\| \\ | |  / \\  | \\ | |/ ___| ____|    |"
);
console.log(
  "    |   | |_) |  _| \\___ \\| | | |  \\| | / _ \\ |  \\| | |   |  _|      |"
);
console.log(
  "    |   |  _ <| |___ ___) | |_| | |\\  |/ ___ \\| |\\  | |___| |___     |"
);
console.log(
  "    |   |_| \\_\\_____|____/ \\___/|_| \\_/_/   \\_\\_| \\_|\\____|_____|    |"
);
console.log(
  "    |                                                                |"
);
console.log(
  "    |                      for Claude Code                           |"
);
console.log(
  "    |                                                                |"
);
console.log(
  "    |              AI TDD workflow with Opus-Sonnet-You              |"
);
console.log(
  "    |                                                                |"
);
console.log(
  "    +----------------------------------------------------------------+"
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

// Version checking and migration logic
function isLegacyVersion() {
  const CONFIG_FILE = path.join(os.homedir(), ".claude", "resonance-config.json");
  const COMMANDS_DIR = path.join(os.homedir(), ".claude", "commands");
  
  try {
    // Check if commands directory exists
    if (!fs.existsSync(COMMANDS_DIR)) return false;
    
    // Check for worktree artifacts in command files
    const commandFiles = fs.readdirSync(COMMANDS_DIR).filter(file => file.endsWith('.md'));
    for (const file of commandFiles) {
      const filePath = path.join(COMMANDS_DIR, file);
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        // Look for git worktree specific patterns
        if (/(git worktree|\.git\/worktrees|worktree.*checkout|branch.*worktree)/i.test(content)) {
          return true;
        }
      } catch (err) {
        // Skip files that can't be read
        continue;
      }
    }
    
    // Check config version if exists
    if (fs.existsSync(CONFIG_FILE)) {
      try {
        const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
        // If version is less than 1.2.0, it's legacy
        if (config.version && config.version.startsWith('1.0') || config.version.startsWith('1.1')) {
          return true;
        }
      } catch (err) {
        // If config is corrupted, assume legacy
        return true;
      }
    }
    
    return false;
  } catch (err) {
    return false;
  }
}

function performMigration(language) {
  const COMMANDS_DIR = path.join(os.homedir(), ".claude", "commands");
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").split("T")[0];
  const migrationBackupDir = path.join(COMMANDS_DIR, "backup", `migration-v1.2-${timestamp}`);
  
  // Create migration backup directory
  fs.mkdirSync(migrationBackupDir, { recursive: true });
  
  // Move legacy command files to migration backup
  const commandFiles = fs.readdirSync(COMMANDS_DIR).filter(file => file.endsWith('.md'));
  let migratedCount = 0;
  
  for (const file of commandFiles) {
    const filePath = path.join(COMMANDS_DIR, file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      if (/(git worktree|\.git\/worktrees|worktree.*checkout|branch.*worktree)/i.test(content)) {
        // Move legacy file to backup
        fs.renameSync(filePath, path.join(migrationBackupDir, file));
        migratedCount++;
      }
    } catch (err) {
      // Skip files that can't be processed
      continue;
    }
  }
  
  if (migratedCount > 0) {
    console.log(
      `   → ${migratedCount}개 레거시 파일 마이그레이션 완료`
    );
  }
}

async function install() {
  const language = await selectLanguage();
  const SOURCE_DIR = path.join(__dirname, "..", `commands(${language})`);
  const CONFIG_FILE = path.join(
    os.homedir(),
    ".claude",
    "resonance-config.json"
  );

  console.log(
    language === "ko"
      ? "\n설치를 시작합니다..."
      : "\nStarting installation..."
  );

  // Step 1: 환경 확인
  console.log(
    language === "ko"
      ? "\n1단계: 환경 확인"
      : "\nStep 1: Checking environment"
  );

  // Claude Code 확인
  if (!fs.existsSync(path.join(os.homedir(), ".claude"))) {
    console.error(
      language === "ko"
        ? "❌ Claude Code가 설치되어 있지 않습니다!"
        : "❌ Claude Code is not installed!"
    );
    console.error("   https://claude.ai/code");
    rl.close();
    process.exit(1);
  }

  // Legacy version check
  if (isLegacyVersion()) {
    console.log(
      language === "ko"
        ? "⚠️  레거시 버전 감지 → 마이그레이션 진행"
        : "⚠️  Legacy version detected → Migrating"
    );
    performMigration(language);
  }

  console.log("✅ " + (language === "ko" ? "환경 확인 완료" : "Environment ready"));
  
  await waitForEnter(
    language === "ko" 
      ? "계속하려면 Enter를 누르세요..." 
      : "Press Enter to continue..."
  );

  // Step 2: 디렉토리 준비
  console.log(
    language === "ko"
      ? "\n2단계: 디렉토리 준비"
      : "\nStep 2: Preparing directories"
  );

  // commands 폴더 생성 (없다면)
  if (!fs.existsSync(CLAUDE_COMMANDS_DIR)) {
    fs.mkdirSync(CLAUDE_COMMANDS_DIR, { recursive: true });
  }

  // 백업 폴더 생성
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  // 기존 Resonance 파일들 백업
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
  
  let backupCount = 0;
  resonanceFiles.forEach((file) => {
    const sourcePath = path.join(CLAUDE_COMMANDS_DIR, file);
    if (fs.existsSync(sourcePath)) {
      const backupPath = path.join(BACKUP_DIR, `${file}.backup.${timestamp}`);
      fs.copyFileSync(sourcePath, backupPath);
      backupCount++;
    }
  });
  
  if (backupCount > 0) {
    console.log(`✅ ${backupCount}개 파일 백업 완료`);
  }

  // Step 3: 파일 설치
  console.log(
    language === "ko"
      ? "\n3단계: 파일 설치"
      : "\nStep 3: Installing files"
  );
  
  const commandFiles = fs
    .readdirSync(SOURCE_DIR)
    .filter((file) => file.endsWith(".md"));

  commandFiles.forEach((file, index) => {
    const sourcePath = path.join(SOURCE_DIR, file);
    const destPath = path.join(CLAUDE_COMMANDS_DIR, file);

    fs.copyFileSync(sourcePath, destPath);
    showProgress(
      index + 1, 
      commandFiles.length, 
      language === "ko" ? "설치 진행" : "Installing"
    );
  });

  // Save language configuration
  let existingConfig = {};
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      existingConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    } catch (err) {
      existingConfig = {};
    }
  }
  
  const wasLegacy = isLegacyVersion();
  const config = {
    language: language,
    installedAt: new Date().toISOString(),
    version: "1.5.9",
    ...(wasLegacy && {
      migration: {
        from: existingConfig.version || "1.1.x",
        timestamp: new Date().toISOString(),
        type: "worktree-to-simple"
      }
    })
  };
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));

  console.log(
    language === "ko"
      ? "\n🎉 Resonance™ 설치 완료!\n"
      : "\n🎉 Resonance™ installation complete!\n"
  );

  // Show success banner
  console.log(
    "+================================================================+"
  );
  console.log(
    "|                                                                |"
  );
  if (language === "ko") {
    console.log(
      "|                    💡 사용법                                    |"
    );
    console.log(
      "|                                                                |"
    );
    console.log(
      "|  Claude Code에서:                                              |"
    );
    console.log(
      "|                                                                |"
    );
    console.log(
      "|  opus> /cycle-plan      (작업 계획 수립)                          |"
    );
    console.log(
      "|  sonnet> /cycle-start   (테스트 기반 구현)                        |"
    );
    console.log(
      "|  sonnet> /cycle-log     (작업 내용 문서화)                        |"
    );
    console.log(
      "|  opus> /cycle-check     (코드 품질 검토)                          |"
    );
    console.log(
      "|                                                                |"
    );
  } else {
    console.log(
      "|                     💡 Usage                                   |"
    );
    console.log(
      "|                                                                |"
    );
    console.log(
      "|  In Claude Code:                                              |"
    );
    console.log(
      "|                                                                |"
    );
    console.log(
      "|  opus> /cycle-plan      (Plan your work)                      |"
    );
    console.log(
      "|  sonnet> /cycle-start   (Test-driven implementation)          |"
    );
    console.log(
      "|  sonnet> /cycle-log     (Document your work)                  |"
    );
    console.log(
      "|  opus> /cycle-check     (Quality review)                      |"
    );
    console.log(
      "|                                                                |"
    );
  }
  console.log(
    "+================================================================+"
  );

  if (language === "ko") {
    console.log(
      "\n✨ Opus가 질문하고, Sonnet이 구현하는 AI TDD 워크플로우를 경험해보세요!"
    );
    console.log("\n📌 중요: Claude Code 세션을 2개 열어야 합니다:");
    console.log("   - 세션 1: Opus 모드 (계획/리뷰)");
    console.log("   - 세션 2: Sonnet 모드 (구현)");
    console.log(
      "\n🔄 재시작: Claude Code를 재시작하면 명령어를 사용할 수 있습니다."
    );
  } else {
    console.log(
      "\n✨ Experience AI TDD workflow with Opus asking and Sonnet implementing!"
    );
    console.log("\n📌 Important: You need to open 2 Claude Code sessions:");
    console.log("   - Session 1: Opus mode (planning/review)");
    console.log("   - Session 2: Sonnet mode (implementation)");
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
