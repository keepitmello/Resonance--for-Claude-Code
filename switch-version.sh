#!/bin/bash

# AI TDD Workflow - Version Switcher
# This script helps switch between Simple and Worktree versions

echo "🔄 AI TDD Workflow Version Switcher"
echo ""
echo "Current setup:"

# Check which version is active
if [ -f "$HOME/.claude/commands/cycle-start-[Sonnet].md" ]; then
    if grep -q "Git Worktree" "$HOME/.claude/commands/cycle-start-[Sonnet].md" 2>/dev/null; then
        echo "📍 Currently using: Worktree Version ⚡"
        CURRENT="worktree"
    else
        echo "📍 Currently using: Simple Version 🎪"
        CURRENT="simple"
    fi
else
    echo "❌ No version currently installed"
    CURRENT="none"
fi

echo ""
echo "Available versions:"
echo "  1) Simple Version 🎪 - Easy to start, no Git complexity"
echo "  2) Worktree Version ⚡ - Advanced features, Git superpowers"
echo "  3) Cancel"
echo ""
read -p "Select version (1-3): " choice

case $choice in
    1)
        if [ "$CURRENT" = "simple" ]; then
            echo "✅ Already using Simple version!"
        else
            ./activate-simple.sh
        fi
        ;;
    2)
        if [ "$CURRENT" = "worktree" ]; then
            echo "✅ Already using Worktree version!"
        else
            ./activate-worktree.sh
        fi
        ;;
    3)
        echo "❌ Cancelled"
        ;;
    *)
        echo "❌ Invalid choice"
        ;;
esac