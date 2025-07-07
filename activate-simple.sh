#!/bin/bash

# AI TDD Workflow - Simple Version Activator
# This script sets up the simple version of the AI TDD workflow

echo "🎪 Activating Simple Version of AI TDD Workflow..."

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

# Copy simple version files
echo "📦 Installing Simple version commands..."
cp -r ./versions/simple/*.md "$HOME/.claude/commands/"

# Create cycles directory
mkdir -p "$HOME/.claude/commands/cycles"

echo "✅ Simple version activated!"
echo ""
echo "🚀 Quick Start:"
echo "   1. Open Claude Code"
echo "   2. Start with: /cycle-plan \"your task\""
echo "   3. Implement with: /cycle-start"
echo "   4. Review with: /cycle-check"
echo ""
echo "📖 Full guide: ./versions/simple/README.md"