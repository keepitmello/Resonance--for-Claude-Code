#!/bin/bash

# AI TDD Workflow - Worktree Version Activator
# This script sets up the worktree version of the AI TDD workflow

echo "⚡ Activating Worktree Version of AI TDD Workflow..."

# Check if .claude directory exists
if [ ! -d "$HOME/.claude" ]; then
    mkdir -p "$HOME/.claude"
    echo "✅ Created ~/.claude directory"
fi

# Check if commands directory exists
if [ ! -d "$HOME/.claude/commands" ]; then
    mkdir -p "$HOME/.claude/commands"
    echo "✅ Created ~/.claude/commands directory"
fi

# Check Git version
GIT_VERSION=$(git --version | awk '{print $3}')
echo "📍 Git version: $GIT_VERSION"

# Check if git worktree is supported
if ! git worktree -h >/dev/null 2>&1; then
    echo "❌ Error: Git worktree not supported. Please upgrade Git to 2.5+"
    exit 1
fi

# Copy worktree version files
echo "📦 Installing Worktree version commands..."
cp -r ./versions/worktree/*.md "$HOME/.claude/commands/"

# Create cycles directory
mkdir -p "$HOME/.claude/commands/cycles"

# Create worktree base directory
WORKTREE_BASE="$HOME/.claude/worktrees"
if [ ! -d "$WORKTREE_BASE" ]; then
    mkdir -p "$WORKTREE_BASE"
    echo "✅ Created worktree base directory: $WORKTREE_BASE"
fi

echo "✅ Worktree version activated!"
echo ""
echo "🚀 Quick Start:"
echo "   1. Open Claude Code"
echo "   2. Start with: /cycle-plan \"your task\""
echo "   3. Implement with: /cycle-start (creates worktree automatically)"
echo "   4. Review with: /cycle-check"
echo ""
echo "🌳 Worktrees will be created in: $WORKTREE_BASE"
echo "📖 Full guide: ./versions/worktree/README.md"