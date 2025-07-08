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
  
  console.log(
    language === "ko" 
      ? "\n🔄 레거시 버전에서 마이그레이션 중..."
      : "\n🔄 Migrating from legacy version..."
  );
  
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
        console.log(`  📦 ${file} → migration backup`);
      }
    } catch (err) {
      // Skip files that can't be processed
      continue;
    }
  }
  
  console.log(
    language === "ko"
      ? `\n✅ ${migratedCount}개 레거시 파일을 백업했습니다: ${migrationBackupDir}`
      : `\n✅ Backed up ${migratedCount} legacy files to: ${migrationBackupDir}`
  );
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
    "\n" +
      (language === "ko"
        ? "설치를 시작합니다..."
        : "Starting installation...") +
      "\n"
  );

  // Check for legacy version and perform migration if needed
  if (isLegacyVersion()) {
    console.log(
      language === "ko"
        ? "\n⚠️  레거시 버전이 감지되었습니다!"
        : "\n⚠️  Legacy version detected!"
    );
    console.log(
      language === "ko"
        ? "   git worktree 기반에서 간단한 폴더 구조로 업그레이드합니다."
        : "   Upgrading from git worktree-based to simple folder structure."
    );
    
    performMigration(language);
  }

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

  // Save language configuration with version update
  console.log(
    language === "ko"
      ? "\n⚙️  언어 설정 저장 중..."
      : "\n⚙️  Saving language configuration..."
  );
  
  // Read existing config to preserve migration history
  let existingConfig = {};
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      existingConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    } catch (err) {
      // If config is corrupted, start fresh
      existingConfig = {};
    }
  }
  
  const wasLegacy = isLegacyVersion();
  const config = {
    language: language,
    installedAt: new Date().toISOString(),
    version: "1.5.0", // Updated to current version
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
    "+===============================================================+"
  );
  console.log(
    "|                                                                 |"
  );
  if (language === "ko") {
    console.log(
      "|                    💡 사용법                                    |"
    );
    console.log(
      "|                                                               |"
    );
    console.log(
      "|  Claude Code에서:                                              |"
    );
    console.log(
      "|                                                               |"
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
      "|                                                               |"
    );
    console.log(
      "|  In Claude Code:                                              |"
    );
    console.log(
      "|                                                               |"
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
      "|                                                               |"
    );
  }
  console.log(
    "+===============================================================+"
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
