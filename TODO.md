# TODO for Resonance™ Launch

## 🚨 Critical (Before Public Release)

### 1. Version-specific Documentation
- [ ] Create `versions/simple/README.md` with detailed guide
- [ ] Create `versions/worktree/README.md` with detailed guide
- [ ] Create `versions/simple/QUICKSTART.md` (2-minute setup)
- [ ] Create `versions/worktree/QUICKSTART.md` (10-minute setup)
- [ ] Add Korean versions (README-ko.md, QUICKSTART-ko.md)

### 2. Installation Scripts Testing
- [ ] Test `activate-simple.sh` actually copies files
- [ ] Test `activate-worktree.sh` Git version check
- [ ] Test `switch-version.sh` version detection
- [ ] Verify commands work in Claude Code after activation
- [ ] Test on macOS, Linux, Windows (WSL)

### 3. Example Files
- [ ] Create `examples/simple/payment-api/` with real cycle docs
- [ ] Create `examples/worktree/auth-refactor/` with Git history
- [ ] Add sample checkpoint.json showing context preservation
- [ ] Include before/after code comparison

### 4. Initial Setup Automation
- [ ] Auto-create `~/.claude/commands/cycles/` directory
- [ ] Create initial CLAUDE.md template if not exists
- [ ] Add first-run welcome message with tips

## 📦 Nice to Have (Post-Launch)

### 5. Advanced Documentation
- [ ] Create `/docs/complete-guide.md` with all features
- [ ] Create `/docs/troubleshooting.md` for common issues
- [ ] Create `/docs/migration-guide.md` from basic Claude Code
- [ ] Video tutorial scripts

### 6. Community Features
- [ ] Issue templates (.github/ISSUE_TEMPLATE/)
- [ ] PR template
- [ ] Discord server setup guide
- [ ] Example cycles from real projects

### 7. Quality of Life
- [ ] Uninstall script
- [ ] Update checker
- [ ] Backup/restore cycles
- [ ] VS Code extension (future)

## 🧪 Testing Checklist

Before going public, verify:
- [ ] Fresh install on clean system works
- [ ] All cycle commands execute without errors
- [ ] Context preservation across 20k limit works
- [ ] Git worktree creation succeeds
- [ ] Checkpoint.json properly tracks decisions

## 📊 Launch Strategy

1. **Soft Launch**
   - [ ] Test with 3-5 beta users
   - [ ] Gather feedback on installation
   - [ ] Fix any critical bugs

2. **Public Launch**
   - [ ] Threads post (prepared)
   - [ ] Dev.to tutorial
   - [ ] Hacker News "Show HN"
   - [ ] Reddit r/programming

## 🐛 Known Issues to Fix

- [ ] Windows path compatibility
- [ ] Git worktree error handling
- [ ] Non-English system locale support

---

**Time Estimate**: 
- Minimum viable: 2-3 hours
- Polished release: 5-6 hours
- Full documentation: 8-10 hours